import { Injectable } from '@nestjs/common';
import { Users } from 'src/models/users';
import { User } from 'src/models/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      userName: 'Abdel',
      password: '1234',
      dateOfBirth: new Date(),
    },
    {
      id: 2,
      userName: 'Abdelkabir',
      password: '5678',
      dateOfBirth: new Date(),
    },
    {
      id: 3,
      userName: 'Abdelkabir Watil',
      password: '9101',
      dateOfBirth: new Date(),
    },
  ];

  async findOne(username: string): Promise < User | undefined > {
    return this.users.find(user => user.userName === username);
  }

  findAll(): Users {
    return this.users;
  }

  create(newUser: User) {
    const id = new Date().valueOf();
    this.users[id] = {
      ...newUser,
      id,
    };
  }

  find(id: number): User {
    const user: User = this.users[id];

    if (user) {
      return user;
    }

    throw new Error('No user found');
  }

  update(updatedUser: User) {
    if (this.users[updatedUser.id]) {
      this.users[updatedUser.id] = updatedUser;
      return;
    }

    throw new Error('No user found to update');
  }

  delete(id: number) {
    const user: User = this.users[id];

    if (user) {
      delete this.users[id];
      return;
    }

    throw new Error('No user found to delete');
  }
}
