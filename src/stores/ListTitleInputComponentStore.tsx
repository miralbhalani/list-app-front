import { observable, action, makeObservable } from 'mobx';
import { List, ListItem } from '../types';

class ListTitleInputComponentStore {

    titleInput?: string = ""

    constructor(titleInput?:string) {
        makeObservable(this, {
            titleInput: observable
        });

        this.titleInput = titleInput;
    }

    setTitleInput(titleInput: string) {
        this.titleInput = titleInput
    }
    
}

export default ListTitleInputComponentStore;