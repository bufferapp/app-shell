import React from 'react';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';

import StripeProvider from './components/StripeProvider'
import Form from './components/Form'

const PaymentMethod = () => {
  return (<UserContext.Consumer>
    {user => (<ModalContext.Consumer>
      {({ openModal, data }) => (<StripeProvider>
          <Form
            openPlans={() => {openModal(MODALS.planSelector)}}
            openSuccess={(newData) => {openModal(MODALS.success, newData)}}
            user={user}
            plan={data? data.plan : null}
            interval={data ? data.interval : null}
          />
        </StripeProvider>)
      }</ModalContext.Consumer>)
    }
  </UserContext.Consumer>)
}

export default PaymentMethod;
