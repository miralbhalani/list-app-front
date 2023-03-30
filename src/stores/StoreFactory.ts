import TodoListComponantStore from "./TodoListComponentStore";
import ListTitleInputComponentStore from "./ListTitleInputComponentStore";

export const getTodoListComponantStore = (): TodoListComponantStore => {
    return new TodoListComponantStore();
}

export const getListTitleItemComponentStore = (): ListTitleInputComponentStore => {
    return new ListTitleInputComponentStore();
}