import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Subscriber } from '@backend/shared-types';

type SubscriberDb = Pick<Subscriber, 'email'|'name'>;

@Injectable()
export class EmailSubscriberRepository {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<SubscriberDb> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async findById(id: string): Promise<SubscriberDb | null> {
    return this.emailSubscriberModel
        .findOne({ id })
        .exec();
  }

  public async findByEmail(email: string): Promise<SubscriberDb | null> {
    return this.emailSubscriberModel
      .findOne({ email })
      .exec()
  }

  public async findSubscribers(): Promise<SubscriberDb[] | null> {
    return this.emailSubscriberModel
      .find({})
      .exec()
  }
}
