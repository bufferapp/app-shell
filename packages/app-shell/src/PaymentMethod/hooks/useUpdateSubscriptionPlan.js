import { useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_SUBSCRIPTION_PLAN } from '../../graphql/billing'
import { QUERY_ACCOUNT } from '../../graphql/account'

function useUpdateSubscriptionPlan({ user, plan, hasPaymentMethod }) {
  const [updateSubscriptionPlan, { data, error }] = useMutation(
    UPDATE_SUBSCRIPTION_PLAN,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
    }
  )

  useEffect(() => {
    if (!user || !plan || !hasPaymentMethod) {
      return;
    }

    updateSubscriptionPlan({
      variables: {
        organizationId: user.currentOrganization.id,
        plan: plan.planId,
        interval: plan.planInterval,
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [hasPaymentMethod])

  return {
    data,
    error
  }
}

export default useUpdateSubscriptionPlan

