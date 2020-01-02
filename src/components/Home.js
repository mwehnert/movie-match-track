import React from 'react';
import CallOutBanner from '@kiwicom/orbit-components/lib/CallOutBanner';
import List, { ListItem } from '@kiwicom/orbit-components/lib/List';
import Button from '@kiwicom/orbit-components/lib/Button';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import Check from '@kiwicom/orbit-components/lib/icons/Check';
import { useAuth0 } from '../auth/auth0-wrapper';

function Home() {
  const { loginWithRedirect } = useAuth0();
  return (
    <CallOutBanner
      title="Track your Movies you like with friends"
      description="See what others like, list and watch!"
      onClick={() => {}}
      illustration={<img src="/mmt.png" />}
      actions={
        <Stack inline>
          <Button
            onClick={() => {
              return loginWithRedirect({});
            }}
          >
            Sign Up / Login
          </Button>
        </Stack>
      }
    >
      <List type="secondary">
        <ListItem icon={<Check />}>Start personal and shared lists.</ListItem>
        <ListItem icon={<Check />}>Add films you watched or want to watch.</ListItem>
        <ListItem icon={<Check />}>Track which films you and your list members have watched already.</ListItem>
      </List>
    </CallOutBanner>
  );
}

export default Home;
