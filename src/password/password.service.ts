import { Injectable } from "@nestjs/common";
import Utils from "src/utils/utils";
import { Options } from "src/models/options";

@Injectable()
export class PasswordService {
  async generatePassword(options: Options) {
    const pass = await Utils.generatePassword(options);
    return pass;
  }
}
