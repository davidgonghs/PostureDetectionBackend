import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Unique(["email"])
    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string

    @Column()
    img: string;

    @Column()
    role: string;

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;

    // parameterized constructors
    constructor(a : string );
    constructor(a : string , b : string );
    constructor(a : string , b : string , c : string );
    constructor(a : string , b : string , c : string , d : string );
    constructor(a : string , b : string , c : string , d : string , e : string );

    constructor(username: string, password? : string, email? : string, role? : string, img? : string)
    {
        this.username = username;
        this.password = password ?? "123456789";
        this.email = email ?? username + "@posture_detection_admin.com";
        this.role = role ?? "admin";
        this.img = img ?? "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";
        this.create_at = new Date()
        this.update_at = new Date()
    }


}
