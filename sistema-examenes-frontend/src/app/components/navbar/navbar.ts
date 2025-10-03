import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';
import { NgIf } from '@angular/common'; // Importar NgIf

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink,
    NgIf // Añadir NgIf a los imports
  ],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  isLoggedIn = false;
  user:any = null;

  constructor(private login: LoginService){}

  ngOnInit(): void {
    // Verificar si estamos en el navegador antes de intentar acceder a localStorage
    if (typeof window !== 'undefined') {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      
      // Solo suscribirse si loginStatusSubjec existe
      if (this.login.loginStatusSubjec) {
        this.login.loginStatusSubjec.asObservable().subscribe(
          data => {
            this.isLoggedIn = this.login.isLoggedIn();
            this.user = this.login.getUser();
          }
        );
      }
    }
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
