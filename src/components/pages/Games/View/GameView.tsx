/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-query';
import { Container, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import HeaderMegaMenu from '../../../common/Header/Header';
import TableScrollArea from '../../../common/Table/Table';
import { getPlayerStatsByGameId } from '../../../../services/api/playerStats';
import { getGame } from '../../../../services/api/game';
import { getTeamStatsByGame } from '../../../../services/api/teamStats';

export default function GameView() {
  const { id } = useParams();
  const gameData = useQuery(['game', id], () => getGame(id));
  const playerStatsData = useQuery(['playerStats', id], () => getPlayerStatsByGameId(id));
  const teamsStatsData = useQuery(['teamsStats', id], () => getTeamStatsByGame(id));

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
        {gameData.data && gameData.data.id && (
          <div>
            <Title>{`${gameData.data.away.name} (${gameData.data.awayScore}) - ${gameData.data.local.name} (${gameData.data.localScore})`}</Title>
          </div>
        )}
        {teamsStatsData.data && teamsStatsData.data._embedded ? (
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
        {playerStatsData.data && playerStatsData.data._embedded ? (
          <div>
            <Text size="xl">Player Stats</Text>
            <TableScrollArea
              data={playerStatsData.data._embedded.playerStatsList}
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
