import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    /* $("#tblClientes").DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
      },
      "pageLength": 5,
      "lengthMenu": [5, 10, 25, 50, 100],
      "processing": true,
      "responsive": true,
      "autoWidth": false,
      "ajax": {
        "url": "http://localhost:8080/api/clientes",
        "type": "GET",
        "dataSrc": function(data:any) {
          console.log( data );
        }
      }
    }); */
  }

  ngOnInit() {
    this.listarClientes()
  }

  listarClientes(): void {
    const token = localStorage.getItem('token') || '';

    $("#tblClientes").DataTable({

      "language": {
        "url": "https://cdn.datatables.net/plug-ins/2.0.3/i18n/es-ES.json"
      },
      "pageLength": 10,
      "lengthMenu": [5, 10, 25, 50, 100],
      "processing": true,
      "ajax": {
        "url": "http://localhost:3000/clientes",
        "type": "GET",
        "headers":{
          "Authorization": `Bearer ${token}`
        },
        "dataSrc": function(data:any) {
          return data.map( (item:any) => {
            return [
              item.apellido_cli,
              item.nombre_cli,
              item.ciudad.nombre_ciu,
              item.socio_cli ? 'SI' : 'NO',
              `
              <div class="btn-group">
                <button class="btn btn-info btn-sm" type="button" data-toggle="modal" data-target="#mdlCliente">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <a href="./clientes/editar/${ item.id_cliente }" class="btn btn-warning btn-sm">
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </a>
                <a href="./clientes/eliminar/${ item.id_cliente }" class="btn btn-danger btn-sm">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
              </div>
              `
            ];
          })
        }
      }
    });
  }

}
