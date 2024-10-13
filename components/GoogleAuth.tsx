import React, { useEffect, useState, useCallback } from 'react';
import { Button, View, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginGymratsApi } from '@/services/GymratsApi';

const USER_STORAGE_KEY = '@user';

const GoogleAuth = () => {
  const [userInfo, setUserInfo] = useState(null);

  const configureGoogleSignIn = useCallback(() => {
    GoogleSignin.configure({
      webClientId: 'xxxxx',
      iosClientId: 'yyyyy'
    });
  }, []);

  const loadUserInfo = useCallback(async () => {
    try {
      const userJSON = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userJSON) {
        setUserInfo(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  }, []);

  useEffect(() => {
    configureGoogleSignIn();
    loadUserInfo();
  }, [configureGoogleSignIn, loadUserInfo]);

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const data = await GoogleSignin.signIn();
      if (data) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
        setUserInfo(data);
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handleGymratsLogin = async () => {
    try {
      loginGymratsApi(userInfo)
    } catch (error) {
      console.error('Error during Gymrats login:', error);
    }
  };

  return (
    <View>
      <Button
        title="Sign in with Google"
        onPress={handleSignIn}
        disabled={userInfo !== null}
      />
      <Button
        title="Sign out"
        onPress={handleSignOut}
        disabled={userInfo === null}
      />
      <Button
        title="Test Gymrats API login"
        onPress={handleGymratsLogin}
        disabled={userInfo === null}
      />
      <Text>{userInfo ? JSON.stringify(userInfo) : 'No user info available'}</Text>
      </View>
  );
};

export default GoogleAuth;