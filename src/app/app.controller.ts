import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloDto } from './dto/hello.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 
   * @returns String that says hello
   */
  @TypedRoute.Post()
  getHello(
    @TypedBody() dto: HelloDto
  ): string {
    return this.appService.getHello(dto.text);
  }
}
