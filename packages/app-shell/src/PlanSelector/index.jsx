import React from 'react';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import { PlanSelectorContainer } from './components/PlanSelectorContainer';
import Loader from '@bufferapp/ui/Loader';
import { LoadingContainer } from './style';

const PlanSelector = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {(modal) => {
            if (!user.currentOrganization.billing) {
              return (
                <LoadingContainer>
                  <Loader />
                </LoadingContainer>
              );
            }
            return (
              <PlanSelectorContainer
                changePlanOptions={
                  user.currentOrganization.billing.changePlanOptions
                }
                user={user}
                openPaymentMethod={(data) => {
                  modal.openModal(MODALS.paymentMethod, data);
                }}
                hasPaymentDetails={
                  user.currentOrganization.billing.paymentDetails
                    .hasPaymentDetails
                }
                trialInfo={user.currentOrganization.billing.subscription?.trial}
                isFreePlan={
                  user.currentOrganization.billing.subscription.plan?.id ===
                  'free'
                }
                openSuccess={(newData) => {
                  modal.openModal(MODALS.success, newData);
                }}
                isUpgradeIntent={modal.data.isUpgradeIntent}
              />
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default PlanSelector;
