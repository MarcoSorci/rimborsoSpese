import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserlistDialogComponent } from './userlist-dialog/userlist-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(public dialog: MatDialog, public serv: UserService) {}

  displayedColumns: string[] = ['username', 'type', 'actions'];

  matDataSource = new MatTableDataSource<User>(this.serv.userList.value);
  dataSource = this.serv.userList;

  ngOnInit(): void {
   if (this.serv.user?.type === 'admin') {
      this.serv.getUserList();
   }
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
      next: () => this.serv.getUserList()
    });
  }

  deleteRowData(user: User) {
    this.serv.delete(user.id).subscribe({
      next: () => this.serv.getUserList()
    });
  }
}
