export interface PostResponseModel {
    // authToken: string;
     errorMessage?: string;    
     name:string;
     description:string;
     createdBy?:string;
     isActive?:boolean;
     id?:number; 
     cols: number;
     rows: number;
     createdOn?:Date;  

   // "updatedBy": 1,
   // "updatedOn": "2020-11-25T23:50:00",
   // "isDeleted": false
}