import {Component,OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {InputText,Calendar,SelectItem,RadioButton,Dropdown,DataTable,Button,Dialog,Column,Header,Footer,LazyLoadEvent,Paginator,FilterMetadata} from  'primeng/primeng';
import {ClienteService} from "../../services/ClienteServices";
import {Cliente,ResponsabilidadIva,TipoDocumento,TipoSexo} from "../../domain/Cliente";
import {Tools} from "../../utils/Tools";
import {Filtro} from "../../domain/Filtro";
import {Page} from "../../domain/Page";
import {TipoSexoPipe} from "../../pipe/TipoSexoPipe";
import {TipoDocumentoPipe} from "../../pipe/TipoDocumentoPipe";
import {TipoRegimenIvaPipe} from "../../pipe/TipoRegimenIvaPipe";



@Component({
    templateUrl: 'app/ui-component/cliente-component/cliente-abm.html',
    selector: 'cliente-abm',
    directives: [InputText,Calendar,Dropdown,RadioButton,DataTable,Button,Dialog,Column,Header,Footer,Paginator],
    providers: [HTTP_PROVIDERS,ClienteService],
    pipes: [TipoSexoPipe,TipoDocumentoPipe,TipoRegimenIvaPipe]
})
export class ClienteABM implements OnInit {

    public sexos:SelectItem[];
    public tiposDoc:SelectItem[];
    public regimenesIva:SelectItem[];
    public dateValue:string;

    //dialog
    public displayDialog: boolean;

    public cliente: Cliente = this.createCleanCliente();

    public selectedCliente: Cliente;

    public newCliente: boolean;

    //table

    public datasource: Cliente[];

    public sizeRow:number=3;

    public clientes: Cliente[];

    public totalRecords: number;

    constructor(private clienteService: ClienteService) {
        this.sexos = [];
        this.sexos.push({label:'Masculino', value: TipoSexo.M});
        this.sexos.push({label:'Femenino', value: TipoSexo.F});

        this.tiposDoc= [];
        this.tiposDoc.push({label:'DNI', value:  TipoDocumento.DNI});
        this.tiposDoc.push({label:'CLI', value:  TipoDocumento.CI});
        this.tiposDoc.push({label:'LC', value:  TipoDocumento.LC});
        this.tiposDoc.push({label:'LD', value:  TipoDocumento.LD});
        this.tiposDoc.push({label:'OTRO', value:  TipoDocumento.OTRO});

        this.regimenesIva= [];
        this.regimenesIva.push({label:'Consumidor Final', value:  ResponsabilidadIva.IVA_CONSUMIDOR_FINAL});
        this.regimenesIva.push({label:'Inscripto', value:  ResponsabilidadIva.IVA_RESPONSABLE_INSCRIPTO});
        this.regimenesIva.push({label:'Exento', value:  ResponsabilidadIva.IVA_SUJETO_EXENTO});
        this.regimenesIva.push({label:'Responsable Monotributista', value:  ResponsabilidadIva.RESPONSABLE_MONOTRIBUTO});

    }

    ngOnInit() {
        this.buscarClientePaginado(0);
    }

    loadClientesLazy(event: LazyLoadEvent) {
        console.log(event.first);
        let nroPage:number=Math.trunc(event.first/event.rows);
        this.buscarClientePaginado(nroPage,event.sortField,event.sortOrder,event.filters);
    }

    private buscarClientePaginado(pagina:number,sortField?:string,sortOrder?:number,filters?:FilterMetadata){
        let filtros:Filtro[]=Tools.toFiltro(filters);

        this.clienteService.getClientes(pagina,this.sizeRow,sortField,sortOrder,filtros).then(
            (page:Page<Cliente>) =>
            {
                this.datasource = page.content;
                this.totalRecords = page.totalElements;
            });
    }


    showDialogToAdd() {
        this.newCliente = true;
        this.cliente = this.createCleanCliente();
        this.displayDialog = true;
    }

    save() {
        let clientePromise:Promise<Cliente>;
        if(this.newCliente)
        {clientePromise=this.clienteService.guardar(this.cliente);}
        else
        {clientePromise=this.clienteService.update(this.cliente);}
        clientePromise.then(cliente =>
            {   this.buscarClientePaginado(0);
                window.alert("cliente guardado con id"+cliente.id);
            }
            ,(error) => window.alert(error));

        this.cliente = null;
        this.displayDialog = false;
    }

    delete() {
        this.clienteService.deleteCliente(this.cliente.id).then(cliente =>
            {   this.datasource.splice(this.findSelectedClienteIndex(), 1);
                this.cliente = null;
                this.displayDialog = false;
            }
            ,(error) => window.alert(error));
    }

    onRowSelect(event) {
        this.newCliente = false;
        this.cliente = this.cloneCliente(event.data);
        this.displayDialog = true;
    }

    cloneCliente(u: Cliente): Cliente {
        let cliente = this.createCleanCliente();
        for(let prop in u) {
            cliente[prop] = u[prop];
        }
        return cliente;
    }

    findSelectedClienteIndex(): number {
        return this.datasource.indexOf(this.selectedCliente);
    }

    public createCleanCliente():Cliente{
        return {id:null,
            nombre:'',
            tipoDocumento: TipoDocumento.DNI,
            numeroDocumento:null,
            regimenIva:ResponsabilidadIva.IVA_CONSUMIDOR_FINAL,
            sexo:TipoSexo.M,
            fechaNacimiento:null};
    }

}
