export interface List {
    _id?: string;
    title: string;
    items: ListItem[];
}

export interface ListItem {
    id?: string;
    title: string;
    details?: string;
    date?: Date
}
