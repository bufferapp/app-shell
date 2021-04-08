import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { renderHook } from '@testing-library/react-hooks'

import { CREATE_SETUP_INTENT } from '../../graphql/billing'
import useSetupIntent from './useSetupIntent'



describe('useSetupIntent', () => {
  const mockMutation = jest.fn(() => ({
    data: {
      billingCreateSetupIntent: {
        success: true,
        clientSecret: 'fooSetupIntent',
      },
    },
  }));
  const user = {
    currentOrganization: {
      id: '123FooOrganization',
    }
  }
  const userWithError = {
    currentOrganization: {
      id: '123FooError',
    }
  }

  const mocks = [
    {
      request: {
        query: CREATE_SETUP_INTENT,
        variables: {
          organizationId: user.currentOrganization.id,
        },
      },
      newData: mockMutation,
    },
    {
      request: {
        query: CREATE_SETUP_INTENT,
        variables: {
          organizationId: userWithError.currentOrganization.id,
        },
      },
      error: new Error('The horror! The horror!')
    }
  ]

  function testHook(argument) {
    const { result, waitForNextUpdate } = renderHook(
      () => useSetupIntent(argument),
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

  it('return null if missing user', async () => {
    const mocks = []
    const { result } = testHook(null)
    await expect(mockMutation).not.toHaveBeenCalled();
    expect(result.current.setupIntent).toBeNull()
  })

  it('run the mutation and return the setupIntent', async () => {
    const { result, waitForNextUpdate } = testHook(user)
    await expect(mockMutation).toHaveBeenCalled();
    await waitForNextUpdate();
    await expect(result.current.setupIntent).toEqual('fooSetupIntent');
  })

  it('run the mutation and return an error', async () => {
    const { result, waitForNextUpdate } = testHook(userWithError)
    await waitForNextUpdate();
    await expect(result.current.error).toEqual(mocks[1].error);
  })
})
