import React, { useEffect, useState } from 'react';
import Ably from 'ably';

const AblyComponent = () => {
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [realtime, setRealtime] = useState(null);

    useEffect(() => {
        const rt = new Ably.Realtime({ key: 'HAJ3rA.-aJ6Gg:4AP_fA8YNIEL7OoSmMn1ZKfAb937_pDM5_7dhrON4KI' });
        setRealtime(rt); // Store realtime instance in state
        const channel = rt.channels.get('notification-channel');
        const messageListener = (message) => {
            console.log('Received message:', message.data);
            setNotifications((prevNotifications) => [...prevNotifications, message.data]);
        };
        channel.subscribe(messageListener);
        return () => {
            channel.unsubscribe(messageListener);
            rt.close();
        };
    }, []);

    const handleSendMessage = () => {
        if (realtime) {
            const channel = realtime.channels.get('notification-channel');
            const notificationMessage = 'Your notification message';
            channel.publish('notification', notificationMessage);
        }
    };

    return (
      <div>
          <h1>Notification Messages</h1>
          <button onClick={handleSendMessage}>Send Notification</button>
          <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
              ))}
          </ul>
      </div>
    );
};

export default AblyComponent;
