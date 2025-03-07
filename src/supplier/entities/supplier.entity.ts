import {OneToMany ,Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import { Order } from "src/index";

@Entity()
export class Supplier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255})
    name: string;

    @Column({ type: 'text'})
    address: string;

    @Column({ type: 'varchar', length: 9, unique: true, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    ruc: string;

    @Column({ type: 'varchar', length: 50})
    bank_account: string;   

    @OneToMany(() => Order, (order) => order.supplier)
    orders: Order[];
}