import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './interfaces/user.interface';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModal: Model<UserDocument>) {}

    getUserDetails(user: UserDocument): UserDetails {
        const {
            id,
            name,
            email,
        } = user;

        return {
            id,
            name,
            email,
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModal.findOne({ email }).exec();
    }

    async findById(id: string): Promise<UserDetails | null> {
        const user = await this.userModal.findById(id).exec();

        if(!user) return null;
        return this.getUserDetails(user); 
    }

    async findAll(): Promise<UserDetails[]> {
        return this.userModal.find();
    }

    async create(name: string, email: string, hashedPassword: string): Promise<UserDocument> {
        const newUser = new this.userModal({
            name,
            email,
            password: hashedPassword,
        });

        return newUser.save();
    }
}
