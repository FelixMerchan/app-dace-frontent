import { Component, Input, OnInit } from '@angular/core';
import { IClientes } from '../interfaces/clientes.interface';
import { ConsultaService } from '../../../services/consulta.service';
import Swal from 'sweetalert2';
import { ICiudades } from '../../ciudades/interfaces/ciudades.interface';
import { CiudadesService } from '../../ciudades/services/ciudades.service';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent implements OnInit {

  ciudades: ICiudades[] = [];
  isEditing: boolean = false;

  @Input() clienteForm: IClientes = {
    id_cliente: 0,
    cedula_cli: '',
    nombre_cli: '',
    apellido_cli: '',
    telefono_cli: '',
    socio_cli: false,
    nacimiento_cli: '',
    id_ciudad: 0,
    nick_redes: ''
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private consultaService: ConsultaService,
    private ciudadesService: CiudadesService,
  ) { }

  ngOnInit(): void {
    this.getCiudades();
    this.obtenerClienteId();
  }

  private formatFechaNacimiento(fecha: string): string {
    const partesFecha = fecha.split('/'); // Dividir la cadena de fecha en partes
    const fechaNacimiento = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`); // Crear fecha en formato ISO
    return fechaNacimiento.toISOString().substring(0, 10); // Formato ISO 8601 (YYYY-MM-DD)
  }

  obtenerClienteId(): void {
    this.activeRoute.params.subscribe( params => {
      if( params['id']) {
        this.clienteForm.id_cliente = +params['id'];
        this.isEditing = true;
        this.getCliente();
      }
    });
  }

  consultar(): void {
    Swal.fire({
      title: `Consultado los datos de la cédula ${ this.clienteForm.cedula_cli }`,
      text: 'Espere un momento por favor...',
      allowOutsideClick: false,
      showConfirmButton: false, // Ocultar el botón de confirmación
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton());
      }
    });

    this.consultaService.consultaCedula( this.clienteForm.cedula_cli )
    .subscribe( (data:any) => {
      Swal.close();

      this.clienteForm.apellido_cli = data.NombreCiudadano;

      // Formatear la fecha antes de asignarla a this.clienteForm.nacimiento_cli
      const partesFecha = data.FechaNacimiento.split('/'); // Dividir la cadena de fecha en partes
      const fechaNacimiento = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`); // Crear fecha en formato ISO
      this.clienteForm.nacimiento_cli = fechaNacimiento.toISOString().substring(0, 10); // Formato ISO 8601 (YYYY-MM-DD)


      console.log(this.clienteForm);

    }, (err:any) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message
      });
    });
  }

  getCiudades(): void {
    this.ciudadesService.getAllCiudades()
     .subscribe( (data:any) => {
      this.ciudades = data;
     });
  }

  getCliente(): void {

    this.clientesService.getClientesById(this.clienteForm.id_cliente!).subscribe(
      (res:any) => {

        this.clienteForm.cedula_cli = res.cedula_cli;
        this.clienteForm.nombre_cli = res.nombre_cli;
        this.clienteForm.apellido_cli = res.apellido_cli;
        this.clienteForm.telefono_cli = res.telefono_cli;
        this.clienteForm.socio_cli = res.socio_cli;

        const fechaISO = new Date(res.nacimiento_cli); // Convertir la cadena de fecha en un objeto Date
        this.clienteForm.nacimiento_cli = fechaISO.toISOString().substring(0, 10); // Obtener la parte de la fecha (YYYY-MM-DD)

        this.clienteForm.id_ciudad = res.id_ciudad;
        this.clienteForm.nick_redes = res.nick_redes;

      },
      (err:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message
        });
      }
    );
  }

  onSubmit(): void {

    if( this.isEditing ) {
      this.editar();
    } else {
      this.guardar();
    }

  }


  guardar(): void {
    console.log( this.clienteForm );
  }

  editar(): void {
    console.log( this.clienteForm );
  }

}
