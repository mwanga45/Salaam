import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function asnycTest() {
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const testAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('testKey', 'Hello AsyncStorage!');
      const value = await AsyncStorage.getItem('testKey');
      setStoredValue(value);
      setStatus('Success!');
    } catch (e) {
      setStatus('Error!');
    }
  };

  return (
    <View>
      <Text>asnycTest</Text>
      <Button title="Test AsyncStorage" onPress={testAsyncStorage} />
      <Text>Stored Value: {storedValue}</Text>
      <Text>Status: {status}</Text>
    </View>
  )
}