export interface Cliente {
  idcliente: number; // Si es auto-generado en la base de datos
  nombrecliente: string;
  apellidopaterno: string;
  apellidomaterno: string; // Si es opcional
  telefono: string; // Si es opcional
  id_usuario: number; // Para relacionar con el usuario
  id_domicilio: number; // Si es relevante
}

export interface Usuario {
  nombreusuario: string;
  email: string;
  password: string; // Considera cifrar esta contraseña antes de enviarla al servidor
}

