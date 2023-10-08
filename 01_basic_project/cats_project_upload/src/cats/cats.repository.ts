import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<any> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });

    return cat;
  }

  async findCatByIdwithoutPassword(catId: string) {
    // 보안상의 이유로 패스워드는 반환 시 제외
    const cat = await this.catModel.findById(catId).select('-password'); // '-'는 password를 뺀 값을 가져오는 문법, 없으면 모든 값 가져온다.
    return cat;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    console.log('cat.imgUrl', cat.imgUrl);

    const newCat = await cat.save();

    console.log('newCat', newCat);

    return newCat.readOnlyData;
  }
}
