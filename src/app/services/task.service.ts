import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/board.models';
import { Observable } from 'rxjs';
import { CardList } from '../models/cardList.models';
import { Card } from '../models/card.models';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getBoard(id: number): Observable<Board | undefined> {
    const boardUrl = `http://localhost:8080/api/task/getBoard?id=${id}`;
    return this.http.get<Board>(boardUrl);
  }

  getBoards(): Observable<Board[]> {
    const boardsUrl = 'http://localhost:8080/api/task/getBoards';
    return this.http.get<Board[]>(boardsUrl);
  }

  createBoard(board: Board): Observable<Board | undefined> {
    const createBoardUrl = 'http://localhost:8080/api/task/createBoard';
    return this.http.post<Board>(createBoardUrl, board);
  }

  updateBoard(board: Board): Observable<Board | undefined> {
    const updateBoardUrl = `http://localhost:8080/api/task/updateBoard?id=${board.id}`;
    return this.http.post<Board>(updateBoardUrl, board);
  }

  deleteBoard(id: number) {
    const deleteBoardUrl = `http://localhost:8080/api/task/deleteBoard?id=${id}`;
    return this.http.delete<void>(deleteBoardUrl);
  }

  createCardList(boardId: number, cardList: CardList): Observable<CardList | undefined> {
    const createCardListUrl = `http://localhost:8080/api/task/createCardList?boardId=${boardId}`;
    return this.http.post<CardList>(createCardListUrl, cardList);
  }

  updateCardList(boardId: number, cardList: CardList): Observable<CardList | undefined> {
    const updateCardListUrl = `http://localhost:8080/api/task/updateCardList?boardId=${boardId}`;
    return this.http.post<CardList>(updateCardListUrl, cardList);
  }

  deleteCardList(id: number) {
    const deleteCardListUrl = `http://localhost:8080/api/task/deleteCardList?id=${id}`;
    return this.http.delete<void>(deleteCardListUrl);
  }

  createCard(cardListId: number, card: Card): Observable<Card | undefined> {
    const createCardUrl = `http://localhost:8080/api/task/createCard?cardListId=${cardListId}`;
    return this.http.post<Card>(createCardUrl, card);
  }

  updateCard(cardListId: number, card: Card): Observable<Card | undefined> {
    const updateCardUrl = `http://localhost:8080/api/task/updateCard?cardListId=${cardListId}`;
    return this.http.post<Card>(updateCardUrl, card);
  }

  deleteCard(id: number) {
    const deleteCardUrl = `http://localhost:8080/api/task/deleteCard?id=${id}`;
    return this.http.delete<void>(deleteCardUrl);
  }
}
