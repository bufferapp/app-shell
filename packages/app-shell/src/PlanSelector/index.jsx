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
                planOptions={user.currentOrganization.billing.changePlanOptions}
                user={user}
                openPaymentMethod={(data) => {
                  modal.openModal(MODALS.paymentMethod, data);
                }}
                hasPaymentDetails={
                  user.currentOrganization.billing.paymentDetails
                    .hasPaymentDetails
                }
                isActiveTrial={
                  user.currentOrganization.billing.subscription.trial.isActive
                }
                openSuccess={(newData) => {openModal(MODALS.success, newData)}}
              />
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default PlanSelector;
