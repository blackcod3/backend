import { Order } from 'src/index';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('order_type')
export class OrderType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @OneToMany(
        () => Order, 
        (order) => order.order_type
    )
    orders: Order[];
}
