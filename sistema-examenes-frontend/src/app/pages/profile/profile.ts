import { Component, OnInit } from '@angular/core';
import { 
  MatCard, 
  MatCardContent, 
  MatCardTitle, 
  MatCardSubtitle, 
  MatCardHeader, 
  MatCardActions 
} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-profile',
  imports: [
    MatCard, 
    MatCardContent, 
    MatCardTitle, 
    MatCardSubtitle, 
    MatCardHeader, 
    MatCardActions,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatChipsModule,
    MatTableModule
  ],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = null;
  displayedColumns: string[] = ['field', 'value'];
  userInfoData: any[] = [];
  systemInfoData: any[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.setupTableData();
  }

  setupTableData() {
    this.userInfoData = [
      {
        field: 'Nombre de Usuario',
        value: this.user.username,
        icon: 'person'
      },
      {
        field: 'ID de Usuario',
        value: this.user.id,
        icon: 'badge'
      },
      {
        field: 'Teléfono',
        value: this.user.phone || 'No especificado',
        icon: 'phone'
      },
      {
        field: 'Email',
        value: this.user.email,
        icon: 'email'
      }
    ];

    this.systemInfoData = [
      {
        field: 'Rol del Usuario',
        value: this.user.authorities[0].authority,
        icon: 'admin_panel_settings',
        statusIcon: 'admin_panel_settings',
        chipColor: 'primary'
      },
      {
        field: 'Estado de la Cuenta',
        value: this.user.enabled ? 'Activo' : 'Inactivo',
        icon: 'account_circle',
        statusIcon: this.user.enabled ? 'check_circle' : 'cancel',
        chipColor: this.user.enabled ? 'accent' : 'warn'
      }
    ];
  }
}
