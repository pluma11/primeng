import {ResponsabilidadIva,TipoDocumento,TipoSexo} from "../domain/Cliente";

export class EnumUtils {

    public static SEXOS:TipoSexo[]=[TipoSexo.M,TipoSexo.F];
    public static TIPOS_DOC:TipoDocumento[]=[TipoDocumento.DNI,
                                            TipoDocumento.CI,
                                            TipoDocumento.LC,
                                            TipoDocumento.LD,
                                            TipoDocumento.OTRO
                                            ];
    public static REGIMENES_IVA:ResponsabilidadIva[]=
        [
            ResponsabilidadIva.IVA_CONSUMIDOR_FINAL,
            ResponsabilidadIva.IVA_RESPONSABLE_INSCRIPTO,
            ResponsabilidadIva.IVA_SUJETO_EXENTO,
            ResponsabilidadIva.RESPONSABLE_MONOTRIBUTO
        ];
}