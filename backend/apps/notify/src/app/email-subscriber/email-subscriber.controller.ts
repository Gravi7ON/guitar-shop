import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EventPattern } from '@nestjs/microservices';
import { CommandEvent } from '@backend/shared-types';
import { Controller } from '@nestjs/common';
import { SendOrderDto } from './dto/send-order.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
  ) {}

  @EventPattern({cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: CreateSubscriberDto) {
    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({cmd: CommandEvent.SuccessOrder})
  public async sendOrder(order: SendOrderDto) {
    return this.subscriberService.sendCompletedOrder(order);
  }
}
