import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  // mongoose의 documnet를 상속한다.
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty() // class-validator를 이용하여 필수값 및 유효성 검사
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat 클랙스를 schema로 만들어준다.
