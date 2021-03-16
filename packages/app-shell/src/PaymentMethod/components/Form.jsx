import React, { useEffect, useState } from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import LockIcon from '@bufferapp/ui/Icon/Icons/Locked';
import {
  DoubleFields,
  Footer,
  Form as StyledForm,
  LeftSide,
  RightSide,
  Error,
  ButtonContainer
} from '../style'
import Field from './Field'
import Summary from '../../Summary'

import useSetupIntent from '../hooks/useSetupIntent';
import useCreatePaymentMethod from '../hooks/useCreatePaymentMethod';
import useUpdateUserPaymentMethod from '../hooks/useUpdateUserPaymentMethod';
import useUpdateSubscriptionPlan from '../hooks/useUpdateSubscriptionPlan';

const Form = ({
  user,
  openPlans,
  openSuccess,
  plan,
}) => {
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);

  const { setupIntent } = useSetupIntent(user)
  const {
    error,
    paymentMethod,
    processing,
    submit,
  } = useCreatePaymentMethod(setupIntent)

  const { data:userPaymentMethod } = useUpdateUserPaymentMethod({
    user,
    paymentMethod,
  })

  const { data:newPlan } = useUpdateSubscriptionPlan({
    user,
    paymentMethod,
    plan,
    hasPaymentMethod,
  })

  useEffect(() => {
    if (paymentMethod) {
      if (!plan) {
        openSuccess({onlyUpdatedCardDetails: true})
      } else {
        setHasPaymentMethod(true)
      }
    }
  }, [userPaymentMethod])

  useEffect(() => {
    if (newPlan) {
      openSuccess({selectedPlan: plan})
    }
  }, [newPlan])

  return (<StyledForm>
    <LeftSide>
      <Text type='h2'>Billing Details</Text>
      <Error error={error && error.type !== 'validation_error' ? error : null} /><br/>
      <Field label="Credit card number" enableSubmit={() => { setSubmitEnabled(true) }} />
      <DoubleFields>
        <Field label="Expiration date" />
        <Field label="CVC" />
      </DoubleFields>
      <Footer>
        <Button
          type="text"
          onClick={openPlans}
          label="Go back to plans"
          icon={<ArrowLeftIcon />}
        />
        <Text type="p">
          <LockIcon size="medium" /> Payments are securely provided by Stripe
        </Text>
      </Footer>
    </LeftSide>
    <RightSide>
      {plan && <Summary selectedPlan={plan}/>}
      <ButtonContainer>
        <Button type="primary" onClick={submit} disabled={!submitEnabled || processing} label={processing ? "Processing..." : plan ? "Confirm Payment" : 'Update Payment Details'} fullWidth />
      </ButtonContainer>
    </RightSide>
  </StyledForm>)
}

export default Form
