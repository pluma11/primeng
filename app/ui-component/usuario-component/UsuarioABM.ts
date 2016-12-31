import {Component,OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {InputText,DataTable,Button,Dialog,Column,Header,Footer,LazyLoadEvent,Paginator,FilterMetadata} from  'primeng/primeng';
import {UsuarioService} from "../../services/UsuarioServices";
import {Usuario} from "../../domain/Usuario";
import {Tools} from "../../utils/Tools";
import {Filtro} from "../../domain/Filtro";
import {Page} from "../../domain/Page";



@Component({
    templateUrl: 'app/ui-component/usuario-component/usuario-abm.html',
    selector: 'usuario-abm',
    directives: [InputText,DataTable,Button,Dialog,Column,Header,Footer,Paginator],
    providers: [HTTP_PROVIDERS,UsuarioService]
})
export class UsuarioABM implements OnInit {

    //dialog
    public displayDialog: boolean;

    public usuario: Usuario = this.createCleanUser();

    public selectedUsuario: Usuario;

    public newUsuario: boolean;

    //table

    public datasource: Usuario[];

    public sizeRow:number=3;

    public usuarios: Usuario[];

    public totalRecords: number;

    constructor(private usuarioService: UsuarioService) { }

    ngOnInit() {
        this.buscarUsuarioPaginado(0);
    }

    loadUsuariosLazy(event: LazyLoadEvent) {
        console.log(event.first);
        let nroPage:number=Math.trunc(event.first/event.rows);
        this.buscarUsuarioPaginado(nroPage,event.sortField,event.sortOrder,event.filters);
    }

    private buscarUsuarioPaginado(pagina:number,sortField?:string,sortOrder?:number,filters?:FilterMetadata){
        let filtros:Filtro[]=Tools.toFiltro(filters);

        this.usuarioService.getUsers(pagina,this.sizeRow,sortField,sortOrder,filtros).then(
            (page:Page<Usuario>) =>
            {
                this.datasource = page.content;
                this.totalRecords = page.totalElements;
            });
    }


    showDialogToAdd() {
        this.newUsuario = true;
        this.usuario = this.createCleanUser();
        this.displayDialog = true;
    }

    save() {
        let usuarioPromise:Promise<Usuario>;
        if(this.newUsuario)
        {usuarioPromise=this.usuarioService.guardar(this.usuario);}
        else
        {usuarioPromise=this.usuarioService.update(this.usuario);}
        usuarioPromise.then(usuario =>
            {   this.buscarUsuarioPaginado(0);
                window.alert("usuario guardado con id"+usuario.id);
            }
            ,(error) => window.alert(error));

        this.usuario = null;
        this.displayDialog = false;
    }

    delete() {
        this.usuarioService.deleteUser(this.usuario.id).then(usuario =>
            {   this.datasource.splice(this.findSelectedUsuarioIndex(), 1);
                this.usuario = null;
                this.displayDialog = false;
            }
            ,(error) => window.alert(error));
    }

    onRowSelect(event) {
        this.newUsuario = false;
        this.usuario = this.cloneUsuario(event.data);
        this.displayDialog = true;
    }

    cloneUsuario(u: Usuario): Usuario {
        let usuario = this.createCleanUser();
        for(let prop in u) {
            usuario[prop] = u[prop];
        }
        return usuario;
    }

    findSelectedUsuarioIndex(): number {
        return this.datasource.indexOf(this.selectedUsuario);
    }

    public createCleanUser():Usuario{
        return {id:null,
            email:'',
            nombre:'',
            apellido:'',
            password:''};
    }

}
