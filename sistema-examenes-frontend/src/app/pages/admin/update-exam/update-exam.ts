import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ExamService } from '../../../services/exam';
import { CategoryService } from '../../../services/category';


@Component({
  selector: 'app-update-exam',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './update-exam.html',
  styleUrls: ['./update-exam.css']
})
export class UpdateExam implements OnInit {

  examId = 0;
  exam: any = {
    examId: 0,
    title: '',
    description: '',
    pointMax: 0,
    numberQuestions: 0,
    active: false,
    category: {
      categoryId: 0,
      title: '',
      description: ''
    }
  };
  categories: any[] = [];
  selectedCategoryId: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit iniciado');
    this.examId = this.route.snapshot.params['examId'];
    console.log('ExamId obtenido:', this.examId);
    
    if (!this.examId) {
      console.error('No se pudo obtener el examId de la ruta');
      this.snack.open('Error: ID de examen no válido', 'Aceptar', { duration: 3000 });
      this.loading = false;
      return;
    }
    
    this.loadCategories();
  }

  loadCategories() {
    console.log('Iniciando carga de categorías...');
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        console.log('Categorías cargadas exitosamente:', data);
        this.categories = data;
        this.loadExam();
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.snack.open('Error al cargar categorías', 'Aceptar', { duration: 3000 });
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  loadExam() {
    console.log('Iniciando carga del examen con ID:', this.examId);
    this.examService.getExam(this.examId).subscribe({
      next: (data: any) => {
        console.log('Examen cargado exitosamente:', data);
        
        if (!data) {
          console.error('No se recibieron datos del examen');
          this.snack.open('No se encontró el examen', 'Aceptar', { duration: 3000 });
          setTimeout(() => {
            this.loading = false;
            this.cdr.detectChanges();
          });
          return;
        }

        this.exam = { ...data };

        // Asegurar que existe la categoría
        if (!this.exam.category) {
          this.exam.category = { categoryId: 0, title: '', description: '' };
        }

        // Buscar la categoría correspondiente
        const match = this.categories.find(c => c.categoryId === this.exam.category.categoryId);
        if (match) {
          this.exam.category = match;
          this.selectedCategoryId = match.categoryId;
          console.log('Categoría encontrada y asignada:', match);
        } else if (this.categories.length > 0) {
          this.exam.category = this.categories[0];
          this.selectedCategoryId = this.categories[0].categoryId;
          console.log('Usando primera categoría disponible:', this.categories[0]);
        }

        console.log('Datos finales del examen:', this.exam);
        console.log('Categoría seleccionada ID:', this.selectedCategoryId);

        // Usar setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
          console.log('Loading cambiado a false');
        });
      },
      error: (error) => {
        console.error('Error al cargar el examen:', error);
        this.snack.open('Error al cargar el examen', 'Aceptar', { duration: 3000 });
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  updateExam() {
    const selectedCategory = this.categories.find(c => c.categoryId == this.selectedCategoryId);
    if (selectedCategory) {
      this.exam.category = selectedCategory;
    }

    console.log('Examen a actualizar:', this.exam);

    this.examService.updateExam(this.exam).subscribe({
      next: (data) => {
        console.log('Examen actualizado:', data);
        this.snack.open('Examen actualizado con éxito', 'Aceptar', { duration: 3000 });
        this.router.navigate(['/admin/ViewExams']);
      },
      error: (error) => {
        console.error('Error al actualizar el examen:', error);
        this.snack.open('Error al actualizar el examen', 'Aceptar', { duration: 3000 });
      }
    });
  }
}