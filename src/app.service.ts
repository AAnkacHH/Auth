import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {

  getUsers1() {
    return [{ id: 1, name: 'plyskand' }];
  }
}
