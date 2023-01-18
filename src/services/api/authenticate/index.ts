import { BACKEND_HOST, BACKEND_PORT } from '..';

const path = `${BACKEND_HOST}${BACKEND_PORT}/api/v1/games`;

type RegisterParams = {
  name: string;
  password: string;
  email: string;
};

type AuthenticateParams = {
  email: string;
  password: string;
};

export const register = async (registerParams: RegisterParams): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(registerParams),
}).then((response) => response.json());

export const authenticate = async (authenticateParams: AuthenticateParams): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(authenticateParams),
}).then((response) => response.json());
