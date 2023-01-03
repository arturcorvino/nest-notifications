import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import ReadNotification from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const readNotitication = new ReadNotification(notificationRespository);

    const notification = makeNotification();

    await notificationRespository.create(notification);

    await readNotitication.execute({
      notificationId: notification.id,
    });

    expect(notificationRespository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to read a non existing notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const readNotitication = new ReadNotification(notificationRespository);

    expect(() => {
      return readNotitication.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
