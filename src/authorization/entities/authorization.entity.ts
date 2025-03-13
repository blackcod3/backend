import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne} from 'typeorm';
import {Order, ResponsibleAdministration, ResponsibleLogistic, ResponsibleSupplier } from 'src/index';

@Entity()
export class Authorization {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToMany(() => Order, (order) => order.authorizations) 
    orders: Order[];

    @ManyToOne(
        () => ResponsibleAdministration, 
        (administration) => administration.authorizations,
        { eager: true, onUpdate: 'CASCADE' }
    )
    @JoinColumn({ name: 'administration_id' })
    administration: ResponsibleAdministration;

    @ManyToOne(
        () => ResponsibleLogistic, 
        (logistics) => logistics.authorizations,
        { eager: true, onUpdate: 'CASCADE' }
    )
    @JoinColumn({ name: 'logistics_id' })
    logistics: ResponsibleLogistic;


    @ManyToOne(
        () => ResponsibleSupplier, 
        (suppliers) => suppliers.authorizations,
        {eager: true, onUpdate: 'CASCADE'})
    @JoinColumn({ name: 'suppliers_id' })
    suppliers: ResponsibleSupplier;

    @Column({ type: 'date' })
    completion_date: Date;
}