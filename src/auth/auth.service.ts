import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {EAuth, ERoles} from 'src/types';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

import { UsersService } from 'src/users/users.service';
import { commonCookieOptions } from 'src/utils/cookieOptions';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async findUser(id: number) {
        return await this.usersService.findOneById(id);
    }

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findOneByEmail(email, false);

        if(user.password === null) {
            throw new BadRequestException(EAuth.INVALID_CREDENTIALS);
        }

        const isComparedPassword = await compare(pass, user.password);

        if (user && isComparedPassword) {
            const { password, ...rest } = user;

            return rest;
        }
        return null;
    }

    async saveGoogleUser(displayName: string, email: string) {
        try {
            const existingUser = await this.usersService.findOneByEmail(email, true);

            if (existingUser) {
                existingUser.name = displayName;
                await this.usersService.updateUser(existingUser);

                return existingUser;
            }

           return await this.usersService.createUser({
                name: displayName,
                emails: [email],
                password: null,
                role: [ERoles.USER]
            });

        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async register(createUserDto: CreateUserDto) {
        await this.usersService.createUser(createUserDto);

        const user = await this.usersService.findOneByEmail(
            createUserDto.emails[0],
            false,
        );
        const { id, name, emails, role } = user;
        const payload = {
            emails,
            id,
            name,
            role
        };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

        return { accessToken, refreshToken, message: EAuth.REGISTER_SUCCESS };
    }

    async login(request, isGoogle) {
        const user = await this.usersService.findOneByEmail(
            request.user.email,
            isGoogle,
        );


        const { id, name, emails, role } = user;
        const payload = {
            email: emails[0],
            id,
            name,
            role
        };

        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

        return { accessToken, refreshToken, message: EAuth.LOGIN_SUCCESS };
    }

    logout(res) {
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');
        res.cookie('logged_in', false, commonCookieOptions);

        return {
            message: EAuth.LOGOUT_SUCCESS,
        };
    }

    async getUserByToken(accessToken) {
        try {
            const user = this.jwtService.decode(
                accessToken,
                this.configService.get('JWT_SECRET'),
            );
            return user;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async refreshToken(req) {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) throw new UnauthorizedException();
        try {
            this.jwtService.verify(
                refreshToken,
                this.configService.get('JWT_SECRET'),
            );
        } catch (error) {
            throw new UnauthorizedException();
        }
        const user = this.jwtService.decode(
            refreshToken,
            this.configService.get('JWT_SECRET'),
        );

        if (typeof user === 'object' && user !== null) {
            const { id, name, email } = user;
            const payload = {
                email,
                id,
                name,
            };
            const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
            return { accessToken };
        }
    }
}
