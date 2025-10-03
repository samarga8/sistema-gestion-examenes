import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { ExamService } from '../../../services/exam';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-exams',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './view-exams.html',
  styleUrl: './view-exams.css'
})
export class ViewExams implements OnInit {

  exams: any = [];

  constructor(
    private examService: ExamService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.examService.listExams().subscribe({
      next: (response) => {
        console.log(response);
        this.exams = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar exámenes',
          text: 'Ocurrió un error al obtener los exámenes. Por favor, inténtalo de nuevo más tarde.',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }


  deleteExam(examId: any) {
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examService.deleteExam(examId).subscribe((data) => {
          this.exams = this.exams.filter((exam: any) => exam.examId !== examId);
          Swal.fire('Eliminado', 'El examen ha sido eliminado.', 'success');
          this.ngOnInit();
        },
          (error) => {
            Swal.fire('Error', 'Ocurrió un error al eliminar el examen.', 'error');
          }
        )
      }
    })
  }

}

