import { observable, action, makeObservable } from 'mobx';
import { List, ListItem } from '../types';

class TodoListComponantStore {

    isAddTodoModalOpen: boolean = false

    selectedListItem: ListItem | null = null
    selectedListIndex?: number

    constructor() {
        makeObservable(this, {
            isAddTodoModalOpen: observable,
            selectedListItem: observable,
            selectedListIndex: observable
        });
    }

    setSelectedListItem(selectedListItem: ListItem | null) {
        this.selectedListItem = selectedListItem
    }

    setSelectedListIndex(selectedListIndex?: number) {
        this.selectedListIndex = selectedListIndex
    }

    closeAddTodoModal() {
        this.isAddTodoModalOpen = false;
    }

    openAddTodoModal() {
        this.isAddTodoModalOpen = true;
    }
}

export default TodoListComponantStore;