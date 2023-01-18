import { BACKEND_HOST, BACKEND_PORT } from '..';
import { Player } from '../../../types';

const path = `${BACKEND_HOST}${BACKEND_PORT}/api/v1/players_stats`;
export const findAllPlayers = async (): Promise<any> => fetch(`${path}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const getPlayer = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const deletePlayer = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const updatePlayer = async (player: Player): Promise<any> => fetch(`${path}/${player.id}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const createPlayer = async (player: Player): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
  body: JSON.stringify(player),
}).then((response) => response.json());
