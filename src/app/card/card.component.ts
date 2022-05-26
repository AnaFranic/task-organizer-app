import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { EditCardDialogData } from '../edit-card/edit-card.models';
import { Card } from '../models/card.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() cardListId?: number;
  @Input() card?: Card;
  @Output() refresh = new EventEmitter();

  private subscriptions = new Subscription();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  editCard(cardListId: number, card?: Card): void {
    const data: EditCardDialogData = {
      card,
      cardListId,
    };
    const dialogRef = this.dialog.open(EditCardComponent, {
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
