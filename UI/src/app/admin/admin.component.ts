import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../core/services/admin.service'
import { UsersModel } from '../models/users.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateUserModel } from '../models/updateuser.interface';
import { AuthService } from '../core/services/auth.service';
import * as GlobalConstants  from '../core/constants/global.constant';
@Component({
    selector: 'admin',
    templateUrl: './templates/views/admin.component.html',
    styleUrls: ['./templates/less/admin.component.less']
})
export class AdminComponent implements OnInit{    
    users: UsersModel[];   
    user: UpdateUserModel;   
    displayedColumns: string[] = ['id', 'userName', 'email','createdOn','isActive'];
    dataSource:MatTableDataSource<UsersModel>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private _router: Router, private _adminService: AdminService,
        private _authService:AuthService) {

    } 
    ngOnInit() {
        console.log('Loading admin component');
        this.loadUsers();
    }
    loadUsers(){ 
        let loginuserid=(this._authService.getLoggedInUserId()); 
    if(loginuserid>0){
        if(this._authService.isAdminUser()){
        this._adminService.getUsers().subscribe(data=>{
          //  debugger;
        this.users=data;
        this.dataSource=new MatTableDataSource<UsersModel>(data); 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    }
    else{this.naviagateToHome();
        alert(GlobalConstants.UserMessage.NotAdmin);            
     }  
    } 
    else{this.naviagateToHome();
        alert(GlobalConstants.UserMessage.SessionExpired);            
    } 
}
applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
    updateUser(evt,row,action) {  
        if(action && !confirm(GlobalConstants.UserMessage.AdminConfirm)){ 
              return;
        }  
        if(!action && !confirm(GlobalConstants.UserMessage.DeleteUserConfirm)){ 
            return;
        }         
        else{      
        let loginuserid=(this._authService.getLoggedInUserId()); 
        if(loginuserid>0){
            let userDetails: UpdateUserModel = {
                id:row.id,
                updatedBy:loginuserid,
                isAdmin:action?evt.checked:null,
                isDeleted:action?null:evt.checked,
                isActive:true
            }         
        this._adminService.updateUser(userDetails).subscribe((x => {
            alert(x.errorMessage);  
            this.loadUsers();            
        }));
        }  else{alert(GlobalConstants.UserMessage.SessionExpired)}
    }
}
    naviagateToHome() {
        this._router.navigateByUrl('home');
    }
}