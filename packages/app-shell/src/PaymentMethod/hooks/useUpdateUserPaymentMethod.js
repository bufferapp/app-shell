import { useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_METHOD } from '../../graphql/billing';
import { QUERY_ACCOUNT } from '../../graphql/account'

function useUpdateUserPaymentMethod({ user, paymentMethod }) {
  const [updatePaymentMethod, { data, error }] = useMutation(
    UPDATE_PAYMENT_METHOD,
    {
      refetchQueries: [{ query: QUERY_ACCOUNT }],
    }
  );

  useEffect(() => {
    if (paymentMethod && user) {
      updatePaymentMethod({
        variables: {
          organizationId: user.currentOrganization.id,
          paymentMethodId: paymentMethod.id,
        }
      }).catch((e) => {
        console.error(e)
      })
    }
  }, [paymentMethod])

  return {
    data,
    error,
  }
}

export default useUpdateUserPaymentMethod
