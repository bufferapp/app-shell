import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SUBSCRIPTION_PLAN } from '../graphql/billing';
import { QUERY_ACCOUNT } from '../graphql/account';

const useUpdateSubscriptionPlan = ({
  user,
  plan,
  hasPaymentMethod,
  alreadyProcessing,
}) => {
  const [processing, setProcessing] = useState(alreadyProcessing);
  const [error, setError] = useState(null);

  const [updateSubscriptionPlan, { data, error: mutationError }] = useMutation(
    UPDATE_SUBSCRIPTION_PLAN,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
    }
  );

  useEffect(() => {
    if (!user || !plan || !hasPaymentMethod) {
      return;
    }
    if (processing || alreadyProcessing) {
      updateSubscriptionPlan({
        variables: {
          organizationId: user.currentOrganization.id,
          plan: plan.planId,
          interval: plan.planInterval,
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  }, [processing, hasPaymentMethod]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError);
    } else if (data?.billingUpdateSubscriptionPlan.userFriendlyMessage) {
      setError({
        message: data.billingUpdateSubscriptionPlan.userFriendlyMessage,
      });
      setProcessing(false);
    }
  }, [mutationError, data]);

  return {
    updateSubscriptionPlan: () => {
      setProcessing(true);
    },
    data,
    error,
    processing,
  };
};

export default useUpdateSubscriptionPlan;
