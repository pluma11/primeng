import {Pipe, PipeTransform} from '@angular/core';
import {TipoDocumento} from "../domain/Cliente";

@Pipe({name: 'tipoDocumentoP'})
export class TipoDocumentoPipe implements PipeTransform {
    transform(value:number, args:string[]) : any {
        let descripcion:string;
        switch (value)
        {
            case TipoDocumento.CI:
                descripcion='CI';
                break;
            case TipoDocumento.DNI:
                descripcion='DNI';
                break;
            case TipoDocumento.LC:
                descripcion='LC';
                break;
            case TipoDocumento.LD:
                descripcion='LD';
                break;
            case TipoDocumento.OTRO:
                descripcion='OTRO';
                break;
            default:
                descripcion='';
        }
        return descripcion;
    }
}