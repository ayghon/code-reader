import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from '../types';

export async function getParsedStorageData<TData>(key: StorageKeys) {
  const storageData = await AsyncStorage.getItem(key);
  if (!storageData) {
    return;
  }

  try {
    return JSON.parse(storageData) as TData;
  } catch {
    return undefined;
  }
}
