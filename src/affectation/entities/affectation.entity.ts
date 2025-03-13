import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Order } from "src/index";
import { IsInt, Min } from "class-validator";

@Entity()
export class Affectation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Order,
        (order) => order.id,
        { onDelete: 'CASCADE'},
    )
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column({ type: 'varchar', length: 10 })
    meta_nemonico: string;
    
    @Column()
    @IsInt()
    @Min(1)   
    accounting_code: number;

    @Column({type: 'varchar', length: 50})
    denomination: string;

    @Column('float', {
        default: 0
    })
    amount: number;
}