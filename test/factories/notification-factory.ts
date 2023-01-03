import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('nova solicitação de amizade'),
    category: 'social',
    recipientId: 'example-recipient-id-1',
    ...override,
  });
}
