import { useEffect , useState} from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_METHOD } from '../../graphql/billing';
import { QUERY_ACCOUNT } from '../../graphql/account';

function useUpdateUserPaymentMethod({ user, paymentMethod }) {
  const [updatePaymentMethod, { data, error: mutationError }] = useMutation(
    UPDATE_PAYMENT_METHOD,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
    }
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (paymentMethod && user) {
      updatePaymentMethod({
        variables: {
          organizationId: user.currentOrganization.id,
          paymentMethodId: paymentMethod.id,
        },
      }).catch((e) => {
        console.error(e);
      });
    }
  }, [paymentMethod]);

  useEffect(() => {
    if (mutationError) {
      setError(mutationError);
    } else if (data?.billingUpdateCustomerPaymentMethod.userFriendlyMessage) {
      setError({
        message: data.billingUpdateCustomerPaymentMethod.userFriendlyMessage,
      });
    }
  }, [mutationError, data]);

  return {
    userPaymentMethod:
      data && data?.billingUpdateCustomerPaymentMethod.success
        ? data.billingUpdateCustomerPaymentMethod.success
        : null,
    error,
  };
}

export default useUpdateUserPaymentMethod;
