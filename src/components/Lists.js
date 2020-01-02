import React, { useState } from 'react';
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Button from '@kiwicom/orbit-components/lib/Button';
import styled from 'styled-components';
import { List } from './List.js';
import ListData from './ListData.js';
import useLists from '../hooks/useLists';
import AddList from './AddList';
import { Card } from './Card';

const ListTitle = styled.h1`
  color: goldenrod;
  margin-top: 0;
  flex-grow: 1;
`;

function Lists(props) {
  const [loading, error, data, addList] = useLists();
  const [addListModalVisible, setAddListModalVisible] = useState(false);

  const toggleListModalVisible = e => {
    e.preventDefault();
    setAddListModalVisible(!addListModalVisible);
  };

  if (loading) return 'Loading...';
  if (error) return `Lists Error! ${error.message}`;

  return (
    <>
      <Stack flex>
        <ListTitle>Your Lists</ListTitle>
        <Button onClick={toggleListModalVisible}>New List</Button>
      </Stack>
      <Grid
        columns={null}
        rows="repeat(8, auto)"
        gap={null}
        columnGap="10px"
        rowGap="10px"
        element="div"
        mediumMobile={{ columns: 'repeat(100px, 1fr)' }}
        largeMobile={{ columns: 'repeat(100px, 1fr)' }}
        tablet={{ columns: 'repeat(2, minmax(100px, 1fr))' }}
        desktop={{ columns: 'repeat(3, minmax(100px, 1fr))' }}
      >
        {data.list.map((list, index) => {
          return <ListData renderer={List} id={list.id} key={index} />;
        })}
      </Grid>
      {addListModalVisible && <AddList addHandler={addList} onCloseHandler={toggleListModalVisible} />}
    </>
  );
}

export default Lists;
