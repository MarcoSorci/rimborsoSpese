import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { DialogService } from 'src/app/services/dialog.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';

@Component({
  selector: 'app-validation-list',
  templateUrl: './validation-list.component.html',
  styleUrls: ['./validation-list.component.scss'],
})
export class ValidationListComponent implements AfterViewInit {
  constructor(
    public dialog: MatDialog,
    public serv: ExpenseService,
    public userServ: UserService,
    public valServ: ValidationService,
    public dialogServ: DialogService
  ) {}

  clickedRows = this.serv.clickedRows;

  ngAfterViewInit() {
    this.clickedRows.clear();
  }

  checkValidation(exp: Expense) {
    if (!exp.isManuallyValidated) {
      this.valServ.autoValidate(exp);
    }
    const res = document.getElementById('validation-result');
    if (res) {
      res.setAttribute(
        'id',
        'validation-result' + Math.random().toString(16).slice(2)
      );
      res.style.display = 'flex';
    }
  }


}
