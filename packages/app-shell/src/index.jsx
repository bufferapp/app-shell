/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import NavBar from './NavBar';
import Banner from './Banner';

import { AppShellStyled, ContentWrapper, SidebarWrapper, Wrapper } from './style';
import { UserContext } from './User';
import { QUERY_ACCOUNT } from './graphql/account';

export const ENABLE_ENGAGE_URL = 'https://login.buffer.com/signup?product=engage';

/**
 * The AppShell component is a general purpose wrapper for all of our applications. At the moment it's primarily a wrapper for the `NavBar` component. Check out the example below to see how to integrate it into your app.
 */
const AppShell = ({
  activeProduct,
  helpMenuItems,
  sidebar,
  content,
  bannerOptions,
  onLogout,
  displaySkipLink,
  onOrganizationSelected,
  menuItems,
  ignoreMenuItems,
  apolloClient,
}) => {
  const graphqlConfig = apolloClient ? {
    client: apolloClient
  } : {}
  const { data, loading } = useQuery(QUERY_ACCOUNT, graphqlConfig)

  const user = loading ? {
    name: '...',
    email: '...',
    products: [],
    featureFlips: [],
    organizations: [],
    currentOrganization: {},
    isImpersonation: false,
  } : {
    name: '',
    ...data.account,
  };

  return (
    <AppShellStyled>
      <UserContext.Provider value={user}>
        <NavBar
          activeProduct={activeProduct}
          helpMenuItems={helpMenuItems}
          menuItems={menuItems}
          ignoreMenuItems={ignoreMenuItems}
          onLogout={onLogout}
          displaySkipLink={displaySkipLink}
          onOrganizationSelected={onOrganizationSelected}
          graphqlConfig={graphqlConfig}
        />
        {bannerOptions && <Banner {...bannerOptions} />}
        <Wrapper>
          {sidebar && <SidebarWrapper>{sidebar}</SidebarWrapper>}
          <ContentWrapper>{content}</ContentWrapper>
        </Wrapper>
      </UserContext.Provider>
    </AppShellStyled>
  );
};

AppShell.propTypes = {
  /** The list of features enabled for the user */
  featureFlips: PropTypes.arrayOf(PropTypes.string),

  /** The currently active (highlighted) product in the `NavBar`. */
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'engage']),

  /** Menu items to show in the help menu */
  helpMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node,
      hasDivider: PropTypes.bool,
      onItemClick: PropTypes.func,
    })
  ),

  /** (Optional) Your sidebar component. */
  sidebar: PropTypes.node,

  /** Your content component. */
  content: PropTypes.node.isRequired,

  /** (Optional) Content of banner displayed below the navbar */
  bannerOptions: PropTypes.shape({
    text: PropTypes.string,
    actionButton: PropTypes.shape({
      label: PropTypes.string,
      action: PropTypes.func,
    }),
    customHTML: PropTypes.shape({ __html: PropTypes.string }),
  }),

  /** (Optional) Callback to be called before logout */
  onLogout: PropTypes.func,

  /** (Optional) Is the current session an impersonation session */
  isImpersonation: PropTypes.bool,

  displaySkipLink: PropTypes.bool,

  /** Optional menu for selecting the user's organization */
  orgSwitcher: PropTypes.shape({
    title: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        onItemClick: PropTypes.func,
      })
    ).isRequired,
  }),
  onOrganizationSelected: PropTypes.func,
  apolloClient: PropTypes.instanceOf('ApolloClient'),
};

AppShell.defaultProps = {
  featureFlips: [],
  sidebar: null,
  activeProduct: undefined,
  bannerOptions: null,
  onLogout: undefined,
  helpMenuItems: null,
  isImpersonation: false,
  displaySkipLink: false,
  orgSwitcher: undefined,
  onOrganizationSelected: () => {},
  apolloClient: undefined,
};

export default AppShell;

export { UserContext } from './User';
