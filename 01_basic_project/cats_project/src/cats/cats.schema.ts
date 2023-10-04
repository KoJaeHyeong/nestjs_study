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

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat 클랙스를 schema로 만들어준다.

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  // virtual를 사용 하여 반환값을 달리 해줄수 있음. (Viryal 모델)
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
