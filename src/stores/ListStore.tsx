import { observable, action, makeObservable } from 'mobx';
import { List, ListItem } from '../types';

class ListStore {

    //TODO: A DUMMY OBJECT INCASE IF THE TESTER DONT HAVE BACKEND RUNNING
    lists: List[] = [{
        _id: "123",
        title: "ABC",
        items: [{
            id: "456",
            title: "XYZ",
            details: "PPPPP"
        }]
    }];

    something: string ="1"

    selectedList: List | null = null

    constructor() {
        makeObservable(this, {
            lists: observable,
            selectedList: observable,
            something: observable,
            selectList: action,
            attachNewLists: action,
            changeListTitle: action,
            addNewList: action,
            upsertListItem: action,
            // changeListTitle: action
        });
    }

    attachNewLists(lists: List[]) {
        this.lists = lists;
    }

    selectList(list: List) {
        this.selectedList = list;
    }

    changeListTitle(listEach: List, newTitle: string) {
        listEach.title = newTitle
    }

    addNewList(newList: List) {
        this.lists.push(newList)
    }

    upsertListItem(selectedList: List, listItem: ListItem, index?: number) {
        if(index !== undefined) {
            selectedList.items[index] = listItem;   
        } else {
            selectedList.items.push(listItem)
        }
    }

    getListPrototype():List {
        return {
            title: "",
            items: []
        }
    }
    
    getListItemPrototype(): ListItem {
        return {
            title: "",
            details: "",
            date: new Date()
        }
    }
}

let listStore = new ListStore()

export default listStore;