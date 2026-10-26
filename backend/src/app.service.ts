import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): { status: string; message: string } {
    return {
      status: 'ok',
      message: 'NeevCloud practice API is running',
    };
  }
}
