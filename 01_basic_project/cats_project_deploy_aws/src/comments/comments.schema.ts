import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  // mongoose의 document를 상속한다.

  @ApiProperty({
    description: '고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // monogodb id type
    required: true,
    ref: 'cats', // 다른 schema name
  })
  @IsNotEmpty() // class-validator를 이용하여 필수값 및 유효성 검사
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
    required: true,
  })
  @Prop({
    default: 0, // 초기값 세팅
  })
  @IsPositive() // 음수는 안됨
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    description: '작성 대상',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // monogodb id type
    required: true,
    ref: 'cats', // 다른 schema name
  })
  @IsNotEmpty() // class-validator를 이용하여 필수값 및 유효성 검사
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments); // Cat 클랙스를 schema로 만들어준다.
