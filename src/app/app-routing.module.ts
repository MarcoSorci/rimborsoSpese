import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/table-components/user-list/user-list.component';
import { WlInsertComponent } from './components/insert-components/wl-insert/wl-insert.component';
import { WorkLeaveTableComponent } from './components/table-components/work-leave-table/work-leave-table.component';
import { ExpInsertComponent } from './components/insert-components/exp-insert/exp-insert.component';
import { ExpenseTableComponent } from './components/table-components/expense-table/expense-table.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'insert', component: ExpInsertComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'table', component: ExpenseTableComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'userlist', component: UserListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'wl-table', component: WorkLeaveTableComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'wl-insert', component: WlInsertComponent, /*canActivate: [AuthGuard]*/ },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
