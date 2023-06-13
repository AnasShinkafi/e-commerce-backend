import { Role } from "src/auth/enums/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false })
    password: string;

    @Column({default: 'user'})
    roles: Role[];

}