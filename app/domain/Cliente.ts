
export interface Cliente {

    id:number;
    nombre:string;
    tipoDocumento:TipoDocumento;
    numeroDocumento:number;
    regimenIva:ResponsabilidadIva;
    sexo:TipoSexo;
    fechaNacimiento:Date;

    //Set<ContactoElectronico> contactoElectronico;

    //Set<Domicilio> domicilio;

    //Set<Telefono> telefono;

}

export enum TipoDocumento {
    DNI=0, CI=1, LC=2, LD=3, OTRO=4
}

export enum ResponsabilidadIva {
    IVA_RESPONSABLE_INSCRIPTO=0, IVA_SUJETO_EXENTO=1, IVA_CONSUMIDOR_FINAL=2, RESPONSABLE_MONOTRIBUTO=3
}

//hack enum con any
export enum TipoSexo {M= <any>"M",F=<any>"F"}