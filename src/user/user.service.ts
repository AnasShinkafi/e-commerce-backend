import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

        async addUser(createUserDto: CreateUserDto): Promise<UserEntity> {
            const newUser = await this.userRepository.create();
            newUser.password = await bcrypt.hash(newUser.password, 10)
            return newUser
        }

        async findUser(email: string): Promise<UserEntity | undefined > {
            const user =await this.userRepository.findOne({ where: {email} });
            return user
        }
}
