import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';
import CancelNotification from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationRespository);

    const notification = makeNotification();

    await notificationRespository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRespository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to cancel a non existing notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationRespository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
