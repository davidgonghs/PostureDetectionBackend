import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // parameterized constructors
    constructor(a : string );
    constructor(a : string , b : string );

    constructor(username: string, password? : string)
    {
        this.username = username;
        this.password = password ?? "123456789";
    }



}
