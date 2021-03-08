import React from 'react';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';

const PlanSelector = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {(modal) => (
            <PlanSelector
              planOptions={user}
              openPaymentMethod={() => {
                modal.openModal(MODALS.paymentMethod);
              }}
            />
          )}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default PlanSelector;
