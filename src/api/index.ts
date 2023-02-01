import axios from "axios";
import type { IUsers, IUser } from "@/types/interface";

const baseURL: string = import.meta.env.VITE_BASE_API

const adapter = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json'
    }
})

const backend = {
    getUsers: (): Promise<{ data: IUsers }> => adapter.get('/users'),
    getUser: (id: string): Promise<{ data: IUser }> => adapter.get(`/users/${id}`),
    createUser: (data: IUser) => adapter.post('/user', data)
}

export { backend }
