/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import Banner from './Banner';

import {
  AppShellStyled,
  Wrapper,
  SidebarWrapper,
  ContentWrapper,
} from './style';

const ENGAGE_SIGNUP_URL = 'https://login.buffer.com/signup?product=engage';

const getProductURL = product => `https://${product}.buffer.com`;

const getProductList = enabledProducts => [
  {
    id: 'publish',
    label: 'Publishing',
    isNew: false,
    href: getProductURL('publish')
  },
  {
    id: 'analyze',
    label: 'Analytics',
    isNew: false,
    href: getProductURL('analyze')
  },
  {
    id: 'engage',
    label: 'Engagement',
    isNew: true,
    href: enabledProducts.includes('engage') ? getProductURL('engage') : ENGAGE_SIGNUP_URL
  }
];

/**
 * The AppShell component is a general purpose wrapper for all of our applications. At the moment it's primarily a wrapper for the `NavBar` component. Check out the example below to see how to integrate it into your app.
 */
const AppShell = ({
  featureFlips,
  enabledProducts,
  activeProduct,
  user,
  helpMenuItems,
  sidebar,
  content,
  bannerOptions,
  onLogout,
  displaySkipLink,
  orgSwitcher,
  isImpersonation,
}) => (
  <AppShellStyled>
    {/* <GlobalStyles /> */}
    <NavBar
      products={getProductList(enabledProducts)}
      activeProduct={activeProduct}
      user={user}
      helpMenuItems={helpMenuItems}
      onLogout={onLogout}
      displaySkipLink={displaySkipLink}
      orgSwitcher={orgSwitcher}
      isImpersonation={isImpersonation}
    />
    {bannerOptions && <Banner {...bannerOptions} />}
    <Wrapper>
      {sidebar && <SidebarWrapper>{sidebar}</SidebarWrapper>}
      <ContentWrapper>{content}</ContentWrapper>
    </Wrapper>
  </AppShellStyled>
);

AppShell.propTypes = {
  /** The list of features enabled for the user */
  featureFlips: PropTypes.arrayOf(PropTypes.string),

  /** The list of products that the user has enabled on their account. */
  enabledProducts: PropTypes.arrayOf(PropTypes.string),

  /** The currently active (highlighted) product in the `NavBar`. */
  activeProduct: PropTypes.oneOf(['publish', 'analyze', 'engage']),

  /** The current user object */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    /** If missing we will use Gravatar to get the user avatar by email */
    avatar: PropTypes.string,
    /** If missing we will use Gravatar to get the user avatar by email */
    ignoreMenuItems: PropTypes.arrayOf(PropTypes.string),
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        component: PropTypes.func,
        hasDivider: PropTypes.bool,
        onItemClick: PropTypes.func,
      })
    ).isRequired,
  }).isRequired,

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
};

AppShell.defaultProps = {
  featureFlips: [],
  sidebar: null,
  enabledProducts: [],
  activeProduct: undefined,
  bannerOptions: null,
  onLogout: undefined,
  helpMenuItems: null,
  isImpersonation: false,
  displaySkipLink: false,
  orgSwitcher: undefined,
};

export default AppShell;
