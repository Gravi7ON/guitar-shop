import { Document } from 'mongoose';
import { Subscriber } from '@backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Pick<Subscriber, 'email'|'name'> {
  @Prop()
  public email: string;

  @Prop()
  public name: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
