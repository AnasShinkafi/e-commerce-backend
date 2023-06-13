import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<UserEntity> {
        const user = await this.userService.findUser(email);
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (user && isPasswordMatch) {
            return user;
        }
        return null;
    }

    async login(user: any) {
         const payload = { username: user.username, sub: user.id, roles: user.roles };
         return {
            access_token: this.jwtService.sign(payload),
         };
    }
}
