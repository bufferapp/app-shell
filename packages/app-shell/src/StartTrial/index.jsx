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
      let plan = user.currentOrganization?.billing?.changePlanOptions.find(
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
        <Text type="h1">Test run our paid features</Text>
        <Text type="p">
          Get faster results from your creative with our best publishing,
          analytics, and engagement tools built for growing businesses.
        </Text>
        <ol>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Advanced Instagram features</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Machine-learning driven insights</Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>
              Analytics for the best time to post and your audience demographics
            </Text>
          </li>
          <li>
            {' '}
            <CheckmarkIcon size="medium" />
            <Text>Easy, automatic reporting on growth and engagement</Text>
          </li>
        </ol>
        <Ctas>
          <Button
            type="secondary"
            onClick={() => {
              openModal(MODALS.planSelector, {
                cta: 'planSelection',
                ctaButton: 'checkOutPaidPlans',
              });
            }}
            label="I'm ready to upgrade"
          />
          <Button
            type="primary"
            disabled={!suggestedPlan || processing}
            onClick={() => {
              startTrial();
            }}
            label={processing ? 'Processing ...' : 'Start my 14-day Free Trial'}
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
