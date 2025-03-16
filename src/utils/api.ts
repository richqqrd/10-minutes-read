import { Book } from '../types/book';
import { User } from '../types/user';
import { Method } from '../types/methods';

const API_URL = "http://localhost:4730/";

const templateFetch = async (url: string, method: string, payload?: Book | User): Promise<unknown> => {
    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const returnText = await response.text();
            throw new Error(returnText);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
            throw error;
        }
    }
};

export const getAllBooks = async (): Promise<Book[]> => {
    return await templateFetch(API_URL + "books", Method.Get) as Promise<Book[]>;
};

export const getBookById = async (id: string): Promise<Book> => {
    return await templateFetch(API_URL + "books/" + id, Method.Get) as Promise<Book>;
};

export const createBook = async (book: Book): Promise<Book> => {
    return await templateFetch(API_URL + "books", Method.Post, book) as Promise<Book>;
};

export const updateBook = async (id: string, book: Book): Promise<Book> => {
    return await templateFetch(API_URL + "books/" + id, Method.Put, book) as Promise<Book>;
};

export const deleteBook = async (id: string): Promise<void> => {
    return await templateFetch(API_URL + "books/" + id, Method.Delete) as Promise<void>;
};

export const login = async (user: User): Promise<User> => {
    return await templateFetch(API_URL + "login", Method.Post, user) as Promise<User>;
};