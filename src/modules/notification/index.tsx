'use client';

import React from 'react';

const PWANotification: React.FC<React.PropsWithChildren> = (
  props
): JSX.Element => {
  const { children } = props;
  React.useEffect(() => {
    if (typeof window != 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('../firebase-messaging-sw.js', { scope: '' })
        .then(reg => {
          console.log('Registration successfully  on scope ', reg.scope);
        });
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

export { PWANotification };
