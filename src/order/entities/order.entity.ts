import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable} from "typeorm"
import {Authorization, Affectation, Billing, DetailOrder, Supplier} from 'src/index';

export enum OrderType {
    purchase = "compra",
    service = "servicio",
}
@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Authorization, (authorization) => authorization.orders)
    @JoinTable({
        name: 'order_authorization', // Nombre de la tabla intermedia
        joinColumn: { name: 'order_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'authorization_id', referencedColumnName: 'id' },
    })
    authorizations: Authorization[];

    @ManyToOne(
        () => Supplier,
        (supplier) => supplier.orders,
        {eager: true, onUpdate: 'CASCADE' }
    )
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier;

    @OneToMany(
        () => DetailOrder, 
        (detailOrder) => detailOrder.order, 
        { cascade: true }
    )
    details: DetailOrder[];

    @OneToMany(
        () => Billing,
        (billing) => billing.order,
        {cascade: true}
    )
    billings: Billing[];

    @OneToMany(
        () => Affectation, 
        (affectation) => affectation.order, 
        { cascade: true }
    )
    affectations: Affectation[];

    //2 types of order
    @Column({
        type: "enum",
        enum: OrderType,
        default: OrderType.purchase, //default purchase
    })
    order_type: OrderType;

    @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
    order_number: string;

    @Column({ type: 'date' })
    date_issued: Date;

    @Column({ type: 'text' })
    concept: string;

    @Column({type:'varchar', length: 100 })
    contract_number: string;

    @Column({ type: 'varchar', length: 10, default: 'SOLES'})
    coin: string;

    @Column('float', {
        default: 0
    })
    subtotal: number;

    @Column('float', {
        default: 0
    })
    igv: number;

    @Column('float', {
        default: 0
    })
    total:number;

    @Column('float', {
        default: 0
    })
    withholding_taxes: number;

    @Column('float', {
        default: 0
    })
    net_value: number;

    @Column({ type: 'varchar', length: 30, nullable: true })
    warehouse?: string;

    @Column({ type: 'text', nullable: true })
    conditions?: string;

    @Column({ type: 'varchar', length: 50, nullable: true} )
    workplace?: string;

    @Column({ type: 'text', nullable: true})
    deadline?: string;

    @Column({ type: 'varchar', length: 50, nullable: true} )
    payment?: string;
}