import { Component, OnInit } from '@angular/core';
import { BoardListComponent } from '../board-list/board-list.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

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
