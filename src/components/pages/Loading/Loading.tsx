import {
  Center, Container, Group, Loader, Title,
} from '@mantine/core';
import React from 'react';
import Background from '../../common/Background/Background';

export default function Loading() {
  return (
    <Background>
      <Center style={{ minHeight: '100vh' }}>
        <Container>
          <Group>
            <Title style={{ color: 'white' }} order={1}>
              Loading
            </Title>
            <Loader color="white" variant="bars" />
          </Group>
        </Container>
      </Center>
    </Background>
  );
}
