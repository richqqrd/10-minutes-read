export interface User {
    accessToken?: string,
    email: string,
    id?: number,
    password: string

    setAccessToken?: (accessToken: string) => void;
    setEmail?: (email: string) => void;
    setId?: (id: number) => void;
    setPassword?: (password: string) => void;
}