import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';
import GetRecipientNotification from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get a recipient notifications', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: '1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: '1' }),
        expect.objectContaining({ recipientId: '1' }),
      ]),
    );
  });
});
