import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';

import { Error } from '../PaymentMethod/style'
import { MODALS } from '../hooks/useModal';
import { UserContext } from '../context/User';
import { ModalContext } from '../context/Modal';
import { START_TRIAL } from '../graphql/billing';
import { QUERY_ACCOUNT } from '../graphql/account'

import {
  Holder,
  Content,
  Ctas,
} from './style'

const StartTrial = ({ user, openModal}) => {
  const [suggestedPlan, setSuggestedPlan] = useState(null)
  const [processing, setProcessing] = useState(false)
  useEffect(() => {
    if (user) {
      let plan = user.currentOrganization.billing.changePlanOptions.find(p => p.isRecommended)
      if (!plan) {
        plan = {
          planId: 'team',
          planInterval: "month",
        }
      }
      setSuggestedPlan(plan)
    }
  }, [user])

  const [startTrial, { data:trial, error }] = useMutation(
    START_TRIAL,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
    }
  );

  useEffect(() => {
    if (trial) {
      openModal(MODALS.success, { startedTrial: true })
    }
  }, [trial])

  return(<Holder>
    <Content>
      <Text type="h1">Want to try our trial?</Text>
      <Text type="p">Get the best we have to offer to see how it fits for you and your business.</Text>
      <ol>
        <li> <CheckmarkIcon size="medium" /><Text>Unlimited users</Text></li>
        <li> <CheckmarkIcon size="medium" /><Text>Unlimited channels</Text></li>
        <li> <CheckmarkIcon size="medium" /><Text>No credit card required</Text></li>
      </ol>
      <Ctas>
        <Button
          type="primary"
          disabled={!suggestedPlan || processing}
          onClick={() => {
            setProcessing(true)
            startTrial({
              variables: {
                organizationId: user.currentOrganization.id,
                plan: suggestedPlan.planId,
                interval: suggestedPlan.planInterval,
              },
            }).catch((e) => {
              setProcessing(false)
              console.error(e)
            });
          }}
          label={processing ? "Processing ..." : "Start Free 14-day Trial"}
        />
        <Button
          type="secondary"
          onClick={() => {openModal(MODALS.planSelector)}}
          label="Check Out Paid Plans"
        />
      </Ctas>
      <Error error={error ? { message: "We can't start your trial, please contact support." } : null} />
    </Content>
  </Holder>)
}

const StartTrialProvider = () => {
  return (<UserContext.Consumer>
    {user => (<ModalContext.Consumer>{
      ({ openModal }) => (
        <StartTrial user={user} openModal={openModal} />
      )}</ModalContext.Consumer>)}
  </UserContext.Consumer>)
}

export default StartTrialProvider
