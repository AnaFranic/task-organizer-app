import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { BoardListComponent } from './board-list/board-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskService } from './services/task.service';
import { BoardComponent } from './board/board.component';
import { EditBoardComponent } from './edit-board/edit-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CardListComponent } from './card-list/card-list.component';
import { EditCardListComponent } from './edit-card-list/edit-card-list.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card/card.component';
import { EditCardComponent } from './edit-card/edit-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardListComponent,
    BoardComponent,
    EditBoardComponent,
    CardListComponent,
    EditCardListComponent,
    CardComponent,
    EditCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
