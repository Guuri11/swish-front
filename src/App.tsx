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
import Teams from './components/pages/Teams/Teams';
import Players from './components/pages/Players/Players';
import Games from './components/pages/Games/Games';
import TeamView from './components/pages/Teams/TeamView';
import PlayerView from './components/pages/Players/PlayerView';
import GameView from './components/pages/Games/View/GameView';

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
                <Route path="/" element={<Games />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/teams/:id" element={<TeamView />} />
                <Route path="/players" element={<Players />} />
                <Route path="/players/:id" element={<PlayerView />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:id" element={<GameView />} />
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
