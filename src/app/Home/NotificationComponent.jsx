import React, { useState, useEffect } from 'react';
import Ably from 'ably';

const AblyComponent = () => {
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [realtime, setRealtime] = useState(null);  // Declare realtime at a higher scope

    useEffect(() => {
        // Replace 'YOUR_API_KEY' with your actual API key from Ably
        const rt = new Ably.Realtime({ key: 'HAJ3rA.-aJ6Gg:4AP_fA8YNIEL7OoSmMn1ZKfAb937_pDM5_7dhrON4KI' });
        setRealtime(rt);

        // Replace 'notification-channel' with your desired channel name
        const channel = rt.channels.get('notification-channel');

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
            rt.close();
        };
    }, []);  // Dependency array to run the effect only once

    const handleSendMessage = () => {
        if (!realtime) {
            console.error('Ably Realtime instance is not available.');
            return;
        }

        // Replace 'notification-channel' with your desired channel name
        const channel = realtime.channels.get('notification-channel');

        // Publish the message to the channel
        channel.publish('notification', notificationMessage);

        // Clear the input box after sending the message
        setNotificationMessage('');
    };

    return (
        <div>
            <h1>Notification Messages</h1>
            <input
                type="text"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                placeholder="Enter your notification"
            />
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
