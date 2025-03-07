import { Order } from "src/index";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from "typeorm";

@Entity()
export class DetailOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Order, 
        (order) => order.id, 
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'id_order' })
    order: Order;

    @Column('int', { default: 1 })
    quantity: number;

    @Column({ type: 'varchar', length: 50 })
    unit: string;

    @Column({ type: 'text' })
    description: string;

    @Column('float', { 
        default: 0.00 }
    )
    unit_price: number;

    @Column('float', {
        default: 0.00 }
    )
    total_value: number;
}