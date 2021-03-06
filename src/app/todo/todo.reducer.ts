import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Aprender el patrón Redux');
const todo2 = new Todo('Lazy Load en Ionc 3');
const todo3 = new Todo('Abrir Puerto 3078 para el API REST');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {
    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo];

        case fromTodo.TOGGLE_TODO:
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                   return {
                       ...todoEdit,
                       completado: !todoEdit.completado
                   };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                return { // hacemos un return para romper la referencia que hace JS
                    ...todoEdit,
                    completado: action.completado
                };
            });

        case fromTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if( todoEdit.id === action.id ) {
                return {
                    ...todoEdit,
                    texto: action.texto
                };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.BORRAR_TODO:
            return state.filter( todoEdit =>  todoEdit.id !== action.id);

        case fromTodo.BORRAR_ALL_TODO:
            return state.filter( todoEdit =>  !todoEdit.completado);

        default:
            return state;
    }
}
