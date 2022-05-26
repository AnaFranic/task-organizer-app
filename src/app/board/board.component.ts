import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { Board } from '../models/board.models';
import { CardList } from '../models/cardList.models';
import { TaskService } from '../services/task.service';
import { EditCardListDialogData } from '../edit-card-list/edit-card-list.models';
import { EditCardListComponent } from '../edit-card-list/edit-card-list.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  board?: Board;

  boardId: number = 0;

  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap
        .pipe(
          map(paramMap => Number(paramMap.get('id'))),
          distinctUntilChanged(),
        )
        .subscribe((id) => {
          this.boardId = id;
          this.getBoard(id);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getBoard(boardId: number): void {
    this.subscriptions.add(
      this.taskService.getBoard(boardId).subscribe((board) => {
        this.board = board;
      })
    );
  }

  createCardList(boardId: number, cardList?: CardList): void {
    const data: EditCardListDialogData = {
      cardList,
      boardId,
    };
    const dialogRef = this.dialog.open(EditCardListComponent, {
      data,
      autoFocus: false,
      width: '300px',
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(() => {
        this.getBoard(boardId);
      })
    );
  }

  refresh() {
    this.getBoard(this.boardId);
  }
}
