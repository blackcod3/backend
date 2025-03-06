import { Orden } from 'src/orden/entities/orden.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('tipo_orden')
export class TipoOrden {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @OneToMany(
        () => Orden, 
        (orden) => orden.tipo_orden
    )
    ordenes: Orden[];
}
