import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserlistDialogComponent } from '../../dialog-components/userlist-dialog/userlist-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'type', 'actions'];

  dataSource = this.serv.userList;
  constructor(public dialog: MatDialog, public serv: UserService) {}

  ngOnInit(): void {
    if (this.serv.user?.type === 'admin') {
      this.serv.getUserList();
    }
  }

  sortData(sort: Sort) {
    const data = this.dataSource.value.slice();
    data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return this.compare(a.username, b.username, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.next(data);
  }

  compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialog(action: any, obj: { action: any }) {
    obj.action = action;
    const dialogRef = this.dialog.open(UserlistDialogComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(user: User) {
    this.serv.update(user).subscribe({
      next: () => this.serv.getUserList(),
    });
  }

  deleteRowData(user: User) {
    this.serv.delete(user.id).subscribe({
      next: () => this.serv.getUserList(),
    });
  }
}
