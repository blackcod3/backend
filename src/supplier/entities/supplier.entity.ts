import {OneToMany ,Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import { Order } from "src/index";

@Entity()
export class Supplier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    name: string;

    @Column({ type: 'varchar', length: 255})
    address: string;

    @Column({ type: 'varchar', length: 9, unique: true, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 11, unique: true, nullable: true })
    ruc?: string;

    @Column({ type: 'varchar', length: 100, nullable: true})
    bank_account?: string;   

    @OneToMany(() => Order, (order) => order.supplier)
    orders: Order[];
}