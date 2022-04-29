import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkLeave } from '../models/work-leave';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WorkLeaveService {
  private readonly WORK_LEAVE_API =
    'https://6248018d4bd12c92f4064156.mockapi.io/workLeave';

  public workLeaveList = new BehaviorSubject<WorkLeave[]>([]);

  constructor(private http: HttpClient, private userServ: UserService) {}

  leaveModel: WorkLeave = {
    id: '',
    date: '',
    hours: '',
    type: '',
    notes: '',
  };

  getWorkLeaves() {
    let query = '';
    if (this.userServ.user?.type !== 'admin') {
      query = '?userId=' + this.userServ.user?.id;
    }
    this.http
      .get<WorkLeave[]>(this.WORK_LEAVE_API + query)
      .subscribe((workLeave) => this.workLeaveList.next(workLeave));
  }

  insert(newWorkLeave: WorkLeave) {
    return this.http.post(this.WORK_LEAVE_API, newWorkLeave);
  }

  addRequest(workLeave: any) {
    let workLeaveArray = this.workLeaveList.value;
    workLeaveArray.push(workLeave);
    this.workLeaveList.next(workLeaveArray);
  }

  delete(id: string) {
    return this.http.delete<any>(this.WORK_LEAVE_API + '/' + id);
  }

  update(workLeave: WorkLeave) {
    return this.http.put<any>(
      this.WORK_LEAVE_API + '/' + workLeave.id,
      workLeave
    );
  }
}
