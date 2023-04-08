import { List, ListItem } from "../types";
import axios from 'axios';
import settings from '../settings';
import axiosWrapper from '../lib/axiosWrapper';

export const getToken = async ( creds?: any) : Promise<string> => {

    var response = await axios.post(`${settings.backendBase}/token`, {
        ...(creds || {
            "username": "listuser1",
            "password": "dlojekm!23%123"
        })
    })
    return response.data.token
} 

export const getList = async (query?: string) : Promise<List[] | boolean> => {

    try {
        var response = await axiosWrapper.get(`/list${query && `?q=${query}` || '' }`)
        return response.data
    } catch (error) {
        console.log("Error log", error)
        return false
    }
} 

export const addList = async (list: List) : Promise<string | boolean> => {

    try {
        var response = await axiosWrapper.post("/list", list)
        return response.data.status && response.data.id
    } catch (error) {
        console.log("Error log", error)
        return false
    }
} 

export const editListTitle = async (listId: string,  title: string) : Promise<boolean> => {

    try {
        var response = await axiosWrapper.patch(`/list/${listId}`, {title})
        return response.data.status as boolean
    } catch (error) {
        console.log("Error log", error)
        return false
    }

} 

export const addListItem = async (listId: string, listItem: ListItem) : Promise<boolean | string> => {

    try {
        var response = await axiosWrapper.post(`/list/${listId}/items`, listItem)
        return response.data.status && response.data.id
    } catch (error) {
        console.log("Error log", error)
        return false
    }
} 

export const editListItem = async (listId: string,  listItem: ListItem, listItemId: string,) : Promise<boolean> => {

    try {
        var response = await axiosWrapper.put(`/list/${listId}/items/${listItemId}`, listItem)
        return response.data.status as boolean
    } catch (error) {
        console.log("Error log", error)
        return false
    }
} 

export const upsertListItem = async (listId: string, listItem: ListItem, listItemId?: string | null) : Promise<boolean | string> => {

    if(listItemId) {
        return editListItem(listId, listItem, listItemId)
    } else {
        return addListItem(listId, listItem)
    }
} 
