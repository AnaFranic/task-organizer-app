import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Board } from '../models/board.models';
import { TaskService } from '../services/task.service';
import { EditBoardDialogData } from './edit-board.models';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private subscriptions = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: EditBoardDialogData,
    private dialogRef: MatDialogRef<EditBoardComponent>,
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
      name: new FormControl(this.dialogData.board?.name, [Validators.required]),
    });
    return form;
  }

  save() {
    this.form.disable();

    const placeholderId = 0;
    const board: Board = {
      id: this.dialogData.board?.id ?? placeholderId,
      name: this.form.controls['name'].value,
    };

    const createOrUpdate$ = board.id === placeholderId
      ? this.taskService.createBoard(board)
      : this.taskService.updateBoard(board);

    this.subscriptions.add(
      createOrUpdate$.subscribe(() => {
        this.closeDialog();
      })
    );
  }

  deleteBoard(id?: number): void {
    if (id == null) return;
    this.subscriptions.add(
      this.taskService.deleteBoard(id).subscribe(() => {
        this.closeDialog();
      })
    );
  }
}
