import { BACKEND_HOST, BACKEND_PORT } from '..';
import { User } from '../../../types';

const path = `${BACKEND_HOST}${BACKEND_PORT}/api/v1/users`;
export const findAllUsers = async (): Promise<any> => fetch(`${path}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const getUser = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const getSelf = async (token: string): Promise<User> => fetch(`${path}/me`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((response) => response.json());

export const deleteUser = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const updateUser = async (user: User): Promise<any> => fetch(`${path}/${user.id}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const createUser = async (user: User): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(user),
}).then((response) => response.json());
