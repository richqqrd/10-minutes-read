export interface Book {
    title: string;
    subtitle?: string;
    isbn: string;
    abstract?: string;
    author?: string;
    publisher?: string;
    price?: number;
    numPages?: number;
    cover?: string;
    likes?: number,
    userId?: number
};
