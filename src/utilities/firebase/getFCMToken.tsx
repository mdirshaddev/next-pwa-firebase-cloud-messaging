import { getToken } from 'firebase/messaging';
import { messaging } from 'src/services/firebase';

export const getFCMToken = (
  setTokenFound: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
  })
    .then(currentToken => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};
