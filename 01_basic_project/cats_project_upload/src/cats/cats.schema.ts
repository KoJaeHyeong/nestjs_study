import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  // mongoose의 document를 상속한다.

  @ApiProperty({
    // swagger_request_example
    example: 'kojae2423@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty() // class-validator를 이용하여 필수값 및 유효성 검사
  email: string;

  @ApiProperty({
    example: 'jaehyeong',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default: 'http://www.applebeebook.co.kr/shop/UPLOAD/B1797.jpg',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat); // Cat 클랙스를 schema로 만들어준다.

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  // virtual를 사용 하여 반환값을 달리 해줄수 있음. (Viryal 모델)
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
