import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserEntity } from "src/entity/user.entity";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<UserEntity> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }
        return user;
    }
}