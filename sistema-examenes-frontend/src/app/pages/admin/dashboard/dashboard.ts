import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Sidbar } from "../sidbar/sidbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatListModule, Sidbar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
