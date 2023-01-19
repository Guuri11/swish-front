/* eslint-disable react/jsx-props-no-spreading */
import {
  Anchor, Button, Center, Checkbox, Container, Group,
  Paper, PaperProps, PasswordInput, Text, TextInput,
} from '@mantine/core';
import { upperFirst, useForm, useToggle } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '../../../hooks/store';
import Background from '../../common/Background/Background';
import { authenticate, register } from '../../../services/api/authenticate';
import { getSelf } from '../../../services/api/user';

export default function Authentication(props: PaperProps<'div'>) {
  const authenticationStore = useAuthenticationStore();
  const navigate = useNavigate();
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    if (authenticationStore.user) {
      navigate('/', { replace: true });
    }
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
      name: (val) => type === 'login' || val.length >= 1,
    },
  });

  const handleSubmit = () => {
    if (form.validate()) {
      let response;
      if (type === 'register') {
        response = register({ email: form.values.email, password: form.values.password, name: form.values.name });
      } else {
        response = authenticate({ email: form.values.email, password: form.values.password });
      }
      response.then((data) => {
        if (data.token) {
          authenticationStore.setToken(data.token);
          const userData = getSelf(authenticationStore.token);
          userData.then((user) => {
            authenticationStore.setUser(user);
            navigate('/', { replace: true });
          });
        } else {
          setError('Unhandle exception');
        }
      }).catch((exception) => {
        setError('Unhandle exception');
        console.log(exception);
      });
    }
  };

  return (
    <Background>
      <Center style={{ minHeight: '100vh' }}>
        <Container>
          <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" weight={500}>
              Welcome to Swish,
              {' '}
              {type}
              {' '}
              with
            </Text>
            { error && (
              <Text size="xs" color="red" style={{ maxWidth: 350 }}>
                {error}
              </Text>
            ) }
            <form onSubmit={form.onSubmit(() => { })}>
              <Group direction="column" grow>
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                  error={form.errors.email && 'Invalid email'}
                />
                {type === 'register' && (
                  <TextInput
                    required
                    label="Name"
                    placeholder="Lebron James"
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                    error={form.errors.name && 'Invalid name'}
                  />
                )}

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                  error={form.errors.password && 'Password should include at least 6 characters'}
                />

                {type === 'register' && (
                  <Checkbox
                    label="I accept terms and conditions"
                    checked={form.values.terms}
                    onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                  />
                )}
              </Group>

              <Group position="apart" mt="xl">
                <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
                  {type === 'register'
                    ? 'Already have an account? Login'
                    : "Don't have an account? Register"}
                </Anchor>
                <Button type="submit" onClick={handleSubmit}>{upperFirst(type)}</Button>
              </Group>
            </form>
          </Paper>
        </Container>
      </Center>
    </Background>
  );
}
