import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Admin extends User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    // parameterized constructors
    constructor(a : string );
    constructor(a : string , b : string );

    constructor(username: string, password? : string, email? : string, role? : string)
    {
        super();
        this.username = username;
        this.password = password ?? "123456789";
        this.email = email ?? username + "@posture_detection.com";
        this.role = role ?? "admin";
    }



}
