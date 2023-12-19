import { IsOptional, IsString, IsNumber } from 'class-validator';


/**
 *
 * UserLogis for the UserLog table in DynamoDB
 */
export class UserLog{

    @IsNumber()
    user_id: number;

    @IsString()
    login_date: string;

    @IsString()
    user_name: string;

    @IsString()
    user_email: string;

    @IsString()
    ip_address: string;

    @IsString()
    platform: string;

    @IsString()
    system: string;

    constructor(user_id: number, user_name: string, user_email: string, ip_address: string) {
        this.user_id = user_id;
        this.login_date = new Date().toISOString();
        this.user_name = user_name;
        this.user_email = user_email;
        this.ip_address = ip_address;
        this.platform = 'mobile';
        this.system = 'android';
    }






}