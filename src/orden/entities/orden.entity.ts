import { TipoOrden } from "src/tipo-orden/entities/tipo-orden.entity";
import { Proveedor } from "src/proveedores/entities/proveedores.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import { DetalleOrden } from "src/detalle-orden/entities/detalle-orden.entity";


@Entity()
export class Orden {

    @PrimaryGeneratedColumn()
    id: number;

    //TipoOrden
    @ManyToOne(
        () => TipoOrden,
        (tipoOrden) => tipoOrden.ordenes,
        { eager: true }
    )
    @JoinColumn({ name: 'id_tipo_orden' })
    tipo_orden: TipoOrden;

    //Proveedor
    @ManyToOne(
        () => Proveedor,
        (proveedor) => proveedor.ordenes,
        { eager: true }
    )
    @JoinColumn({ name: 'id_proveedor' })
    proveedor: Proveedor;

    @OneToMany(
        () => DetalleOrden, 
        (detalleOrden) => detalleOrden.orden, 
        { cascade: true }
    )
    detalles: DetalleOrden[];

    @Column('numeric')
    number_order: number;

    @Column({ type: 'date' })
    fecha_emision: Date;

    @Column({ type: 'text' })
    concepto: string;

    @Column({ type: 'text' })
    condiciones: string;

    @Column('float', {
        default: 0.00
    })
    subtotal: number;

    @Column('float', {
        default: 0.00
    })
    igv: number;

    @Column('float', {
        default: 0.00
    })
    retencion_impuesto: number;

    @Column('float', {
        default: 0.00
    })
    valor_neto: number;
}