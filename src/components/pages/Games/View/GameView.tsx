/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import HeaderMegaMenu from '../../../common/Header/Header';
import TableScrollArea from '../../../common/Table/Table';
import { getPlayerStatsByGameId } from '../../../../services/api/playerStats';
import { getGame } from '../../../../services/api/game';
import { getTeamStatsByGame } from '../../../../services/api/teamStats';
import {
  Game, Player, PlayerStats, TeamStats,
} from '../../../../types';
import { useAuthenticationStore } from '../../../../hooks/store';
import ScoreboardAdmin from './ScoreboardAdmin/ScoreboardAdmin';
import { findAllPlayersByTeam } from '../../../../services/api/player';

export default function GameView() {
  const { id } = useParams();
  const [game, setGame] = useState<Game>();
  const [playersStats, setPlayersStats] = useState<PlayerStats[]>();
  const [localTeamStats, setLocalTeamStats] = useState<TeamStats>();
  const [awayTeamStats, setAwayTeamStats] = useState<TeamStats>();
  const gameData = useQuery(['game', id], () => getGame(id));
  const playerStatsData = useQuery(['playerStats', id], () => getPlayerStatsByGameId(id));
  const teamsStatsData = useQuery(['teamsStats', id], () => getTeamStatsByGame(id));
  const authorizationStore = useAuthenticationStore();
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);
  const [stompClient, setStompClient] = useState<Client>(null);

  useEffect(() => {
    if (gameData.status === 'success') {
      setGame(gameData.data);
      findAllPlayersByTeam(gameData.data?.local.id).then((result) => {
        if (result?._embedded) {
          setLocalPlayers(result._embedded.playerList);
        }
      });
      findAllPlayersByTeam(gameData.data?.away.id).then((result) => {
        if (result?._embedded) {
          setAwayPlayers(result._embedded.playerList);
        }
      });
    }
  }, [gameData.status]);

  useEffect(() => {
    if (playerStatsData.status === 'success' && playerStatsData.data._embedded) {
      setPlayersStats(playerStatsData.data._embedded.playerStatsList);
    }
  }, [playerStatsData.status]);

  useEffect(() => {
    if (teamsStatsData.status === 'success' && teamsStatsData.data._embedded) {
      const localTeamStatsAux = teamsStatsData.data._embedded.teamStatsList[0];
      const awayTeamStatsAux = teamsStatsData.data._embedded.teamStatsList[1];

      setLocalTeamStats(localTeamStatsAux);
      setAwayTeamStats(awayTeamStatsAux);
    }
  }, [teamsStatsData.status]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = over(socket);
    setStompClient(client);

    client.connect({}, (frame) => {
      console.log(`Connected: ${frame}`);

      client.subscribe('/topic/game', (gameUpdate) => {
        setGame(JSON.parse(gameUpdate.body));
      });

      client.subscribe('/topic/playerStats', (playerStatsUpdate) => {
        setPlayersStats(JSON.parse(playerStatsUpdate.body).content);
      });

      client.subscribe('/topic/teamStats', (teamStatsUpdate) => {
        const teamsStatsAux: TeamStats = JSON.parse(teamStatsUpdate.body);
        if (teamsStatsAux.team.id === teamsStatsAux.game.local.id) {
          setLocalTeamStats(teamsStatsAux);
        } else {
          setAwayTeamStats(teamsStatsAux);
        }
      });
    });

    return () => {
      if (client.connected) {
        client.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, []);

  return (
    <>
      <HeaderMegaMenu />
      {(gameData.status === 'loading' || playerStatsData.status === 'loading' || teamsStatsData.status === 'loading') && <div>Loading...</div>}
      {(gameData.status === 'error' || playerStatsData.status === 'error' || teamsStatsData.status === 'error') && (
      <div>
        {`Error: ${gameData.error}`}
      </div>
      )}
      {authorizationStore.user?.role === 'ADMIN' && stompClient && game && localPlayers && awayPlayers && (
      <ScoreboardAdmin
        localPlayers={localPlayers}
        awayPlayers={awayPlayers}
        game={game}
        localTeamStats={localTeamStats}
        awayTeamStats={awayTeamStats}
        stompClient={stompClient}
        playersStats={playersStats}
      />
      )}
      {authorizationStore.user?.role !== 'ADMIN' && (
        <Container>
          {game && game.id && (
          <div>
            <Text size="xl" color="orange">{game.gameStatus.replace('_', ' ')}</Text>
            <Title>{`${game?.away.name} (${game?.awayScore}) - ${game?.local.name} (${game?.localScore})`}</Title>
          </div>
          )}
          {teamsStatsData.data?._embedded?.teamStatsList ? (
            <div>
              <Text size="xl">Team Stats</Text>
              <TableScrollArea
                data={teamsStatsData.data._embedded.teamStatsList}
                resourceType={teamsStatsData.data._links.self.href.split('/').slice(-1)}
                hasView
              />
            </div>
          ) : (
            <div style={{ marginBottom: 20 }}>Stats not available</div>
          )}
          {playersStats ? (
            <div>
              <Text size="xl">Player Stats</Text>
              <TableScrollArea
                data={playersStats}
                resourceType={playerStatsData.data._links.self.href.split('/').slice(-1)}
                hasView
              />
            </div>
          ) : (
            <div style={{ marginBottom: 20 }}>Stats not available</div>
          )}
        </Container>
      )}
    </>
  );
}
