import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Card } from '../models/card.models';
import { TaskService } from '../services/task.service';
import { EditCardDialogData } from './edit-card.models';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: EditCardDialogData,
    private dialogRef: MatDialogRef<EditCardComponent>,
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
      name: new FormControl(this.dialogData.card?.name, [Validators.required]),
      text: new FormControl(this.dialogData.card?.text, [Validators.required]),
    });
    return form;
  }

  save() {
    this.form.disable();

    const placeholderId = 0;
    const card: Card = {
      id: this.dialogData.card?.id ?? placeholderId,
      name: this.form.controls['name'].value,
      text: this.form.controls['text'].value,
    };

    const createOrUpdate$ = card.id === placeholderId
      ? this.taskService.createCard(this.dialogData.cardListId, card)
      : this.taskService.updateCard(this.dialogData.cardListId, card);

    this.subscriptions.add(
      createOrUpdate$.subscribe(() => {
        this.closeDialog();
      })
    );
  }

  deleteCard(id?: number): void {
    if (id == null) return;
    this.subscriptions.add(
      this.taskService.deleteCard(id).subscribe(() => {
        this.closeDialog();
      })
    );
  }
}
