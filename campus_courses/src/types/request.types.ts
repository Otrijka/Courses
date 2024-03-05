
export interface IGroupEdit{
    id : string,
    name: string
}

export interface IGroupCreate{
    name: string
}


export interface IUserRegistration{
    fullName: string,
    birthDate: string,
    email: string,
    password: string
    confirmPassword: string
}

export interface IEditUserProfile{
    fullName: string,
    birthDate: string
}