/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-query';
import { Container, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import HeaderMegaMenu from '../../common/Header/Header';
import { getTeam } from '../../../services/api/team';
import { getTeamStatsByTeam } from '../../../services/api/teamStats';
import { findAllPlayersByTeam } from '../../../services/api/player';
import TableScrollArea from '../../common/Table/Table';

export default function TeamView() {
  const { id } = useParams();
  const teamData = useQuery(['team', id], () => getTeam(id));
  const teamStatsData = useQuery(['teamStats', id], () => getTeamStatsByTeam(id));
  const teamPlayersData = useQuery(['teamPlayers', id], () => findAllPlayersByTeam(id));

  return (
    <>
      <HeaderMegaMenu />
      {(teamData.status === 'loading' || teamStatsData.status === 'loading' || teamPlayersData.status === 'loading') && <div>Loading...</div>}
      {(teamData.status === 'error' || teamStatsData.status === 'error' || teamPlayersData.status === 'error') && (
      <div>
        {`Error: ${teamData.error}`}
      </div>
      )}
      <Container>
        {teamData.data && teamData.data.id && (
          <Title>{`${teamData.data.name} - ${teamData.data.location}`}</Title>
        )}
        {teamStatsData.data && teamStatsData.data._embedded ? (
          <div>
            <Text size="xl">Stats</Text>
            <TableScrollArea
              data={teamStatsData.data._embedded.teamStatsList}
              resourceType={teamStatsData.data._links.self.href.split('/').slice(-1)}
              hasView={false}
            />
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>Stats not available</div>
        )}

        {teamPlayersData.data && teamPlayersData.data._embedded ? (
          <div>
            <Text size="xl">Players</Text>
            <TableScrollArea
              data={teamPlayersData.data._embedded.playerList}
              resourceType={teamPlayersData.data._links.self.href.split('/').slice(-1)}
              hasView
            />
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>Players not available</div>
        )}
      </Container>
    </>
  );
}
