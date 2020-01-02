import React, {useState} from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { useAuth0 } from '../auth/auth0-wrapper';

import Stack from '@kiwicom/orbit-components/lib/Stack';
import Badge from '@kiwicom/orbit-components/lib/Badge';
import Plus from "@kiwicom/orbit-components/lib/icons/Plus";

import WatchSection from './WatchSection';
import { Card } from './Card';
import AddMember from './AddMember';

const MemberWrapper = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: inline-flex;
`;

const Member = styled.li`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 5px;
  border-radius: 100%;
  background-image: url("${props => {
    return props.user.avatar;
  }}");
  background-size: contain;
  &:hover, &:focus {
    opacity: ${props => props.me ? 0.5 : 1};
  }
`;


const MemberAddMember = styled(Member)`
  background: transparent;
  border: 2px solid grey;
  border-style: dashed;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover, &:focus {
    opacity: 0.5;
  }
`;

const MemberAdd = (props) => {

  return (
    <MemberAddMember {...props}>
      <Plus />
    </MemberAddMember>
  );
}

function List({ list, addMember, removeMember, userId }) {

  const { isAuthenticated, user } = useAuth0();
  const [addMemberVisible, setAddMemberVisible] = useState(false);

  const toggleAddMemberVisible = (e) => {
    e.preventDefault();
    setAddMemberVisible(!addMemberVisible);
  };

  return (
    <>
      <Card>
        <Link to={`/list/${list.id}`}>
          <Stack align="center">
            <h3>{list.name}</h3>
            <MemberWrapper>
              {[...list.list_members, {user: list.user}].map(({user}, index) => {
                return <Member key={index} user={user} />;
              })}
              {list.created_by === user.sub && <MemberAdd user={user} onClick={toggleAddMemberVisible} />}

            </MemberWrapper>
          </Stack>
        </Link>
      </Card>
      {addMemberVisible &&
        <AddMember onCloseHandler={toggleAddMemberVisible} addMember={addMember} currentUser={user.sub} />
      }
    </>
  );
}

export { List };
