import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "src/index";

@Entity()
export class Billing {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Order,
        (order) => order.id,
        {onDelete: 'CASCADE'},

    )
    @JoinColumn({ name: 'order_id'})
    order: Order;

    @Column({ type: 'varchar', length: 255 })
    social_reason: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    ruc: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address?: string;
}