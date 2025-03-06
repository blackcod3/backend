import {OneToMany ,Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import { Orden } from "src/orden/entities/orden.entity";

@Entity()
export class Proveedor {

    @PrimaryGeneratedColumn()
    id_proveedor: number;

    @Column({ type: 'varchar', length: 255})
    nombre: string;

    @Column({ type: 'text'})
    direccion: string;

    @Column({ type: 'varchar', length: 9, unique: true, nullable: true })
    telefono?: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    ruc: string;

    @Column({ type: 'varchar', length: 50})
    cuenta_bancaria: string;   

    @OneToMany(() => Orden, (orden) => orden.proveedor)
    ordenes: Orden[];


}
