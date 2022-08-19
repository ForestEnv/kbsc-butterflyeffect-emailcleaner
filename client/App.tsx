import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './src/contexts/UserContext';
import { ConnectionContextProvider } from './src/contexts/ConnectionContext';

import RootStack from './src/stacks/RootStack';

const queryClient = new QueryClient();

function App() {
    return (
      <UserContextProvider>
        <ConnectionContextProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <RootStack/>
            </NavigationContainer>
          </QueryClientProvider>
        </ConnectionContextProvider>
      </UserContextProvider>
    )
}

export default App;