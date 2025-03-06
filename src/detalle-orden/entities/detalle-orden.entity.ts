import { Orden } from "src/orden/entities/orden.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";

@Entity()
export class DetalleOrden {

    @PrimaryGeneratedColumn()
    id_detalle_orden: number;

    @ManyToOne(
        () => Orden, 
        (orden) => orden.id, 
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'id_orden' })
    orden: Orden;

    @Column('int', { default: 1 })
    cantidad: number;

    @Column({ type: 'varchar', length: 50 })
    unidad: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column('float', { 
        default: 0.00 }
    )
    precio_unitario: number;

    @Column('float', {
        default: 0.00 }
    )
    valor_total: number;
}
