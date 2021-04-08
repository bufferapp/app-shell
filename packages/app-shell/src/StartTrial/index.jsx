import React, { useEffect, useState } from 'react';

import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Error } from '../PaymentMethod/style';
import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import useStartTrial from '../hooks/useStartTrial';

import { Holder, Content, Ctas } from './style';

const StartTrial = ({ user, openModal }) => {
  const [suggestedPlan, setSuggestedPlan] = useState(null);
  useEffect(() => {
    if (user) {
      let plan = user.currentOrganization.billing.changePlanOptions.find(
        (p) => p.isRecommended
      );
      if (!plan) {
        plan = {
          planId: 'team',
          planInterval: 'month',
        };
      }
      setSuggestedPlan(plan);
    }
  }, [user]);

  const { startTrial, trial, error, processing } = useStartTrial({
    user,
    plan: suggestedPlan,
  });

  useEffect(() => {
    if (trial && trial.billingStartTrial.success) {
      openModal(MODALS.success, { startedTrial: true });
    }
  }, [trial]);

  return (
    <Holder>
      <Content>
        <Text type="h1">Want to try our trial?</Text>
        <Text type="p">
          Get the best we have to offer to see how it fits for you and your
          business.
        </Text>
        <ol>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Unlimited users</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Unlimited channels</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>No credit card required</Text>
          </li>
        </ol>
        <Ctas>
          <Button
            type="primary"
            disabled={!suggestedPlan || processing}
            onClick={() => {
              startTrial();
            }}
            label={
              processing ? 'Processing ...' : 'Start Free 14-day Free Trial'
            }
          />
          <Button
            type="secondary"
            onClick={() => {
              openModal(MODALS.planSelector, {
                cta: 'planSelection',
                ctaButton: 'checkOutPaidPlans',
              });
            }}
            label="Check Out Paid Plans"
          />
        </Ctas>
        <Error
          error={
            error
              ? {
                  message: error.message,
                }
              : null
          }
        />
      </Content>
    </Holder>
  );
};

const StartTrialProvider = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ModalContext.Consumer>
          {({ openModal }) => <StartTrial user={user} openModal={openModal} />}
        </ModalContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};

export default StartTrialProvider;
