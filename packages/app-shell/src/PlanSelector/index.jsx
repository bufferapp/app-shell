import React from 'react';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import { PlanSelectorContainer } from './components/PlanSelectorContainer';

const PlanSelector = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {(modal) => (
            <PlanSelectorContainer
              planOptions={user.currentOrganization.billing.changePlanOptions}
              openPaymentMethod={() => {
                modal.openModal(MODALS.paymentMethod);
              }}
              hasPaymentDetails={
                user.currentOrganization.billing.paymentDetails
                  .hasPaymentDetails
              }
              isActiveTrial={user.currentOrganization.billing.subscription.trial.isActive}
            />
          )}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default PlanSelector;
