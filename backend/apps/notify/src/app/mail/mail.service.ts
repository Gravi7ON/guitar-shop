import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@backend/shared-types';
import { NotifySubject } from './mail.constant';
import { SendOrderDto } from '../email-subscriber/dto/send-order.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: NotifySubject.EmailAdd,
      template: './register-user',
      context: {
        password: subscriber.password,
        email: subscriber.email,
        loginLink: subscriber.loginLink
      }
    })
  }

  public async sendNotifyNewOrder(order: SendOrderDto) {
    await this.mailerService.sendMail({
      to: order.adminEmail,
      subject: NotifySubject.SuccessOrder,
      template: './completed-order',
      context: {
        products: order.products,
        totalSum: order.totalSum,
        totalProduct: order.totalProduct
      }
    })
  }
}
