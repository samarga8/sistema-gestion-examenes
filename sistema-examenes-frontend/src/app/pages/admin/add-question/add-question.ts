import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestionService } from '../../../services/question';
import { ExamService } from '../../../services/exam';
import { RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatOptionModule
  ],
  templateUrl: './add-question.html',
  styleUrl: './add-question.css'
})
export class AddQuestion implements OnInit {

  examId: any;
  title: any;
  loading: boolean = false;

  pregunta: boolean = true;
  question: any = {
    exam: {
      examId: null,
      title: '',
      description: ''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private examService: ExamService,
    private snack: MatSnackBar
  ) {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    
    // Configurar el examId inmediatamente
    if (this.examId) {
      this.question.exam.examId = this.examId;
    }
    
    // Si tenemos el título en los parámetros, usarlo
    if (this.title) {
      this.question.exam.title = this.title;
    }
  }

  ngOnInit(): void {
    console.log('Componente inicializado con examId:', this.examId);
    // Solo cargar datos del examen si no tenemos el título
    if (!this.title && this.examId) {
      this.loadExamData();
    }
  }

  loadExamData(): void {
    this.loading = true;
    this.examService.getExam(this.examId).subscribe(
      (examData: any) => {
        console.log('Datos del examen cargados:', examData);
        this.question.exam = {
          examId: examData.examId,
          title: examData.title,
          description: examData.description
        };
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar el examen:', error);
        this.snack.open('Error al cargar los datos del examen', '', {
          duration: 3000
        });
        this.loading = false;
      }
    );
  }

  actualizarDatosDeLaPregunta() {
    if (!this.question.content || !this.question.option1 || !this.question.option2 || 
        !this.question.option3 || !this.question.option4 || !this.question.answer) {
      this.snack.open('Todos los campos son obligatorios', '', {
        duration: 3000
      });
      return;
    }

    this.question.exam.examId = this.examId;

    console.log('Agregando pregunta:', this.question);
    
    this.questionService.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log('Pregunta agregada:', data);
        this.snack.open('Pregunta agregada correctamente', '', {
          duration: 3000
        });
        this.router.navigate(['/admin/questions', this.examId, this.question.exam.title]);
      },
      (error) => {
        console.error('Error al agregar pregunta:', error);
        this.snack.open('Error al agregar la pregunta', '', {
          duration: 3000
        });
      }
    );
  }
}
