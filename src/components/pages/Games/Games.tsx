/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from 'react-query';
import { Container } from '@mantine/core';
import HeaderMegaMenu from '../../common/Header/Header';
import TableScrollArea from '../../common/Table/Table';
import { findAllGames } from '../../../services/api/game';

export default function Games() {
  const { data, status, error } = useQuery('games', findAllGames);

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
          <TableScrollArea data={data._embedded.gameList} />
        ) : (
          <div>No results</div>
        )}
      </Container>
    </>
  );
}
