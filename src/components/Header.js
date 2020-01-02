import React from 'react';
import styled from 'styled-components';
import NavigationBar from '@kiwicom/orbit-components/lib/NavigationBar';
import Tooltip from '@kiwicom/orbit-components/lib/Tooltip';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import NavigationList, { NavigationListItem } from '@kiwicom/orbit-components/lib/NavigationList';
import Button from '@kiwicom/orbit-components/lib/Button';
import Desktop from '@kiwicom/orbit-components/lib/Desktop';
import Mobile from '@kiwicom/orbit-components/lib/Mobile';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../auth/auth0-wrapper';

const SiteTitle = styled(Link)`
  font-size: 32px;
  color: goldenrod;
  font-family: 'Sigmar One', cursive;
  text-decoration: none;
  letter-spacing: -0.2;
  display: block;
  line-height: 0.8em;
  transform: rotate(-3deg);

  &:hover,
  &:focus,
  &:active,
  &:selected {
    color: goldenrod;
    text-decoration: none;
  }
`;

const SiteTitleDesktop = styled(SiteTitle)`
  transform: rotate(-3deg) translateY(20px);
`;

const Avatar = styled.img`
  border-radius: 100%;
`;

const Logout = styled.span`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 2px solid goldenrod;
  border-radius: 50px;
  border-style: dashed;
`;

export default function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
    <NavigationBar>
      <Stack flex grow justify="between" align="center">
        <Desktop>
          <SiteTitleDesktop to="/">
            Movie
            <br />
            Match
            <br />
            Track
          </SiteTitleDesktop>
        </Desktop>
        <Mobile>
          <SiteTitle to="/">MMT</SiteTitle>
        </Mobile>

        {!isAuthenticated && (
          <>
            <Button
              primary
              onClick={() => {
                return loginWithRedirect({});
              }}
            >
              Login
            </Button>
          </>
        )}
        {isAuthenticated && (
          <Tooltip preferredPosition="bottom" size="medium" content="Logout?">
            <Avatar
              onClick={() => {
                logout();
              }}
              height="50"
              width="50"
              src={user.picture}
            />
          </Tooltip>
        )}
      </Stack>
    </NavigationBar>
  );
}
