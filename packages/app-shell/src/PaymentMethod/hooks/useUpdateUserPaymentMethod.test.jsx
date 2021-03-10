import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { renderHook } from '@testing-library/react-hooks'

import { QUERY_ACCOUNT } from '../../graphql/account'
import { UPDATE_PAYMENT_METHOD } from '../../graphql/billing'
import useUpdateUserPaymentMethod from './useUpdateUserPaymentMethod'

describe('useUpdateUserPaymentMethod', () => {

  const mockMutation = jest.fn(() => ({
    data: {
      updatePaymentMethod: 'updatePaymentMethod',
    }
  }))

  const user = {
    currentOrganization: {
      id: '123FooOrganization',
    }
  }
  const paymentMethod = {
      id: '123FooPaymentMethod',
  }
  const userWithError = {
    currentOrganization: {
      id: '123FooError',
    }
  }

  const mocks = [
    {
      request: {
        query: UPDATE_PAYMENT_METHOD,
        variables: {
          organizationId: user.currentOrganization.id,
          paymentMethodId: paymentMethod.id,
        },
      },
      newData: mockMutation,
    },
    {
      request: {
        query: UPDATE_PAYMENT_METHOD,
        variables: {
          organizationId: userWithError.currentOrganization.id,
          paymentMethodId: paymentMethod.id,
        },
      },
      error: new Error('The horror! The horror!')
    },
    {
      request: {
        query: QUERY_ACCOUNT,
      },
      result: {
        data: {},
      },
    }
  ]

  function testHook(params) {
    const { result, waitForNextUpdate } = renderHook(
      () => useUpdateUserPaymentMethod(params),
      {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks} >
            {children}
          </MockedProvider>
        ),
      }
    )

    return {
      result,
      waitForNextUpdate,
    }
  }

  beforeEach(() => {
      jest.clearAllMocks()
  })

  it('does not execute the mutation if missing user', async () => {
    const mocks = []
    const { result } = testHook({
      paymentMethod: {},
      user: null,
    })
    await expect(mockMutation).not.toHaveBeenCalled();
  })

  it('does not execute the mutation if missing paymentMethod', async () => {
    const mocks = []
    const { result } = testHook({
      user,
      paymentMethod: null,
    })
    await expect(mockMutation).not.toHaveBeenCalled();
  })

  it('run the mutation and return the setupIntent', async () => {
    const { result, waitForNextUpdate } = testHook({
      user,
      paymentMethod,
    })
    await expect(mockMutation).toHaveBeenCalled();
    await waitForNextUpdate();
    await expect(result.current.data).toEqual({
      updatePaymentMethod: 'updatePaymentMethod',
    });
  })

  it('run the mutation and return an error', async () => {
    const { result, waitForNextUpdate } = testHook({
      user: userWithError,
      paymentMethod,
    })
    await waitForNextUpdate();
    await expect(result.current.error).toEqual(mocks[1].error);
  })
})
