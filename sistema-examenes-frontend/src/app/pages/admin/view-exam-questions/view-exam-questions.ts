import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-exam-questions',
  imports: [
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './view-exam-questions.html',
  styleUrl: './view-exam-questions.css'
})
export class ViewExamQuestions implements OnInit {

  examId: any;
  title: any;
  questions: any = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.examId = this.route.snapshot.params['examId'];
    this.title = this.route.snapshot.params['title'];
    
    // Usar setTimeout para evitar el error de detección de cambios
    setTimeout(() => {
      this.loadQuestions();
    }, 0);
  }

  loadQuestions(): void {
    this.questionService.listExamQuestions(this.examId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
        this.loading = false;
        // Forzar la detección de cambios
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
  }

  eliminarPregunta(questionId: any) {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Estás seguro, quieres eliminar esta pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          (data) => {
            this.snack.open('Pregunta eliminada', '', {
              duration: 3000
            });
            this.questions = this.questions.filter((question: any) => question.questionId != questionId);
            this.cdr.detectChanges();
          },
          (error) => {
            this.snack.open('Error al eliminar la pregunta', '', {
              duration: 3000
            });
            console.log(error);
          }
        );
      }
    });
  }
}
