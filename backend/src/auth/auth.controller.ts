import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('guest')
  guestLogin(@Body('name') name?: string) {
    return this.authService.guestLogin(name);
  }
}
