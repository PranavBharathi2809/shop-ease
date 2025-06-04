//Defines the state of authentication state , which is used to type
//used to type the redux slice i.e authslice.ts

export interface AuthState{
    isAuthentication :boolean,
    name: string|null,
    token:string|null
    loading:boolean,
    error:string|null,
    message:string|null,
    email:string|null
}

//
export interface AuthPayload{
    email:string,
    name:string,
    token:string,
    message:string
    
}