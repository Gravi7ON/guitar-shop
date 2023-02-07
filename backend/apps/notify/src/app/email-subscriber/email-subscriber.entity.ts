import { Entity } from '@backend/core';
import { Subscriber } from '@backend/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id?: string;
  public email: string;
  public name: string;
  public password: string;
  public loginLink: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Subscriber) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id ?? '';
    this.password = entity.password;
    this.loginLink = entity.loginLink
  }

  public toObject(): EmailSubscriberEntity {
    return {...this};
  }
}
