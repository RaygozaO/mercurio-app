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
    password: '',
    password2: ''
  };
  domicilio: Domicilio = {
    coloniasSelected: '',
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
    if (this.usuario.password !== this.usuario.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.clientesService.crearCliente(this.cliente, this.usuario, this.domicilio).subscribe({
      next: (res) => {
        console.log('Cliente y usuario creados correctamente', res);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      },
      error: (err) => {
        console.error('Error en registro:', err);
        alert('Hubo un error al registrar el usuario.');
      }
    });
  }

}
