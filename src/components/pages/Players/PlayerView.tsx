/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-query';
import { Container, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import HeaderMegaMenu from '../../common/Header/Header';
import { getPlayer } from '../../../services/api/player';
import TableScrollArea from '../../common/Table/Table';
import { getPlayerStatsByPlayerId } from '../../../services/api/playerStats';

export default function PlayerView() {
  const { id } = useParams();
  const playerData = useQuery(['player', id], () => getPlayer(id));
  const playerStatsData = useQuery(['playerStats', id], () => getPlayerStatsByPlayerId(id));

  return (
    <>
      <HeaderMegaMenu />
      {(playerData.status === 'loading' || playerStatsData.status === 'loading') && <div>Loading...</div>}
      {(playerData.status === 'error' || playerStatsData.status === 'error') && (
      <div>
        {`Error: ${playerData.error}`}
      </div>
      )}
      <Container>
        {playerData.data && playerData.data.id && (
          <div>
            <Title>{`${playerData.data.name} - ${playerData.data.team.name}`}</Title>
            <Text>{`Position: ${playerData.data.position}`}</Text>
            <Text>{`Age: ${playerData.data.age}`}</Text>
            <Text>{`Status: ${playerData.data.status}`}</Text>
          </div>
        )}
        {playerStatsData.data && playerStatsData.data._embedded ? (
          <div>
            <Text size="xl">Stats</Text>
            <TableScrollArea
              data={playerStatsData.data._embedded.playerStatsList}
              resourceType={playerStatsData.data._links.self.href.split('/').slice(-1)}
              hasView={false}
            />
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>Stats not available</div>
        )}
      </Container>
    </>
  );
}
