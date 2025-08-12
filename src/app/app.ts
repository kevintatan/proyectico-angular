import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definimos la estructura de una tarea
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Tipos de filtro posibles
type FilterType = 'all' | 'active' | 'completed';

// Tipos de secciones para la navegación
type SectionType = 'tareas' | 'nosotros' | 'contacto';

@Component({
  selector: 'app-root',
  standalone: true, // Esto es importante para standalone components
  imports: [CommonModule, FormsModule], // Importamos los módulos que necesitamos
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Título de la aplicación
  title = 'Lista de Tareas';
  
  // Array para almacenar todas las tareas
  todos: Todo[] = [];
  
  // Texto que el usuario está escribiendo
  newTodoText = '';
  
  // Filtro actual (todas, activas, completadas)
  currentFilter: FilterType = 'all';
  
  // Sección actual de navegación
  currentSection: SectionType = 'tareas';
  
  // Información para la sección Nosotros
  nosotrosInfo = {
    titulo: 'Sobre Nosotros',
    descripcion: 'SOMOS LO MAS CHIMBA DE LO CHIMBA.'
  };
  
  // Información para la sección Contacto
  contactoInfo = {
    titulo: 'Contacto',
    email: 'contacto@milistatareas.com',
    telefono: '+57 312 456 7890'

  };

  
  // Contador para asignar IDs únicos a cada tarea
  private nextId = 1;

  // Método para agregar una nueva tarea
  addTodo(): void {
    // Solo agregar si hay texto y no está vacío
    if (this.newTodoText.trim()) {
      const newTodo: Todo = {
        id: this.nextId++,
        text: this.newTodoText.trim(),
        completed: false
      };
      
      // Agregar la nueva tarea al array
      this.todos.push(newTodo);
      
      // Limpiar el campo de texto
      this.newTodoText = '';
    }
  }

  // Método para alternar el estado completado de una tarea
  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  // Método para eliminar una tarea
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  // Método para obtener las tareas filtradas según el filtro actual
  getFilteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  // Método para cambiar el filtro
  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
  }

  // Método para obtener el contador de tareas pendientes
  getActiveCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  // Método para limpiar todas las tareas completadas
  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  // Método que se ejecuta cuando el usuario presiona una tecla en el input
  onKeyPress(event: KeyboardEvent): void {
    // Si presiona Enter, agregar la tarea
    if (event.key === 'Enter') {
      this.addTodo();
    }
  }
  
  // Método para cambiar la sección actual
  setSection(section: SectionType): void {
    this.currentSection = section;
  }
}