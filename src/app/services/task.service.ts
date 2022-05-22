import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/board.models';
import { Observable } from 'rxjs';


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
}
