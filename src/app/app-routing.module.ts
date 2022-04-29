import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { InsertComponent } from './components/insert/insert.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TableReviewComponent } from './components/table-review/table-review.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WorkLeaveTableComponent } from './components/work-leave-table/work-leave-table.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'insert', component: InsertComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'table', component: TableReviewComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'userlist', component: UserListComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'wl-table', component: WorkLeaveTableComponent, /*canActivate: [AuthGuard]*/ },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
