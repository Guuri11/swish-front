import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { HelmetProvider } from 'react-helmet-async';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import Error404 from './components/pages/Error404/Error404';
import AuthWrapper from './components/pages/Auth/AuthWrapper';
import Authentication from './components/pages/Authentication/Authentication';
import Home from './components/pages/Home/Home';

const queryClient = new QueryClient();

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  // eslint-disable-next-line max-len
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // TODO: this is for shortcuts
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{
              // Override any other properties from default theme
              fontFamily: 'Whitney,Helvetica Neue,Helvetica,Arial,sans-serif',
              spacing: {
                xs: 15, sm: 20, md: 25, lg: 30, xl: 40,
              },
              colorScheme,
              primaryColor: 'orange',
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Routes>
              <Route path="/" element={<AuthWrapper />}>
                <Route path="/sign-in" element={<Authentication />} />
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
          </MantineProvider>
        </ColorSchemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
