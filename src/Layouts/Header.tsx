import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Select from '@paljs/ui/Select';
import { LayoutHeader } from '@paljs/ui/Layout';
import { EvaIcon } from '@paljs/ui/Icon';
import { breakpointDown } from '@paljs/ui/breakpoints';
import { Actions } from '@paljs/ui/Actions';
import { useLocation } from '@reach/router';

const SidebarIcon = styled(Actions)`
  display: none;
  div {
    height: auto;
  }
  ${breakpointDown('md')`
    display: flex;
  `}
`;

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .logo {
    margin-left: 0;
    display: flex;
    align-items: center;
    height: 35px;
    img {
      margin-right: 10px;
      height: 100%;
    }
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      color: white;
      font-size: 18px;
      margin-right: 5px;
    }
  }
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
`;
interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
}

const SelectStyled = styled(Select)`
  min-width: 150px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;
const Header: React.FC<HeaderProps> = (props) => {
  const location = useLocation();
  const themeOptions = [
    {
      value: 'default',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
          Default
        </Label>
      ),
    },
    {
      value: 'dark',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#192038' }} />
          Dark
        </Label>
      ),
    },
    {
      value: 'cosmic',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#5a37b8' }} />
          Cosmic
        </Label>
      ),
    },
    {
      value: 'corporate',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#3366ff' }} />
          Corporate
        </Label>
      ),
      selected: true,
    },
  ];
  const repoName = location.pathname.startsWith('/ui') ? 'ui' : 'prisma-tools';
  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <div className="left">
          <SidebarIcon
            size="Medium"
            actions={[
              {
                icon: 'menu-2-outline',
                url: {
                  onClick: props.toggleSidebar,
                },
              },
            ]}
          />
          <Actions
            size="Medium"
            actions={[
              {
                content: (
                  <div className="logo">
                    <img src="/icons/icon-48x48.png" /> Pal.js
                  </div>
                ),
              },
              {
                content: (
                  <SelectStyled
                    isSearchable={false}
                    shape="SemiRound"
                    placeholder="Themes"
                    value={themeOptions.find((item) => item.value === props.theme.value)}
                    options={themeOptions}
                    onChange={({ value }: { value: DefaultTheme['name'] }) => props.theme.set(value)}
                  />
                ),
              },
            ]}
          />
        </div>
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              content: (
                <a className="left" href={`https://github.com/paljs/${repoName}`} target="_blank" rel="noreferrer">
                  <span className="github">Support us in GitHub</span>
                  <img src={`https://badgen.net/github/stars/paljs/${repoName}`} />
                </a>
              ),
            },
            {
              content: (
                <a href="https://discord.gg/NRmdvDxsT8" target="_blank" rel="noreferrer">
                  <img height="20" src="/discord.svg" alt="slack" />
                </a>
              ),
            },
            {
              icon: 'twitter',
              url: { href: 'https://twitter.com/pal4js', target: '_blank' },
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};

export default Header;
