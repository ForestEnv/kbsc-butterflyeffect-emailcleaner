import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import {
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './src/contexts/UserContext';
import { ConnectionContextProvider } from './src/contexts/ConnectionContext';
import { EmailAddressContextProvider } from './src/contexts/EmailAddressContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import RootStack from './src/stacks/RootStack';

const queryClient = new QueryClient();

function App() {
    return (
      <GestureHandlerRootView style={{flex:1}}>
        <UserContextProvider>
          <ConnectionContextProvider>
            <EmailAddressContextProvider>
              <QueryClientProvider client={queryClient}>
                  <NavigationContainer>
                    <BottomSheetModalProvider>
                      <RootStack/>
                    </BottomSheetModalProvider>
                  </NavigationContainer>
              </QueryClientProvider>
            </EmailAddressContextProvider>
          </ConnectionContextProvider>
        </UserContextProvider>
      </GestureHandlerRootView>
    );
};

export default App;