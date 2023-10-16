import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

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

  readonly cats_info: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments_list: Comments[];
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat); // Cat 클랙스를 schema로 만들어준다.

_CatSchema.virtual('cats_info').get(function (this: Cat) {
  // virtual를 사용 하여 반환값을 달리 해줄수 있음. (Virtual 모델)
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments_list: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id', // 댓글을 단 사람
  foreignField: 'info', // 외래필드 : comments의 info를 가져옴(댓글 달린 사람의 정보)
});

_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true }); // poopulate 사용 위함 => 두개의 document를 이어주기 위함.

export const CatSchema = _CatSchema;
