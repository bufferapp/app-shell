import React from 'react';
import AppShell, { useOrgSwitcher, useUser, ModalContext, MODALS } from '@bufferapp/app-shell';

const AnotherComponentRenderingUserData = () => {
  const user = useUser();
  const switchOrganization = useOrgSwitcher()

  return (
    <>
      <h2>You are {user.email} with id {user.id} and you have the following feature flips</h2>
      <ul>
        {user.featureFlips.map(flip => <li key={flip}>{flip}</li>)}
      </ul>
      {user.currentOrganization &&
        <h3>You also have selected the organization named {user.currentOrganization.name}</h3>
      }
      {user.organizations.map(organization => <button key={organization.id} onClick={() => switchOrganization(organization.id)}>Select organization {organization.name}</button>)}
    </>
  );
}

const ModalTesting = () => (<ModalContext.Consumer>
    {modal => (
      <>
        <h2>Render Modal</h2>
        <button onClick={() => {modal.openModal(MODALS.planSelector, { cta: 'Render Modal', isUpgradeIntent: false })}}>Render Modal</button>
      </>
    )}
</ModalContext.Consumer>)

const App = () => (
  <div className="App">
    <AppShell
      activeProduct={"publish"}
      onOrganizationSelected={console.info}
      content={
        <>
          <AnotherComponentRenderingUserData/>
          <ModalTesting/>
        </>
      }
    >
    </AppShell>
  </div>
);

export default App;
