import { Component, OnInit } from '@angular/core';
import { 
  MatCard, 
  MatCardContent,  
  MatCardActions 
} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../services/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  imports: [
    MatCard, 
    MatCardContent, 
  
    MatCardActions,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatSelectModule,
    FormsModule, 
    CommonModule, 
    MatSnackBarModule
  ],
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit {

  public user = {
    username: '',
    password: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'STUDENT'
  }

  constructor(private userService: User, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es obligatorio','Cerrar',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
      })
   
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('La contraseña es obligatoria','Cerrar',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
      })
      return;
    }
    if (this.user.name == '' || this.user.name == null) {
      this.snack.open('El nombre es obligatorio','Cerrar',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
      })
      return;
    }
    if (this.user.lastName == '' || this.user.lastName == null) {
      this.snack.open('El apellido es obligatorio','Cerrar',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
      })
      return;
    }
    if (this.user.email == '' || this.user.email == null) {
      this.snack.open('El correo electrónico es obligatorio','Cerrar',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right',
      })
      return;
    }

  

    this.userService.registerUser(this.user).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 2000
        })
      },
      (error) => {
        this.snack.open('Error en el registro','Cerrar',{
          duration:3000,
          
        })
      }
    )

  }

}
