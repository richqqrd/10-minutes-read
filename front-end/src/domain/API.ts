import { Book as book } from './bookInterface'
import { User as user } from '../user';
import { Method } from './methodsEnum'


const localhost = "http://localhost:4730/";


async function templateFetch(url: string, method: string, payload?: book | user): Promise<any>{
    try{
        const response = await fetch(url, {method: method, headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload)})
        if (!response.ok){
            const returnText = await response.text();
            throw new Error(returnText);
        }
         return await response.json();
    } catch(error) {
        if(error instanceof Error){
            console.error('Error:', error.message);
            throw error;
        }
    }
}

async function getAllItems(): Promise<any> {
    return await templateFetch(localhost+"books", Method.Get)
}

async function getItemById(id: string): Promise<any> {
   return await templateFetch(localhost+"books/"+id, Method.Get); 
}

async function createItem(item: book): Promise<any> {
    return await templateFetch(localhost+"books", Method.Post, item);
}

async function updateItem(id: string, item: book): Promise<any> {
    return await templateFetch(localhost+"books/"+id, Method.Put, item);
}

async function deleteItem(id: string): Promise<any> {
    return await templateFetch(localhost+"books/"+id, Method.Delete);
}

async function login(user: user): Promise<any> {
    return await templateFetch(localhost+"login", Method.Post, user);
}

export { getAllItems, getItemById, createItem, updateItem, deleteItem, login}