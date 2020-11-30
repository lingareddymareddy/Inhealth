import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login.component";
import { RegisterComponent } from './components/register.component';
import { LoginRoutingModule } from "./login.routing";
import { SharedModule } from '../shared/shared.module';
@NgModule({
    declarations: [LoginComponent,RegisterComponent],
    imports: [
        LoginRoutingModule,
        SharedModule
    ]
})
export class LoginModule {

}