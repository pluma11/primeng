import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {InputText,DataTable,Button,Dialog,Column,Header,Footer} from 'primeng/primeng';
import {UsuarioABM} from "./ui-component/usuario-component/UsuarioABM";
import {ClienteABM} from "./ui-component/cliente-component/ClienteABM";

@Component({
	templateUrl: 'app/app.component.html',
	selector: 'my-app',
    directives: [InputText,DataTable,Button,Dialog,Column,Header,Footer,UsuarioABM,ClienteABM],
	providers: [HTTP_PROVIDERS]
})
export class AppComponent {

    text: string;


}

