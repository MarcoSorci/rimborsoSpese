import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InsertComponent } from './components/insert/insert.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from './components/toolbar/nav-menu/nav-menu.component';
import { RegisterComponent } from './components/register/register.component';

import { TableReviewComponent } from './components/table-review/table-review.component';
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
import { DialogBoxComponent } from './components/table-review/sub-components/dialog-box/dialog-box.component';
import { ValidationListComponent } from './components/table-review/sub-components/validation-list/validation-list.component';
import { ValidationDialogComponent } from './components/table-review/sub-components/validation-list/validation-dialog/validation-dialog.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserlistDialogComponent } from './components/user-list/userlist-dialog/userlist-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InsertComponent,
    TableReviewComponent,
    ToolbarComponent,
    NavMenuComponent,
    RegisterComponent,
    DialogBoxComponent,
    ValidationListComponent,
    ValidationDialogComponent,
    UserListComponent,
    UserlistDialogComponent
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
