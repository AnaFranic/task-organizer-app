import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditBoardComponent } from '../edit-board/edit-board.component';
import { EditBoardDialogData } from '../edit-board/edit-board.models';
import { Board } from '../models/board.models';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {

  boards?: Board[];

  private subscriptions = new Subscription();

  constructor(private taskService: TaskService,
    private dialogRef: MatDialogRef<BoardListComponent>,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getBoards();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private getBoards(): void {
    this.subscriptions.add(
      this.taskService.getBoards().subscribe((boards) => {
        this.boards = boards;
        const selectedBoardId = Number(this.route.firstChild?.snapshot.paramMap.get('id'));
        const board = this.boards.find(b => b.id === selectedBoardId);
        if (selectedBoardId > 0 && !board) {
          this.router.navigate([''], { relativeTo: this.route.parent });
        }
      })
    );
  }

  createBoard(): void {
    this.editBoard();
  }

  editBoard(board?: Board): void {
    const data: EditBoardDialogData = {
      board,
    };
    const dialogRef = this.dialog.open(EditBoardComponent, {
      data,
      autoFocus: false,
      viewContainerRef: this.viewContainerRef,
      width: '300px',
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(() => {
        this.getBoards();
      })
    );
  }
}
