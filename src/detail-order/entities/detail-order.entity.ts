import { Order } from "src/index";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";

@Entity()
export class DetailOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Order, 
        (order) => order.id, 
        { onDelete: 'CASCADE'}
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column('int', { default: 1 })
    quantity: number;

    @Column({ type: 'varchar', length: 30 })
    unit: string;

    @Column({ type: 'text' })
    description: string;

    @Column('float', { 
        default: 0 }
    )
    unit_price: number;

    @Column('float', {
        default: 0 }
    )
    total_value: number;
}