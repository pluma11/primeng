import {Pipe, PipeTransform} from '@angular/core';
import {ResponsabilidadIva} from "../domain/Cliente";

@Pipe({name: 'tipoRegimenIvaP'})
export class TipoRegimenIvaPipe implements PipeTransform {
    transform(value:number, args:string[]) : any {
        let descripcion:string;
        switch (value)
        {
            case ResponsabilidadIva.IVA_CONSUMIDOR_FINAL:
                descripcion='Consumidor Final';
                break;
            case ResponsabilidadIva.IVA_RESPONSABLE_INSCRIPTO:
                descripcion='Inscripto';
                break;
            case ResponsabilidadIva.IVA_SUJETO_EXENTO:
                descripcion='Exento';
                break;
            case ResponsabilidadIva.RESPONSABLE_MONOTRIBUTO:
                descripcion='Responsable Monotributista';
                break;
            default:
                descripcion='';
        }
        return descripcion;
    }
}