import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './src/contexts/UserContext';
import { EmailCountContextProvider } from './src/contexts/EmailCountContext';

import RootStack from './src/stacks/RootStack';

const queryClient = new QueryClient();

function App() {
    return (
      <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <RootStack/>
            </NavigationContainer>
          </QueryClientProvider>
      </UserContextProvider>
    )
}

export default App;