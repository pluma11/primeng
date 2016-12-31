
import {Documento} from "./Documento";

export interface Publicacion {

    id:number;
    urlImagePrincipal:string;
    date:Date;
    titulo:string;
    descripcion:string;
    telefonoContacto:string;
    emailContacto:string;
    whatsApp:string;
    facebook:string;
    idCategoria:string;
    activo:boolean;
    documentos:Array<Documento>;
}
