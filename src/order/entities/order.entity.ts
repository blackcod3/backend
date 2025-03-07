import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import {DetailOrder, Supplier, OrderType} from 'src/index';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    //TipoOrden
    @ManyToOne(
        () => OrderType,
        (orderType) => orderType.orders,
        { eager: true }
    )
    @JoinColumn({ name: 'id_order_type' })
    order_type: OrderType;

    //Proveedor
    @ManyToOne(
        () => Supplier,
        (supplier) => supplier.orders,
        { eager: true }
    )
    @JoinColumn({ name: 'id_supplier' })
    supplier: Supplier;

    @OneToMany(
        () => DetailOrder, 
        (detailOrder) => detailOrder.order, 
        { cascade: true }
    )
    details: DetailOrder[];

    @Column('numeric')
    number_order: number;

    @Column({ type: 'date' })
    date_issued: Date;

    @Column({ type: 'text' })
    concept: string;

    @Column({ type: 'text' })
    conditions: string;

    @Column('float', {
        default: 0.00
    })
    subtotal: number;

    @Column('float', {
        default: 0.00
    })
    igv: number;

    @Column('float', {
        default: 0.00
    })
    withholding_taxes: number;

    @Column('float', {
        default: 0.00
    })
    net_value: number;
}