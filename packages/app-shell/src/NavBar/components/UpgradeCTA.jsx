import React from 'react';
import styled from 'styled-components';

import { blue } from '@bufferapp/ui/style/colors';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';

import { UserContext } from '../../context/User';
import { ModalContext } from '../../context/Modal';
import { MODALS } from '../../hooks/useModal';

const Cta = styled.div`
  display: inline-flex;
  button {
    color: ${blue};
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
  }
`;

const UpgradeCTA = () => {
  return (
    <UserContext.Consumer>
      {({ currentOrganization }) => {
        if (currentOrganization.billing) {
          const { subscription, canStartTrial } = currentOrganization.billing;
          const isFree = subscription?.plan.id === 'free';

          return (
            <ModalContext.Consumer>
              {({ openModal }) => (
                <>
                  {isFree && (
                    <Cta>
                      <Button
                        type="text"
                        onClick={() => {
                          canStartTrial
                            ? openModal(MODALS.startTrial, {
                                cta: 'Start a 14-day free trial',
                              })
                            : openModal(MODALS.planSelector, { cta: 'Ugrade', isUpgradeIntent: true });
                        }}
                        icon={<FlashIcon />}
                        label={
                          canStartTrial
                            ? 'Start a 14-day free trial'
                            : 'Upgrade'
                        }
                      />
                    </Cta>
                  )}
                </>
              )}
            </ModalContext.Consumer>
          );
        }

        return null;
      }}
    </UserContext.Consumer>
  );
};

export default UpgradeCTA;
