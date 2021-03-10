import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_SUBSCRIPTION_PLAN } from '../../graphql/billing';

const useUpdateSubscriptionPlan = ({ user, selectedPlan }) => {
  const [processing, setProcessing] = useState(false);
  const [updateSubscriptionPlan, { data, error }] = useMutation(
    UPDATE_SUBSCRIPTION_PLAN
  );

  useEffect(() => {
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
