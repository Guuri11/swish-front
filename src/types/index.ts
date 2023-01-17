export type Role = 'USER' | 'ADMIN';

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export type Team = {
  name: string;
  location: string;
};

export type Game = {
  id: number;
  local: Team;
  away: Team;
  localScore: number;
  awayScore: number;
  sheduleDate: number;
};

export type TeamStats = {
  id: number;
  team: Team;
  game: Game;
  points: number;
  assists: number;
  rebounds: number;
};

type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

type PlayerStatus = 'HEALTHY' | 'DAY_TO_DAY' | 'OUT';

export type PlayerStats = {
  id: number;
  player: Player;
  game: Game;
  points: number;
  assists: number;
  rebounds: number;
};

export type Player = {
  id: number;
  name: string;
  position: Position;
  number: number;
  team: Team;
  age: number;
  status: PlayerStatus;
};
