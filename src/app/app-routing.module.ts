import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminComponent } from "./admin/admin.component";
import { VentasComponent } from "./ventas/ventas.component";
import { AuthGuard } from "./guards/auth.guard";
import { ClientesComponent } from "./clientes/clientes.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login si no hay otra ruta

  // Todas las rutas dentro de 'dashboard'
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege el dashboard completo con el AuthGuard
    children: [
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'superadmin'] } },
      { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard], data: { roles: ['ventas'] } },
      { path: 'crear-cliente', component: ClientesComponent, canActivate: [AuthGuard] },

    ]
  },

  // Ruta wildcard para manejar páginas no encontradas
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
