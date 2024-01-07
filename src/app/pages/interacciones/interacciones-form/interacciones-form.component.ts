import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-interacciones-form',
  templateUrl: './interacciones-form.component.html',
  styleUrl: './interacciones-form.component.css'
})
export class InteraccionesFormComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    //Initialize Clientes Elements
    $('.cboClientes').select2();

    // Initialize Agencias Elements
    $('.cboAgencias').select2();

    // Initialize Canal Elements
    $('.cboCanal').select2();

    // Initialize Tema Elements
    $('.cboTemas').select2();

  }

}
