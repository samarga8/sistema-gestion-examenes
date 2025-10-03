import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  imports: [
    CommonModule,
    MatCardModule, 
    MatListModule, 
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    RouterModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './view-categories.html',
  styleUrl: './view-categories.css'
})
export class ViewCategories implements OnInit {

  categorias: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        Swal.fire('Error', 'Error al cargar las categorías', 'error');
      }
    });
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  deleteCategory(categoryId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe({
          next: (response) => {
            Swal.fire('Eliminado', 'La categoría ha sido eliminada', 'success');
            this.loadCategories();
          },
          error: (error) => {
            Swal.fire('Error', 'Error al eliminar la categoría', 'error');
          }
        });
      }
    });
  }


}