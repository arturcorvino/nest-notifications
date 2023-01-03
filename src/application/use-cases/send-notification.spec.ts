import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';
import SendNotification from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const sendNotification = new SendNotification(notificationRespository);

    const { notification } = await sendNotification.execute({
      content: 'this is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationRespository.notifications).toHaveLength(1);
    expect(notificationRespository.notifications[0]).toEqual(notification);
  });
});
