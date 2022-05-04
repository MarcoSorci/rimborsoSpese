import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from './components/toolbar/nav-menu/nav-menu.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UserListComponent } from './components/table-components/user-list/user-list.component';
import { UserlistDialogComponent } from './components/dialog-components/userlist-dialog/userlist-dialog.component';
import { WorkLeaveTableComponent } from './components/table-components/work-leave-table/work-leave-table.component';
import { WlInsertComponent } from './components/insert-components/wl-insert/wl-insert.component';
import { ExpenseDialogComponent } from './components/dialog-components/expense-dialog/expense-dialog.component';
import { WlDialogComponent } from './components/dialog-components/wl-dialog/wl-dialog.component';
import { ExpInsertComponent } from './components/insert-components/exp-insert/exp-insert.component';
import { ExpenseTableComponent } from './components/table-components/expense-table/expense-table.component';
import { ValidationListComponent } from './components/validation-list/validation-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    NavMenuComponent,
    RegisterComponent,
    ValidationListComponent,
    UserListComponent,
    UserlistDialogComponent,
    WorkLeaveTableComponent,
    WlInsertComponent,
    ExpenseDialogComponent,
    WlDialogComponent,
    ExpInsertComponent,
    ExpenseTableComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
