import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ArrayContains, Repository} from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EAuth } from 'src/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: { emails: ArrayContains([createUserDto.emails]) },
        });

        if (existUser) {
            throw new BadRequestException(EAuth.USER_EXIST);
        }

        const user = await this.userRepository.save({
            ...createUserDto,
            password: createUserDto.password
                ? await hash(createUserDto.password, 12)
                : null,
        });

        const { id, name, emails } = user;

        const token = this.jwtService.sign({ id, name, email: emails[0] });

        return { id, name, email: emails[0], token };
    }

    async findOneByEmail(email: string, isGoogle: boolean) {
        const user = await this.userRepository.findOne({
            where: { emails: ArrayContains([email]) },
        });

        if(!user && isGoogle) return

        if (!user && !isGoogle) {
            throw new BadRequestException(EAuth.INVALID_CREDENTIALS);
        }

        return user;
    }

    async findOneById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new BadRequestException(EAuth.USER_NOT_EXIST);
        }

        return user;
    }

    async updateUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }
}
