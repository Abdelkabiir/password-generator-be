import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from 'src/models/users';
import { User } from 'src/models/user';

/*
* this controller will most liklely be ignored
*/

@Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<Users> {
      return this.usersService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<User> {
      return this.usersService.find(id);
    }

    @Post()
    create(@Body('user') user: User) {
      this.usersService.create(user);
    }

    @Put()
    update(@Body('user') user: User) {
      this.usersService.update(user);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
      this.usersService.delete(id);
    }
  }
