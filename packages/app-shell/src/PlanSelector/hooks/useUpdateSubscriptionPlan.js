import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SUBSCRIPTION_PLAN } from '../../graphql/billing';
import { QUERY_ACCOUNT } from '../../graphql/account'

const useUpdateSubscriptionPlan = ({ user, selectedPlan }) => {
  const [processing, setProcessing] = useState(false);
  const [updateSubscriptionPlan, { data, error }] = useMutation(
    UPDATE_SUBSCRIPTION_PLAN,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
    }
  );

  useEffect(() => {
    if (!user || !selectedPlan) {
      return;
    }
    if (processing) {
      updateSubscriptionPlan({
        variables: {
          organizationId: user.currentOrganization.id,
          plan: selectedPlan.planId,
          interval: selectedPlan.planInterval,
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  }, [processing]);

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
