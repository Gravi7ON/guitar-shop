import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { SendOrderDto } from './dto/send-order.dto';
import { EmailSubscriberMessageException } from './email-subscriber.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const {email} = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new ConflictException (EmailSubscriberMessageException.EmailSubscriberExists);
    }

    this.mailService.sendNotifyNewSubscriber(subscriber);

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }

  public async sendCompletedOrder(order: SendOrderDto) {
    const {adminEmail} = order;
    const existsSubscriberAdmin = await this.emailSubscriberRepository.findByEmail(adminEmail);

    if (!existsSubscriberAdmin) {
      throw new NotFoundException(EmailSubscriberMessageException.AdminNotSubscriber);
    }

    this.mailService.sendNotifyNewOrder(order);
  }
}
