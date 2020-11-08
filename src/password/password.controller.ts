import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { PasswordService } from "./password.service";

@Controller("password")
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}
  @Post()
  async generatePassword(@Res() res, @Body("options") options) {
    const password = await this.passwordService.generatePassword(options);
    return res.status(HttpStatus.OK).json({
      message: "password created",
      password
    });
  }
}
