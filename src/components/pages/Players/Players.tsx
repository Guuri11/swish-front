/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-query';
import { Container } from '@mantine/core';
import HeaderMegaMenu from '../../common/Header/Header';
import TableScrollArea from '../../common/Table/Table';
import { findAllPlayers } from '../../../services/api/player';

export default function Players() {
  const { data, status, error } = useQuery('players', findAllPlayers);

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
          <TableScrollArea data={data._embedded.playerList} />
        ) : (
          <div>No results</div>
        )}
      </Container>
    </>
  );
}
