import { Body, Controller, Post, Res, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("session")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Res() res, @Body("session") loginData) {
    const loginOp = await this.authService.validateUser(
      loginData.username,
      loginData.password
    );
    if (loginOp) {
      return res.status(HttpStatus.CREATED).json({
        message: "session created",
        loginOp
      });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "error creating session",
        loginOp
      });
    }
  }
}
