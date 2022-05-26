import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditCardListComponent } from '../edit-card-list/edit-card-list.component';
import { EditCardListDialogData } from '../edit-card-list/edit-card-list.models';
import { CardList } from '../models/cardList.models';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {
  @Input() boardId?: number;
  @Input() cardList?: CardList;
  @Output() refresh = new EventEmitter();

  private subscriptions = new Subscription();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  editCardList(boardId: number, cardList?: CardList): void {
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
        this.refresh.emit();
      })
    );
  }
}
