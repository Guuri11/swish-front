/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-query';
import { Container } from '@mantine/core';
import HeaderMegaMenu from '../../common/Header/Header';
import { findAllTeams } from '../../../services/api/team';
import TableScrollArea from '../../common/Table/Table';

export default function Teams() {
  const { data, status, error } = useQuery('teams', findAllTeams);

  return (
    <>
      <HeaderMegaMenu />
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && (
      <div>
        {`Error: ${error}`}
      </div>
      )}
      <Container>

        {data && data._embedded ? (
          <TableScrollArea data={data._embedded.teamList} resourceType={data._links.self.href.split('/').slice(-1)} hasView />
        ) : (
          <div>No results</div>
        )}
      </Container>
    </>
  );
}
