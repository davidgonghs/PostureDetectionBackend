import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Between, Repository } from "typeorm";
import { processPassword } from "../utils/processPassword";
import { JwtService } from "@nestjs/jwt";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserLogService } from "../user-log/user-log.service";
import { UserLogModule } from "../user-log/user-log.module";
import { UserLog } from "../user-log/model/userlog.model";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly userLogService: UserLogService
  ) {
  }


  async create(createUserDto: CreateUserDto) {
    const user: User = new User(createUserDto.username, createUserDto.password, createUserDto.email, createUserDto.img);
    user.create_at = new Date();
    user.password = await processPassword(user.password);
    // const user = await this.adminRepository.create(admin);
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return user;
  }

  // find all function
  async findAll(
    page:number,
    pageSize:number
  ) {

    const [users, totalItems] = await this.userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    // convert user to web user
    let webUsers = [];
    for (let user of users) {
      webUsers.push(user.toWeb());
    }
    return { webUsers, page,totalItems, totalPages };
  }

  // find one function
  async findOne(id: number) {
    let user = await this.userRepository.findOneBy({ id: id });
    if (user) {
      return user.toWeb();
    }else{
      return null;
    }
  }

  // find by email
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepository.findOne({ where: { username: userName } });
  }


  // update function
  async update(id: number, updateUserDto: UpdateUserDto){
    // Find the user you want to update
    const userToUpdate = await this.findOne(id);

    // If the user doesn't exist, return undefined or throw an exception
    if (!userToUpdate) {
      return undefined; // You can throw an exception here if you prefer
    }

    // Update the user's properties with the values from updateUserDto
    if (updateUserDto.username) {
      userToUpdate.username = updateUserDto.username;
    }
    if (updateUserDto.email) {
      userToUpdate.email = updateUserDto.email;
    }
    if (updateUserDto.img) {
      userToUpdate.img = updateUserDto.img;
    }
    // Add more properties as needed

    // Save the updated user back to the database
    await this.userRepository.save(userToUpdate);

    return userToUpdate;
  }

  // delete function
  async remove(id: number) {
    try{
      await this.userRepository.delete(id);
      return true;
    }catch (e) {
      throw new Error(e.message);
    }
  }

//   count total user
  async countUser(start,end) {
    let totalUser = await this.userRepository.count();
    const startDay = new Date(start);
    startDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    const endDay = new Date(end);
    endDay.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    const query = `
        SELECT COUNT(*) as checkuser
        FROM "user"
        WHERE create_at >= $1
          AND create_at < $2;
    `;

    const result = await this.userRepository.query(query, [startDay, endDay]);
    const checkUser = parseInt(result[0].checkuser)
    return { totalUser, checkUser };
  }


  //countUserLastWeek
  async countNewUserLastWeek() {
    try {
      // Get today's date
      const today = new Date();

      // Get the date of 7 days ago
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

      // Create an array to store the count of new users for each day of the last week
      const newUserCounts = [];

      // Loop through each day of the last week
      for (let i = 0; i < 7; i++) {
        // Calculate the date
        const date = new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate() + i);

        // Format the date as YYYY-MM-DD
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        const query = `
        SELECT COUNT(*) as checkuser
        FROM "user"
        WHERE create_at::date = $1;
    `;

        const result = await this.userRepository.query(query, [formattedDate]);
        const count = parseInt(result[0].checkuser)
        // Store the count in the array
        newUserCounts.push({
          date: formattedDate,
          newUser: count,
        });
      }

      // Return the array
      return newUserCounts;
    } catch (error) {
      console.error('Error counting users for the last week:', error);
      throw new Error('Error counting users for the last week');
    }
  }


  async countUserLastWeek() {
    try {
      // Get today's date
      const today = new Date();

      // Get the date of 7 days ago
      const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

      // Create an array to store the count of new users for each day of the last week
      const userCounts = [];

      // Loop through each day of the last week
      for (let i = 0; i < 7; i++) {
        // Calculate the date
        const date = new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate() + i);

        // Format the date as YYYY-MM-DD
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        const query = `
        SELECT COUNT(*) as checkuser
        FROM "user"
        WHERE create_at::date <= $1;
    `;

        const result = await this.userRepository.query(query, [formattedDate]);
        const count = parseInt(result[0].checkuser)
        // Store the count in the array
        userCounts.push({
          date: formattedDate,
          userNumber: count,
        });
      }

      // Return the array
      return { userCounts };
    } catch (error) {
      console.error('Error counting users for the last week:', error);
      throw new Error('Error counting users for the last week');
    }
  }


//   register
  async register(createUserDto: CreateUserDto) {
    const user: User = new User(createUserDto.username, createUserDto.password,createUserDto.email);
    user.create_at = new Date();
    user.password = await processPassword(user.password);
    // const user = await this.adminRepository.create(admin);
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return user;
  }

//   google login
  async googleLogin(createUserDto: CreateUserDto,ip: string) {
    // find user by email
    let user = await this.findOneByEmail(createUserDto.email);
    // if user not exist create new user
    if (!user) {
      // create new user
      user = await this.create(createUserDto);
    }
    await this.userLogService.create(new UserLog(user.id,user.username,user.email,ip));
    const { password, ...result } = user;
    return user;
  }






}
