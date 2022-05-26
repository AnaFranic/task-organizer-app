import { Component, OnInit } from '@angular/core';
import { BoardListComponent } from '../board-list/board-list.component';

import { MatDialog } from '@angular/material/dialog';
import { CardList } from '../models/cardList.models';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private http: HttpClient) { }

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

  createCardList() {
    const boardId: number = 1;
    const cardList: CardList = {
      id: 2,
      name: "card list 2"
    }
    const createCardListUrl = `http://localhost:8080/api/task/createCardList?boardId=${boardId}`;
    var subs = this.http.post<CardList>(createCardListUrl, cardList).subscribe();
    return subs;
  }

  updateCardList() {
    const boardId: number = 1;
    const cardList: CardList = {
      id: 2,
      name: "card list 2 changed"
    }
    const updateCardListUrl = `http://localhost:8080/api/task/updateCardList?boardId=${boardId}`;
    var resp = this.http.post<CardList>(updateCardListUrl, cardList).subscribe();
    return resp;
  }

  deleteCardList() {
    const cardListId: number = 2;
    const deleteCardListUrl = `http://localhost:8080/api/task/deleteCardList?id=${cardListId}`;
    var resp = this.http.delete<void>(deleteCardListUrl).subscribe();
    return resp;
  }

  getCardList() {
    const cardListId: number = 2;
    const getCardListUrl = `http://localhost:8080/api/task/getCardList?id=${cardListId}`;
    var resp = this.http.get<CardList>(getCardListUrl).subscribe();
    return resp;
  }

  createCard() {
    const cardListId: number = 2;
    const card: Card = {
      id: 3,
      name: "card 3",
      text: "text for card list 3"
    }
    const createCardUrl = `http://localhost:8080/api/task/createCard?cardListId=${cardListId}`;
    var subs = this.http.post<Card>(createCardUrl, card).subscribe();
    return subs;
  }

  updateCard() {
    const cardListId: number = 2;
    const card: Card = {
      id: 3,
      name: "card 3 changed",
      text: "changed text for card list 3"
    }
    const updateCardUrl = `http://localhost:8080/api/task/updateCard?cardListId=${cardListId}`;
    var resp = this.http.post<Card>(updateCardUrl, card).subscribe();
    return resp;
  }

  deleteCard() {
    const cardId: number = 3;
    const deleteCardUrl = `http://localhost:8080/api/task/deleteCard?id=${cardId}`;
    var resp = this.http.delete<void>(deleteCardUrl).subscribe();
    return resp;
  }

  getCard() {
    const cardId: number = 3;
    const getCardUrl = `http://localhost:8080/api/task/getCard?id=${cardId}`;
    var resp = this.http.get<Card>(getCardUrl).subscribe();
    return resp;
  }
}
