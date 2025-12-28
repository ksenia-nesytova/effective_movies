import { Component } from '@angular/core';
import { Header } from "@app/core/layout/header/header";

@Component({
  selector: 'app-layout',
  imports: [Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
