import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateUserDto,
  AuthUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './dto/UserDto';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  generateSaltAndHash(password: string) {
    try {
      const salt = randomBytes(8).toString('hex');
      const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString(
        'hex',
      );
      return `${salt}&${hash}`;
    } catch (e) {
      throw new BadRequestException('Error generating password hash');
    }
  }

  async createUser(userData: CreateUserDto) {
    try {
      userData.password = this.generateSaltAndHash(userData.password);

      return await this.prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          image: `https://avatar.vercel.sh/${userData.name.toLowerCase().replace(/\s+/g, '-')}`,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  async updatePassword(updatePasswordData: UpdateUserPasswordDto) {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: {
          email: updatePasswordData.email,
        },
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      updatePasswordData.password = this.generateSaltAndHash(
        updatePasswordData.password,
      );

      const user = await this.prisma.user.update({
        where: { email: updatePasswordData.email },
        data: {
          password: updatePasswordData.password,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Authentication failed');
    }
  }

  async updateUser(userData: UpdateUserDto) {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      const user = await this.prisma.user.update({
        where: { email: userData.email },
        data: {
          name: userData.name,
          email: userData.email,
          image: `https://avatar.vercel.sh/${userData.name.toLowerCase().replace(/\s+/g, '-')}`,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByField(field: string, value: string) {
    try {
      if (!field || !value) {
        throw new BadRequestException('Field and value are required');
      }

      if (field !== 'id' && field !== 'email') {
        throw new BadRequestException('Invalid field for user lookup');
      }

      const user = await this.prisma.user.findUnique({
        where: field === 'id' ? { id: value } : { email: value },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
