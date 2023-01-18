import { BACKEND_HOST, BACKEND_PORT } from '..';
import { Game } from '../../../types';

const path = `${BACKEND_HOST}${BACKEND_PORT}/api/v1/games`;
export const findAllGames = async (): Promise<any> => fetch(`${path}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const getGame = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const deleteGame = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const updateGame = async (game: Game): Promise<any> => fetch(`${path}/${game}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const createGame = async (game: Game): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
  body: JSON.stringify(game),
}).then((response) => response.json());
