import React from 'react';
import styled from 'styled-components';

import { blue } from '@bufferapp/ui/style/colors';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import PeopleIcon from '@bufferapp/ui/Icon/Icons/People';

import { UserContext } from '../../context/User';
import { ModalContext } from '../../context/Modal';
import { MODALS } from '../../hooks/useModal';
import { isFreePlan } from '../../hooks/utils/segmentTraitGetters'

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
      {(user) => {
        const { currentOrganization } = user;
        const { isOneBufferOrganization } = currentOrganization;
        const isFree = isFreePlan(user);
        const [hostname, envModifier] = window.location.hostname.match(/\w+\.(\w+\.)buffer\.com/) || [null, null]


        if (currentOrganization.shouldDisplayInviteCTA) {
          return (
            <Cta>
              <Button
                type="text"
                onClick={() => {
                  window.location = `https://${envModifier ? envModifier : ''}buffer.com/manage/${currentOrganization.id}/team-members/invite`;
                }}
                icon={<PeopleIcon />}
                label="Invite Your Team"
              />
            </Cta>
          )
        }

        if (currentOrganization.billing) {
          const { canStartTrial } = currentOrganization.billing;
          return (
            <ModalContext.Consumer>
              {({ openModal }) => (
                <>
                  {isFree && (
                    <Cta>
                      <Button
                        type="text"
                        onClick={() => {
                          if (isOneBufferOrganization) {
                            if (canStartTrial) {
                             openModal(MODALS.startTrial, {
                                cta: 'startFreeTrial',
                                ctaButton: 'startFreeTrial',
                              })
                            } else {
                              openModal(MODALS.planSelector, {
                                cta: 'ugradePlan',
                                ctaButton: 'ugradePlan',
                                isUpgradeIntent: true,
                              });
                            }
                          } else {
                            window.location = `https://account.${envModifier ? envModifier : ''}buffer.com/billing`;
                          }
                        }}
                        icon={<FlashIcon />}
                        label={
                          (canStartTrial && isOneBufferOrganization)
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
