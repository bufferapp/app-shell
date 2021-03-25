import React, { useContext, useEffect } from 'react';

import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';

import StripeProvider from './components/StripeProvider';
import Form from './components/Form';
import { useTrackPageViewed } from '../hooks/useSegmentTracking';

const PaymentMethod = () => {
  const currentUser = useContext(UserContext);
  const { data } = useContext(ModalContext);
  useEffect(() => {
    const cta = data && data.cta ? data.cta : null;
    useTrackPageViewed({
      payload: {
        name: 'Payment method',
        title: 'Plan selector',
        cta,
        ctaButton: cta,
        ctaView: data && data.ctaView ? data.ctaView : null,
      },
      user: currentUser,
    });
  }, []);

  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal, data, modal }) => {
            return (
              <StripeProvider>
                <Form
                  openPlans={() => {
                    openModal(MODALS.planSelector);
                  }}
                  openSuccess={(newData) => {
                    openModal(MODALS.success, {
                      ...newData,
                      cta: 'Confirm Payment',
                      ctaView: modal,
                    });
                  }}
                  user={user}
                  plan={data ? data.plan : null}
                  isTrial={
                    user.currentOrganization.billing.subscription.trial
                      ?.isActive
                  }
                />
              </StripeProvider>
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default PaymentMethod;
