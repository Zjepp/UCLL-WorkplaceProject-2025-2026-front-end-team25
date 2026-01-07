import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Cross-platform storage utility
 * Uses localStorage for web and AsyncStorage for native
 */
class Storage {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      // Use localStorage for web
      window.localStorage.setItem(key, value);
    } else {
      // Use AsyncStorage for native
      await AsyncStorage.setItem(key, value);
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      // Use localStorage for web
      return window.localStorage.getItem(key);
    } else {
      // Use AsyncStorage for native
      return await AsyncStorage.getItem(key);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      // Use localStorage for web
      window.localStorage.removeItem(key);
    } else {
      // Use AsyncStorage for native
      await AsyncStorage.removeItem(key);
    }
  }
}

export default new Storage();
