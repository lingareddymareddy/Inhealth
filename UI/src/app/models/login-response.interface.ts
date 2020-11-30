export interface LoginResponseModel {
        authToken: string;
        errorMessage: string;
        expires:string;
        userName:string;
        isAdmin:boolean;
        id:number;
}