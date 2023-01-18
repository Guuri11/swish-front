import React, { useState } from 'react';
import { createStyles, Table, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  tr: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colors.orange,
      color: '#fff',
    },
  },
}));

interface TableScrollAreaProps {
  data: any[];
}

export default function TableScrollArea({ data }: TableScrollAreaProps) {
  console.log(data);

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr className={classes.tr} key={row.id}>
      {
        Object.keys(row).map((key) => {
          if (key === '_links') {
            return null;
          }

          if (typeof row[key] === 'object') {
            return <td key={key}>{row[key].name}</td>;
          }

          return <td key={key}>{row[key]}</td>;
        })
      }
    </tr>
  ));

  return (
    <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((column) => {
              if (column === '_links') {
                return null;
              }
              return (<th key={column}>{column === 'id' ? '#' : column.toUpperCase()}</th>);
            })}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
