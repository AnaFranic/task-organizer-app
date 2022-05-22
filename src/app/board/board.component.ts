import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { Board } from '../models/board.models';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  board?: Board;

  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap
        .pipe(
          map(paramMap => Number(paramMap.get('id'))),
          distinctUntilChanged(),
        )
        .subscribe((id) => {
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
}
