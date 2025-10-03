import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-sidbar',
  imports: [MatCardModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './sidbar.html',
  styleUrl: './sidbar.css'
})
export class Sidbar {

}
