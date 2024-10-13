import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GYMRATS_TOKEN_STORAGE_KEY, GYMRATS_URL } from '@/constants/Storage';


export const loginGymratsApi = async (data: any) => {
  try {
    const response = await axios.post(`${GYMRATS_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await AsyncStorage.setItem(GYMRATS_TOKEN_STORAGE_KEY, response.data);


    return response.data;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
};