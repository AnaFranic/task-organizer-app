import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CardList } from '../models/cardList.models';
import { TaskService } from '../services/task.service';
import { EditCardListDialogData } from './edit-card-list.models';

@Component({
  selector: 'app-edit-card-list',
  templateUrl: './edit-card-list.component.html',
  styleUrls: ['./edit-card-list.component.scss']
})
export class EditCardListComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: EditCardListDialogData,
    private dialogRef: MatDialogRef<EditCardListComponent>,
    private taskService: TaskService
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private buildForm(): FormGroup {
    const form = new FormGroup({
      name: new FormControl(this.dialogData.cardList?.name, [Validators.required]),
    });
    return form;
  }

  save() {
    this.form.disable();

    const placeholderId = 0;
    const cardList: CardList = {
      id: this.dialogData.cardList?.id ?? placeholderId,
      name: this.form.controls['name'].value,
    };

    const createOrUpdate$ = cardList.id === placeholderId
      ? this.taskService.createCardList(this.dialogData.boardId, cardList)
      : this.taskService.updateCardList(this.dialogData.boardId, cardList);

    this.subscriptions.add(
      createOrUpdate$.subscribe(() => {
        this.closeDialog();
      })
    );
  }

  deleteCardList(id?: number): void {
    if (id == null) return;
    this.subscriptions.add(
      this.taskService.deleteCardList(id).subscribe(() => {
        this.closeDialog();
      })
    );
  }
}
