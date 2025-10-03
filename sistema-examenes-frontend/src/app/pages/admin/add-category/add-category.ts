import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  imports: [
    CommonModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule, 
    MatButtonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory {
  
  category = {
    title: '',
    description: ''
  };

  constructor(
    private categoryService: CategoryService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  clearForm() {
    this.category = {
      title: '',
      description: ''
    };
  }

  saveCategory() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open('El titulo es obligatorio', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
    
    this.categoryService.addCategory(this.category).subscribe({
      next: (response: any) => {
        this.clearForm();
        Swal.fire({
          icon: 'success',
          title: 'Categoría guardada exitosamente',
          text: 'La categoría se ha creado correctamente',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['/admin/ViewCategories']);
        });
      },
      error: (error) => {
      
        if (error.status === 200 || error.status === 201) {
       
          this.clearForm();
          Swal.fire({
            icon: 'success',
            title: 'Categoría guardada',
            text: 'La categoría se ha creado correctamente',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar la categoría',
            text: `Error ${error.status}: ${error.message || 'Error desconocido'}`,
            showConfirmButton: true
          });
        }
      },
    
    });
  }
}
