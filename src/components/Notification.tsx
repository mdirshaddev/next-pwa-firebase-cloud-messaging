'use client';

import React from 'react';
import { getFCMToken } from 'src/utilities/firebase/getFCMToken';
import { onMessageListener } from 'src/utilities/firebase/onMessageListener';
import { Button, Alert } from '@mui/material';

const Notification: React.FC = (props): JSX.Element => {
  const [show, setShow] = React.useState(false);
  const [notification, setNotification] = React.useState({
    title: '',
    body: ''
  });
  const [isTokenFound, setTokenFound] = React.useState(false);
  getFCMToken(setTokenFound);

  onMessageListener()
    .then(payload => {
      setShow(true);
      setNotification({
        title: payload.notification?.title as string,
        body: payload.notification?.body as string
      });
      console.log(payload);
    })
    .catch(err => console.log('failed: ', err));
  return (
    <div>
      <Alert>
        <p>{notification.title}</p>
        <p>{notification.body}</p>
      </Alert>
      {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
      {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
      <Button onClick={() => setShow(true)}>Show Toast</Button>
    </div>
  );
};

export { Notification };
