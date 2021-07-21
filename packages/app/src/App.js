import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  overflow: auto;
  height: 100%;
`;

const Wrapper = styled.div`
  align-items: center;
  flex: 1;
  overflow: auto;
  padding: 36px;
`;

const ModalTesting = () => {
  return (
    <Wrapper>
      <h3>Render Plan Selector</h3>
      <button
        onClick={() => {
          const { MODALS, actions } = window?.appshell || {};
          actions.openModal(MODALS.startTrial, {
            cta: 'renderModal',
            ctaButton: 'renderModal',
            isUpgradeIntent: false,
          });
        }}
      >
        Render Modal
      </button>
      <h3>Paid Migration Flow</h3>
      <button
        onClick={() => {
          const { MODALS, actions } = window?.appshell || {};
          actions.openModal(MODALS.paidMigration, {
            cta: 'renderModal',
            ctaButton: 'renderModal',
            isUpgradeIntent: false,
          });
        }}
      >
        Render Modal
      </button>
    </Wrapper>
  );
};

const App = () => {
  function handleOrgSwitch(e) {
    console.log(e.detail);
  }

  useEffect(() => {
    const { ORGANIZATION_EVENT_KEY } = window.appshell?.eventKeys || {};

    window.addEventListener(ORGANIZATION_EVENT_KEY, handleOrgSwitch);

    return function cleanup() {
      window.removeEventListener(ORGANIZATION_EVENT_KEY, handleOrgSwitch);
    };
  }, []);

  return (
    <StyledApp>
      <ModalTesting />
    </StyledApp>
  );
};

export default App;
