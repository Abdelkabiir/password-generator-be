import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  createSession(logindata) {
    return logindata;
  }
}
