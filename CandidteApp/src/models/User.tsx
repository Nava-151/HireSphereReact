type User = {
    id?: number,
    fullName: string,
    email: string,
    passwordHash: string,
    phone: string,
    role?: UserRole

}
export default User
export type UserLogin = {
    email: string,
    passwordHash: string
    role: UserRole
}

export type UpdateUser = {
    fullName: string,
    email: string,
    phone: string,
}

export enum UserRole {
    Candidate = 0,
    Employer = 1,
    Admin = 2,
}