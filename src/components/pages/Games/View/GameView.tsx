/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import HeaderMegaMenu from '../../../common/Header/Header';
import TableScrollArea from '../../../common/Table/Table';
import { getPlayerStatsByGameId } from '../../../../services/api/playerStats';
import { getGame } from '../../../../services/api/game';
import { getTeamStatsByGame } from '../../../../services/api/teamStats';
import { Game, PlayerStats, TeamStats } from '../../../../types';

export default function GameView() {
  const { id } = useParams();
  const [game, setGame] = useState<Game>();
  const [playersStats, setPlayersStats] = useState<PlayerStats[]>();
  const [teamStats, setTeamStats] = useState<TeamStats[]>();
  const gameData = useQuery(['game', id], () => getGame(id));
  const playerStatsData = useQuery(['playerStats', id], () => getPlayerStatsByGameId(id));
  const teamsStatsData = useQuery(['teamsStats', id], () => getTeamStatsByGame(id));

  useEffect(() => {
    if (gameData.status === 'success') {
      setGame(gameData.data);
    }
  }, [gameData.status]);

  useEffect(() => {
    if (playerStatsData.status === 'success' && playerStatsData.data._embedded) {
      setPlayersStats(playerStatsData.data._embedded.playerStatsList);
    }
  }, [playerStatsData.status]);

  useEffect(() => {
    if (teamsStatsData.status === 'success' && teamsStatsData.data._embedded) {
      setTeamStats(teamsStatsData.data._embedded.teamStatsList);
    }
  }, [teamsStatsData.status]);

  return (
    <>
      <HeaderMegaMenu />
      {(gameData.status === 'loading' || playerStatsData.status === 'loading' || teamsStatsData.status === 'loading') && <div>Loading...</div>}
      {(gameData.status === 'error' || playerStatsData.status === 'error' || teamsStatsData.status === 'error') && (
      <div>
        {`Error: ${gameData.error}`}
      </div>
      )}
      <Container>
        {game && game.id && (
          <div>
            <Title>{`${game.away.name} (${game.awayScore}) - ${game.local.name} (${game.localScore})`}</Title>
          </div>
        )}
        {teamStats ? (
          <div>
            <Text size="xl">Team Stats</Text>
            <TableScrollArea
              data={teamStats}
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
    </>
  );
}
