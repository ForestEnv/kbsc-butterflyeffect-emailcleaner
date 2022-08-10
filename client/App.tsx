import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootStack from './src/stacks/RootStack';

const queryClient = new QueryClient();

function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack/>
        </NavigationContainer>
      </QueryClientProvider>
    )
}

export default App;