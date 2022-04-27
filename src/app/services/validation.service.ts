import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {}

  limitConfig = { transport: 20, lodging: 80, food: 30, other: 70 };

  autoValidate(exp: Expense) {
    if (exp.hasReceipt === 'true') {
      if (exp.type === 'transport') {
        exp.reimbursement = this.checkReimbursement(
          this.limitConfig.transport,
          exp
        );
      }
      if (exp.type === 'lodging') {
        exp.reimbursement = this.checkReimbursement(
          this.limitConfig.lodging,
          exp
        );
      }
      if (exp.type === 'food') {
        exp.reimbursement = this.checkReimbursement(this.limitConfig.food, exp);
      }
      if (exp.type === 'other') {
        exp.reimbursement = this.checkReimbursement(
          this.limitConfig.other,
          exp
        );
      }
    } else {
      exp.approval = 'denied';
    }
  }

  checkReimbursement(refValue: number, exp: Expense) {
    if (refValue > exp.amount) {
      exp.approval = 'full';
      return exp.amount;
    } else {
      exp.approval = 'partial';
      return refValue;
    }
  }

}
