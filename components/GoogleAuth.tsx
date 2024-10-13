import React, { useEffect } from 'react';
import { Button } from 'react-native';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';


const GoogleAuth = () => {
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '241434459418-aqs03kol1p860js0oo5314oj87kqfdpj.apps.googleusercontent.com',
      // androidClientId: '241434459418-2p39oo9fs490uhrim6408p5ka277g70c.apps.googleusercontent.com',
      iosClientId: '241434459418-05q688tth3s98pfo80i0cg28l1b865v2.apps.googleusercontent.com'
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  })

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Button
      title="Sign in with Google"
      onPress={signIn}
    />
  );
};

export default GoogleAuth;
