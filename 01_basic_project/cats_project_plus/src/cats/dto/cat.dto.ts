import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// 반환해주는 값의 Dto를 만든다. type에 지정해주기 위해서
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  // PickType은 extends 상속 시 필요한 것만 가져와 사용!, OmitType은 빼고 사용하는 것.

  //id는 몽구스에서 자동으로 생성하기 때문에 따로 설정
  @ApiProperty({
    example: '1232323321231',
    description: 'id',
    required: true,
  })
  id: string;
}
