import {Filtro} from "../domain/Filtro";
import {FilterMetadata} from 'primeng/primeng';


export class Tools {

    public static toFiltro(filters?:FilterMetadata):Filtro[]{
        let filtros:Filtro[]=[];
        if(filters){
            let keyNames:any = Object.keys(filters);
            for (var i in keyNames) {
                let keyName:string=keyNames[i];
                let valor:string=filters[keyName].value;
                filtros.push({key:keyName,value:valor})
            }
        }
        return filtros;
    }
}