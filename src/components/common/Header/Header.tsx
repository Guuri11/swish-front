import React from 'react';
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthenticationStore } from '../../../hooks/store';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const HeaderMegaMenu: React.FunctionComponent = observer((): JSX.Element => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const authenticationStore = useAuthenticationStore();

  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Text size="xl">Swish 🏀</Text>

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Link to="/games" className={classes.link}>
              Game
            </Link>
            <Link to="/teams" className={classes.link}>
              Teams
            </Link>
            <Link to="/players" className={classes.link}>
              Players
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            <Text>
              {`Hello ${authenticationStore.user?.name}`}
            </Text>
            <Button onClick={handleSignOut} variant="default">Sign out</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Link to="/games" className={classes.link}>
            Game
          </Link>
          <Link to="/teams" className={classes.link}>
            Teams
          </Link>
          <Link to="/players" className={classes.link}>
            Players
          </Link>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Text>
              {`Hello ${authenticationStore.user?.name}`}
            </Text>
            <Button onClick={handleSignOut} variant="default">Sign out</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
});

export default HeaderMegaMenu;
