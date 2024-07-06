import { Component, inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finalProjet';
  private = inject(NgToastService);
 }
