import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder y Validators
import { Cliente, Usuario } from "./cliente.model";
import { ClienteService } from '../services/cliente.service'; // Importa tu servicio de cliente

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
