import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder y Validators
import {Cliente, Domicilio, Usuario} from "./cliente.model";
import { ClienteService } from '../services/cliente.service';



@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.scss']
})
export class ClientesComponent {

  clienteForm: FormGroup; // Declarar FormGroup para el formulario
  cliente: Cliente = {
    idcliente: 0,
    nombrecliente: '',
    apellidopaterno: '',
    apellidomaterno: '',
    telefono: '',
    id_usuario: 0,
    id_domicilio: 0
  };

  usuario: Usuario = {
    nombreusuario: '',
    email: '',
    password: ''
  };
  domicilio: Domicilio = {
    iddireccioncliente: 0,
    calle: '',
    numero: '',
    interior: '',
    codigopostal: '',
    colonias: [],
    municipio: '',
    entidad: '',
  };
  //colonias: (NgIterable<unknown> & NgIterable<any>) | undefined | null;

  constructor(private fb: FormBuilder, private clientesService: ClienteService) {
    // Inicializa el formulario
    this.clienteForm = this.fb.group({
      nombrecliente: ['', Validators.required],
      apellidopaterno: ['', Validators.required],
      apellidomaterno: [''],
      telefono: [''],
      nombreusuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  buscarColoniasPorCP() {
    if (this.domicilio.codigopostal.length === 5) {
      this.clientesService.obtenerColoniasPorCP(this.domicilio.codigopostal).subscribe(
        (response) => {
          // Verificar si la respuesta es un array
          if (Array.isArray(response)) {
            // Limpiar el array de colonias antes de llenarlo
            this.domicilio.colonias = [];

            // Iterar sobre la respuesta y agregar los nombres de las colonias
            response.forEach(colonia => {
              this.domicilio.colonias.push(colonia.nombrecolonia);
            });

            // Si hay al menos una colonia, extraer municipio y entidad
            if (response.length > 0) {
              const { nombremunicipio, nombreentidad } = response[0];
              this.domicilio.municipio = nombremunicipio;
              this.domicilio.entidad = nombreentidad;
            }
          } else {
            console.error('La respuesta no es un array', response);
          }
        },
        (error) => {
          console.error('Error al obtener colonias', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const cliente: Cliente = {
        idcliente: 0, // Asigna un valor adecuado si es necesario
        nombrecliente: this.clienteForm.value.nombrecliente,
        apellidopaterno: this.clienteForm.value.apellidopaterno,
        apellidomaterno: this.clienteForm.value.apellidomaterno,
        telefono: this.clienteForm.value.telefono,
        id_usuario: 0, // Se debe asignar después de crear el usuario
        id_domicilio: 0 // Asignar si es necesario
      };

      const usuario: Usuario = {
        nombreusuario: this.clienteForm.value.nombreusuario,
        email: this.clienteForm.value.email,
        password: this.clienteForm.value.password
      };
      const domicilio: Domicilio = {
        iddireccioncliente: 0,
        calle: this.clienteForm.value.calle,
        numero: this.clienteForm.value.numero,
        interior: this.clienteForm.value.interior,
        colonias: this.clienteForm.value.colonias,
        codigopostal: this.clienteForm.value.codigopostal,
        municipio: this.clienteForm.value.municipio,
        entidad: this.clienteForm.value.entidad,
      };

      // Aquí deberías tener un método en tu ClienteService para crear el cliente y usuario
      this.clientesService.crearCliente(cliente, usuario).subscribe(
        (response) => {
          console.log('Cliente creado exitosamente:', response);
          // Aquí podrías redirigir al usuario o limpiar el formulario
        },
        (error) => {
          console.error('Error al crear el cliente:', error);
        }
      );
    }
  }
}
