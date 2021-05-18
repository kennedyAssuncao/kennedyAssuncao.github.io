import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})



export class TodoService {

  apiURL: string = environment.apiURL

  constructor(
    private http: HttpClient
  ) { }
salvar(todo: Todo) : Observable<Todo> {
  return this.http.post<Todo>(this.apiURL, todo)
}

listar(): Observable<Array<Todo>>{
  return this.http.get<Array<Todo>>(this.apiURL)
}

deletar(id: number) : Observable<void> {
  const url = `${this.apiURL}/${id}`
  return this.http.delete<void>(url)
}

marcarconcluido (id: number) : Observable <Todo> {
  const url = `${this.apiURL}/${id}/done`
  return this.http.patch<Todo>(url, {})
}

}
