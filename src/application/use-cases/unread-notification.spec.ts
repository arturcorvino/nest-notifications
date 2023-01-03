import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRespository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import UnreadNotification from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const unreadNotitication = new UnreadNotification(notificationRespository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRespository.create(notification);

    await unreadNotitication.execute({
      notificationId: notification.id,
    });

    expect(notificationRespository.notifications[0].readAt).toBeNull();
  });

  it('should not to be able to unread a non existing notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const unreadNotitication = new UnreadNotification(notificationRespository);

    expect(() => {
      return unreadNotitication.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
