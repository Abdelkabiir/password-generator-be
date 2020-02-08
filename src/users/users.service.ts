import { Injectable } from '@nestjs/common';
import { Users } from 'src/models/users';
import { User } from 'src/models/user';

@Injectable()
export class UsersService {
  private readonly users: Users = {
    1: {
      id: 1,
      userName: 'Abdel',
      dateOfBirth: new Date(),
    },
    2: {
      id: 2,
      userName: 'Abdelkabir',
      dateOfBirth: new Date(),
    },
    3: {
      id: 3,
      userName: 'Abdelkabir Watil',
      dateOfBirth: new Date(),
    },
  };

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
