import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }


  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  // find all function
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // find one function
  async findOne(id: number): Promise<User> {
    let user = new User();
    user.id = id;
    return await this.userRepository.findOneBy(user);
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepository.findOne({ where: { username: userName } });
  }


  // update function
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | undefined> {
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
    // Add more properties as needed

    // Save the updated user back to the database
    await this.userRepository.save(userToUpdate);

    return userToUpdate;
  }

  // delete function
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

//   count total user
  async countUser(type: string) {
    let totalUser = 0;
    if (type == "all") {
      totalUser = await this.userRepository.count();
    } else if (type == "new") {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Set the time to the beginning of the next day

      const query = `
          SELECT COUNT(*) as totalUser
          FROM user
          WHERE create_at >= $1
            AND create_at < $2;
      `;

      const result = await this.userRepository.query(query, [today, tomorrow]);
      totalUser = result[0].totalUser;
    }
    return totalUser;
  }


}
