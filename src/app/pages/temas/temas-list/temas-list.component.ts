import { AfterViewInit, Component } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-temas-list',
  templateUrl: './temas-list.component.html',
  styleUrl: './temas-list.component.css'
})
export class TemasListComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    $("#tblTemas").DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
      },
      "pageLength": 5,
      "lengthMenu": [5, 10, 25, 50, 100],
      "processing": true,
      "responsive": true,
      "autoWidth": false,
    });
  }

}
