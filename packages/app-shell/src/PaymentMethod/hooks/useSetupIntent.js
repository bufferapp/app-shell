import { useEffect, useState} from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SETUP_INTENT } from '../../graphql/billing';

function useSetupIntent(user) {
  const [createSetupIntent, { data, error: mutationError }] = useMutation(
    CREATE_SETUP_INTENT
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.currentOrganization && user.currentOrganization.id) {
      createSetupIntent({
        variables: {
          organizationId: user.currentOrganization.id,
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  }, [user]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError);
    } else if (data?.billingCreateSetupIntent.userFriendlyMessage) {
      setError({
        message: data.billingCreateSetupIntent.userFriendlyMessage,
      });
    }
  }, [mutationError, data]);

  return {
    setupIntent:
      data && data?.billingCreateSetupIntent.success
        ? data.billingCreateSetupIntent.clientSecret
        : null,
    error,
  };
}

export default useSetupIntent;
