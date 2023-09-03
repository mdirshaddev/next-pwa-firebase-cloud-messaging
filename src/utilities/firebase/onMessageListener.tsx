'use client';

import { MessagePayload, onMessage } from 'firebase/messaging';
import { messaging } from 'src/services/firebase';

export const onMessageListener = () =>
  new Promise((resolve: (value: MessagePayload) => void) => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
