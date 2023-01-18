import { BACKEND_HOST, BACKEND_PORT } from '..';
import { Team } from '../../../types';

const path = `${BACKEND_HOST}${BACKEND_PORT}/api/v1/teams_stats`;
export const findAllTeams = async (): Promise<any> => fetch(`${path}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const getTeam = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const deleteTeam = async (id: string): Promise<any> => fetch(`${path}/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const updateTeam = async (team: Team): Promise<any> => fetch(`${path}/${team.id}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
}).then((response) => response.json());

export const createTeam = async (team: Team): Promise<any> => fetch(path, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(team),
}).then((response) => response.json());
