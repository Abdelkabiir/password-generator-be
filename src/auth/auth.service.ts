import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  createSession(loginData) {
    return loginData;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
