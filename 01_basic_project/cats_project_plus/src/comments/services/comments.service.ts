import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}
  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();

      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComments(id: string, comments: CommentsCreateDto) {
    try {
      const targetCat =
        await this.catsRepository.findCatByIdwithoutPassword(id); // 다른 서비스에서 만든 함수를 재사용

      const { author, contents } = comments;

      const validatorAuthor =
        await this.catsRepository.findCatByIdwithoutPassword(author);

      const newComment = new this.commentsModel({
        author: validatorAuthor._id,
        contents,
        info: targetCat._id,
      });

      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const likeCount = await this.commentsModel.findById(id);

      likeCount.likeCount += 1;
      return await likeCount.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
