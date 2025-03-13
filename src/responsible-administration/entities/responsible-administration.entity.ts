import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Authorization } from 'src/index';

@Entity()
export class ResponsibleAdministration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    signature: string;

    @OneToMany(() => Authorization, (auth) => auth.administration)
    authorizations: Authorization[];
}