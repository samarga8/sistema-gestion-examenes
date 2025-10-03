import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../../services/exam';
import { CategoryService } from '../../../services/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-exam',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    FormsModule
  ],
  templateUrl: './add-exam.html',
  styleUrl: './add-exam.css'
})
export class AddExam implements OnInit {

  categorias: any = [];
  examenData = {
    title: '',
    description: '',
    pointMax: '',
    numberQuestions: '',
    active: false,
    category: {
      categoryId
        : ''
    }
  }

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private examenService: ExamService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      }, (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar los datos', 'error');
      }
    )
  }

  saveExam() {
    console.log(this.examenData);
    if (this.examenData.title.trim() == '' || this.examenData.title == null) {
      this.snack.open('El título es requerido', '', {
        duration: 3000
      });
      return;
    }
    if (!this.examenData.category || !this.examenData.category.categoryId
    ) {
      this.snack.open('La categoría es obligatoria', '', { duration: 3000 });
      return;
    }



    console.log('📤 ENVIANDO EXAMEN AL BACKEND:', this.examenData);

    this.examenService.addExam(this.examenData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Examen guardado', 'El examen ha sido guardado con éxito', 'success');
        this.examenData = {
          title: this.examenData.title,
          description: this.examenData.description,
          pointMax: this.examenData.pointMax,
          numberQuestions: this.examenData.numberQuestions,
          active: this.examenData.active,
          category: {
            categoryId: this.examenData.category.categoryId
          }
        };
        this.router.navigate(['/admin/examenes']);
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el examen', 'error');
      }
    );
  }

}