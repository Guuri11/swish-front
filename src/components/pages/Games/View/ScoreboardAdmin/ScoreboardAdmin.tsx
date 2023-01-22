/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import {
  Container, Grid, Text, createStyles,
} from '@mantine/core';
import { Client } from 'stompjs';
import {
  Game, Player, PlayerStats, TeamStats,
} from '../../../../../types';

const useStyles = createStyles((theme) => ({
  localTeamPlayers: {
    backgroundColor: theme.colors.orange[4],
    borderRadius: 5,
    textAlign: 'center',
    padding: 30,
    marginBottom: 20,
    cursor: 'pointer',
  },
  awayTeamPlayers: {
    backgroundColor: theme.colors.blue[4],
    borderRadius: 5,
    textAlign: 'center',
    padding: 30,
    marginBottom: 20,
    cursor: 'pointer',
  },
  buttonAction: {
    backgroundColor: theme.colors.cyan,
    borderRadius: 5,
    textAlign: 'center',
    padding: 30,
    marginBottom: 20,
    cursor: 'pointer',
  },
}));

type Props = {
  localPlayers: Player[],
  awayPlayers: Player[],
  game: Game,
  localTeamStats: TeamStats,
  awayTeamStats: TeamStats,
  stompClient: Client,
  playersStats: PlayerStats[];
};

type Action = '2_PT' | '3_PT' | 'REBOUND' | 'ASSIST' | 'TIME_OUT' | 'FINISH' | 'IN_GAME';

export default function ScoreboardAdmin({
  localPlayers, awayPlayers, game, localTeamStats, awayTeamStats, stompClient, playersStats,
}: Props) {
  const { classes } = useStyles();
  const [action, setAction] = useState<Action>(null);
  const handleAction = (actionSelected: Action, buttonAction: Boolean, player?: PlayerStats, team?: TeamStats) => {
    const playerAux = player;

    const teamAux = team;
    const gameAux = game;

    if (buttonAction) {
      setAction(actionSelected);
      return;
    }

    if (action === '2_PT') {
      if (player) {
        teamAux.points += 2;
        stompClient.send('/app/updateTeamStats', {}, JSON.stringify(teamAux));
        playerAux.points += 2;
        stompClient.send('/app/updatePlayerStats', {}, JSON.stringify(playerAux));

        if (gameAux.away.id === teamAux.team.id) {
          gameAux.awayScore += 2;
        } else {
          gameAux.localScore += 2;
        }
        stompClient.send('/app/updateGame', {}, JSON.stringify(gameAux));
      }
    }

    if (action === '3_PT') {
      if (player) {
        teamAux.points += 3;
        stompClient.send('/app/updateTeamStats', {}, JSON.stringify(teamAux));
        playerAux.points += 3;
        stompClient.send('/app/updatePlayerStats', {}, JSON.stringify(playerAux));
        if (gameAux.away.id === teamAux.team.id) {
          gameAux.awayScore += 3;
        } else {
          gameAux.localScore += 3;
        }
        stompClient.send('/app/updateGame', {}, JSON.stringify(gameAux));
      }
    }

    if (action === 'REBOUND') {
      if (player) {
        teamAux.rebounds += 1;
        stompClient.send('/app/updateTeamStats', {}, JSON.stringify(teamAux));
        playerAux.rebounds += 1;
        stompClient.send('/app/updatePlayerStats', {}, JSON.stringify(playerAux));
      }
    }

    if (action === 'ASSIST') {
      if (player) {
        teamAux.assists += 1;
        stompClient.send('/app/updateTeamStats', {}, JSON.stringify(teamAux));
        playerAux.assists += 1;
        stompClient.send('/app/updatePlayerStats', {}, JSON.stringify(playerAux));
      }
    }

    if (actionSelected === 'TIME_OUT') {
      gameAux.gameStatus = 'TIMEOUT';
      stompClient.send('/app/updateGame', {}, JSON.stringify(gameAux));
    }

    if (actionSelected === 'IN_GAME') {
      gameAux.gameStatus = 'IN_GAME';
      stompClient.send('/app/updateGame', {}, JSON.stringify(gameAux));
    }

    if (actionSelected === 'FINISH') {
      gameAux.gameStatus = 'FINISHED';
      stompClient.send('/app/updateGame', {}, JSON.stringify(gameAux));
    }
  };

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col xs={12}>
          <Text align="center" size="xl" color="orange">{game.gameStatus.replace('_', ' ')}</Text>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Grid>
            <Grid.Col xs={6}>
              <div className={classes.localTeamPlayers}>
                <Text align="center" size="xl">Local Team</Text>
              </div>
              {localPlayers.map((player) => (
                <div key={player.id} className={classes.localTeamPlayers} onClick={() => { handleAction(action, false, playersStats?.find((ps) => ps.player.id === player.id), localTeamStats); }}>
                  <Text>{`# ${player.number} ${player.name} ${player.position}`}</Text>
                </div>
              ))}

            </Grid.Col>
            <Grid.Col xs={6}>
              <div className={classes.awayTeamPlayers}>
                <Text align="center" size="xl">Away Team</Text>
              </div>
              {awayPlayers.map((player) => (
                <div key={player.id} className={classes.awayTeamPlayers} onClick={() => { handleAction(action, false, playersStats?.find((ps) => ps.player.id === player.id), awayTeamStats); }}>
                  <Text>{`# ${player.number} ${player.name} ${player.position}`}</Text>
                </div>
              ))}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Grid>
            <Grid.Col xs={6}>
              <Text align="center" size="xl">{game.local.name}</Text>
              <Text align="center">{game.localScore}</Text>
            </Grid.Col>
            <Grid.Col xs={6}>
              <Text align="center" size="xl">{game.away.name}</Text>
              <Text align="center">{game.awayScore}</Text>
            </Grid.Col>
            <Grid>
              <Grid.Col xs={6}>
                <div className={classes.localTeamPlayers}>
                  <Text align="center">Local Team Stats</Text>
                </div>
                <div className={classes.localTeamPlayers}>
                  <Text align="center">Points</Text>
                  <Text>{localTeamStats?.points || 0}</Text>
                </div>
                <div className={classes.localTeamPlayers}>
                  <Text align="center">Rebounds</Text>
                  <Text>{localTeamStats?.rebounds || 0}</Text>
                </div>
                <div className={classes.localTeamPlayers}>
                  <Text align="center">Assists</Text>
                  <Text>{localTeamStats?.assists || 0}</Text>
                </div>
              </Grid.Col>
              <Grid.Col xs={6}>
                <div className={classes.awayTeamPlayers}>
                  <Text align="center">Away Team Stats</Text>
                </div>
                <div className={classes.awayTeamPlayers}>
                  <Text align="center">Points</Text>
                  <Text>{awayTeamStats?.points || 0}</Text>
                </div>
                <div className={classes.awayTeamPlayers}>
                  <Text align="center">Rebounds</Text>
                  <Text>{awayTeamStats?.rebounds || 0}</Text>
                </div>
                <div className={classes.awayTeamPlayers}>
                  <Text align="center">Assists</Text>
                  <Text>{awayTeamStats?.assists || 0}</Text>
                </div>
              </Grid.Col>
            </Grid>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={4}>
          <Grid>
            <Grid.Col xs={6}>
              <div className={classes.buttonAction} onClick={() => { handleAction('2_PT', true); }}>
                <Text align="center" size="xl">2 pts</Text>
              </div>
            </Grid.Col>
            <Grid.Col xs={6}>
              <div className={classes.buttonAction} onClick={() => { handleAction('3_PT', true); }}>
                <Text align="center" size="xl">3 pts</Text>
              </div>
            </Grid.Col>
            <Grid.Col xs={6}>
              <div className={classes.buttonAction} onClick={() => { handleAction('REBOUND', true); }}>
                <Text align="center" size="xl">Rebound</Text>
              </div>
            </Grid.Col>
            <Grid.Col xs={6}>
              <div className={classes.buttonAction} onClick={() => { handleAction('ASSIST', true); }}>
                <Text align="center" size="xl">Assist</Text>
              </div>
            </Grid.Col>
            <Grid.Col xs={6}>
              <div className={classes.buttonAction} onClick={() => { handleAction('TIME_OUT', false); }}>
                <Text align="center" size="xl">Time Out</Text>
              </div>
            </Grid.Col>
            <Grid.Col xs={6}>
              <div className={classes.buttonAction} onClick={() => { handleAction('IN_GAME', false); }}>
                <Text align="center" size="xl">IN GAME</Text>
              </div>
            </Grid.Col>
            <Grid.Col xs={6}>
              <div className={classes.buttonAction} onClick={() => { handleAction('FINISH', false); }}>
                <Text align="center" size="xl">Finish</Text>
              </div>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
