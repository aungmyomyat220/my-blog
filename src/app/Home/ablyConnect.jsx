import React, { useEffect, useState } from 'react';
import Ably from 'ably';

const AblyComponent = () => {
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Replace 'YOUR_API_KEY' with your actual API key from Ably
        const realtime = new Ably.Realtime({ key: 'HAJ3rA.-aJ6Gg:4AP_fA8YNIEL7OoSmMn1ZKfAb937_pDM5_7dhrON4KI' });

        // Replace 'notification-channel' with your desired channel name
        const channel = realtime.channels.get('notification-channel');

        // Event listener for receiving messages
        const messageListener = (message) => {
            console.log('Received message:', message.data);
            setNotifications((prevNotifications) => [...prevNotifications, message.data]);
        };

        // Subscribe to the channel to receive messages
        channel.subscribe(messageListener);

        // Cleanup Ably instance and remove the event listener when the component is unmounted
        return () => {
            channel.unsubscribe(messageListener);
            realtime.close();
        };
    }, []);

    const handleSendMessage = () => {
        // Replace 'notification-channel' with your desired channel name
        const channel = realtime.channels.get('notification-channel');

        // Replace 'Your notification message' with the actual message you want to send
        const notificationMessage = 'Your notification message';

        // Publish the message to the channel
        channel.publish('notification', notificationMessage);
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
