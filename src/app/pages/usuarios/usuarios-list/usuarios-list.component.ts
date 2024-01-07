import { AfterViewInit, Component } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    $("#tblUsuarios").DataTable({
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
