import gql from 'graphql-tag'

export const CREATE_SETUP_INTENT = gql`
  mutation billingCreateSetupIntent(
    $organizationId: String
  ) {
    billingCreateSetupIntent(
      organizationId: $organizationId
    )
  }
`;

export const UPDATE_PAYMENT_METHOD = gql`
  mutation updatePaymentMethod(
    $organizationId: String,
    $paymentMethodId: String
  ) {
    billingUpdateCustomerPaymentMethod(
      organizationId:$organizationId,
      paymentMethodId:$paymentMethodId
    )
  }
`;

export const UPDATE_SUBSCRIPTION_PLAN = gql`
  mutation updatePlan(
    $organizationId: String,
    $plan: OBPlanId,
    $interval: BillingInterval
  ) {
    billingUpdateSubscriptionPlan(
      organizationId:$organizationId,
      plan:$plan,
      interval:$interval
    )
  }
`;

export const START_TRIAL = gql`
  mutation startTrial(
    $organizationId:String,
    $plan:OBPlanId,
    $interval:BillingInterval
  ) {
    billingStartTrial(
      organizationId:$organizationId, 
      plan:$plan, 
      interval:$interval
    )
  }
`
