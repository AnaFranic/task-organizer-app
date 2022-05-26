import { Component, OnInit } from '@angular/core';
import { BoardListComponent } from '../board-list/board-list.component';

import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(BoardListComponent, {
      position: {
        top: '72px',
        left: '8px',
      }
    });
  }
}
