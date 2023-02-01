export interface IUsers {
    id: number
    name: string
    username: string
    phone: string
    email: string
}

export interface IUser extends Omit<IUsers, 'id'>{
    address: IUserAddress
    website: string
    company: IUserCompany
}

interface IUserAddress {
    street: string
    suite: string
    city: string
    zipcode: string
}
interface IUserCompany {
    name: string
}
