import { BACKEND_HOST, BACKEND_PORT } from '..';
import { TeamStats } from '../../../types';

const path = `${BACKEND_HOST}${BACKEND_PORT}/api/v1/teams_stats`;
export const findAllTeamStats = async (): Promise<any> => fetch(`${path}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const getTeamStats = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const deleteTeamStats = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const updateTeamStats = async (teamStats: TeamStats): Promise<any> => fetch(`${path}/${teamStats}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const createTeamStats = async (teamStats: TeamStats): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(teamStats),
}).then((response) => response.json());
