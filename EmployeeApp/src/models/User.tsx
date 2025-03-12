type User={
    id?:number,
    fullname:string,
    email:string,
    passwordHash:string,
    phone:string,
    role:UserRole

}
export default  User
export type UserLogin={
    email:string,
    passwordHash:string
}

export enum UserRole {
    Candidate=0,
    Employer = 1,
    Admin = 2,
  }