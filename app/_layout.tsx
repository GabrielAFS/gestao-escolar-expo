import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useSchoolStore } from '../src/store/useSchoolStore';

export default function RootLayout() {
  const hydrate = useSchoolStore((state) => state.hydrate);
  useEffect(() => { void hydrate(); }, [hydrate]);
  return <GluestackUIProvider config={config}>
    <StatusBar style="dark" />
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F5F7F4' }, animation: 'slide_from_right' }} />
  </GluestackUIProvider>;
}