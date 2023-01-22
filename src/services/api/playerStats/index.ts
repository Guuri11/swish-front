import { BACKEND_HOST, BACKEND_PORT } from '..';
import { Player } from '../../../types';

const path = `${BACKEND_HOST}${BACKEND_PORT}/api/v1/player_stats`;
export const findAllPlayerStats = async (): Promise<any> => fetch(`${path}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const getPlayerStats = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const getPlayerStatsByPlayerId = async (playerId: string): Promise<any> => fetch(`${path}/player/${playerId}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const getPlayerStatsByGameId = async (gameId: string): Promise<any> => fetch(`${path}/game/${gameId}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const deletePlayerStats = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const updatePlayerStats = async (player: Player): Promise<any> => fetch(`${path}/${player.id}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
}).then((response) => response.json());

export const createPlayerStats = async (player: Player): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
  body: JSON.stringify(player),
}).then((response) => response.json());
