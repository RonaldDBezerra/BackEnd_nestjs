import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './entities/user.entity'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.UserModel(createUserDto)
    return user.save()
  }

  findAll() {
    return this.UserModel.find()
  }

  findOne(id: string) {
    return this.UserModel.findById(id)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateUserDto,
      },
      { new: true },
    )
  }

  remove(id: string) {
    return this.UserModel.deleteOne({
      _id: id,
    }).exec()
  }
}
