import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async guestLogin(name?: string) {
    const user = this.usersRepository.create({
      name: name || 'Guest',
      isGuest: true,
    });
    const savedUser = await this.usersRepository.save(user);

    const token = this.jwtService.sign({
      sub: savedUser.id,
      name: savedUser.name,
    });

    return {
      accessToken: token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
      },
    };
  }
}