import {Pipe, PipeTransform} from '@angular/core';
import {ResponsabilidadIva,TipoDocumento,TipoSexo} from "../domain/Cliente";

@Pipe({name: 'tipoSexoP'})
export class TipoSexoPipe implements PipeTransform {
    transform(value:any, args:string[]) : any {
        let descripcion:string;
        switch (value)
        {
            case TipoSexo.M:
                descripcion='Masculino';
                break;
            case TipoSexo.F:
                descripcion='Femenino';
                break;
            default:
                descripcion='';
        }
        return descripcion;
    }
}