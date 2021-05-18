import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Array<Todo> = []
  form: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required , Validators.minLength(4)])
  })

  constructor(
  private service: TodoService
  ){}

  ngOnInit(){
    this.listarTodos()
  }

  listarTodos(){
    this.service.listar().subscribe(todoList => this.todos = todoList)
  }

  submit(){
    const todo: Todo = { ...this.form.value}
    this.service.salvar(todo).subscribe(savedTodo => 
      this.todos.push(savedTodo))
      this.form.reset()
  }

  deletar(todo: Todo){
    this.service.deletar(todo.id).subscribe({
      next: (response) => this.listarTodos()
    })
  }

  done (todo: Todo) {
    this.service.marcarconcluido(todo.id).subscribe({
      next: (todoAtual) => {
        todo.done = todoAtual.done
        todo.doneDate = todoAtual.doneDate
      }
    })
  }

}
