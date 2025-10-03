import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatIconModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username.trim() == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open('La contraseña es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }




    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.jwt);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          

          if (this.loginService.getUserRole() == 'ADMIN') {

            this.router.navigate(['admin']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else if (this.loginService.getUserRole() == 'STUDENT') {

            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubjec.next(true);
          }
          else {
            this.loginService.logout();
          }
        })
      }, (error) => {
  
        this.snack.open('Credenciales inválidas , vuelva a intentarlo !!', 'Aceptar', {
          duration: 3000
        })
      }
    )
  }
}