import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';
import CountRecipientNotification from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count a recipient notifications', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRespository,
    );

    await notificationRespository.create(
      makeNotification({ recipientId: '1' }),
    );

    await notificationRespository.create(
      makeNotification({ recipientId: '1' }),
    );

    await notificationRespository.create(
      makeNotification({ recipientId: '2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: '1',
    });

    expect(count).toEqual(2);
  });
});
