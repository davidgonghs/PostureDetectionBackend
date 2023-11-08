import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private  readonly userRepository: Repository<User>,
  ) {}


  async create(createUserDto: User) : Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  // find all function
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // find one function
  async findOne(id: number): Promise<User> {
    let user = new User()
    user.id = id;
    return await this.userRepository.findOneBy(user);
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
    if (updateUserDto.name) {
      userToUpdate.name = updateUserDto.name;
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



  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
