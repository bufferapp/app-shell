import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';

import { QUERY_ACCOUNT } from '../../graphql/account';
import { UPDATE_SUBSCRIPTION_PLAN } from '../../graphql/billing';
import useUpdateSubscriptionPlan from './useUpdateSubscriptionPlan';

describe('useUpdateSubscriptionPlan', () => {
  const mockMutation = jest.fn(() => {
    return {
      data: {
        billingUpdateSubscriptionPlan: 'billingUpdateSubscriptionPlan',
      },
    };
  });

  const user = {
    currentOrganization: {
      id: '123FooOrganization',
    },
  };
  const selectedPlan = {
    planId: 'individual',
    planInterval: 'year',
  };
  const userWithError = {
    currentOrganization: {
      id: '123FooError',
    },
  };

  const mocks = [
    {
      request: {
        query: UPDATE_SUBSCRIPTION_PLAN,
        variables: {
          organizationId: user.currentOrganization.id,
          plan: selectedPlan.planId,
          interval: selectedPlan.planInterval,
        },
      },
      newData: mockMutation,
    },
    {
      request: {
        query: UPDATE_SUBSCRIPTION_PLAN,
        variables: {
          organizationId: userWithError.currentOrganization.id,
          plan: selectedPlan.planId,
          interval: selectedPlan.planInterval,
        },
      },
      error: new Error('The horror! The horror!'),
    },
    {
      request: {
        query: QUERY_ACCOUNT,
      },
      result: {
        data: {},
      },
    },
  ];

  function testHook(params) {
    const { result, waitForNextUpdate } = renderHook(
      () => useUpdateSubscriptionPlan(params),
      {
        wrapper: ({ children }) => (
          <MockedProvider mocks={mocks}>{children}</MockedProvider>
        ),
      }
    );

    return {
      result,
      waitForNextUpdate,
    };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not execute the mutation if missing user', async () => {
    const mocks = [];
    const { result } = testHook({
      selectedPlan,
      user: null,
    });
    await expect(mockMutation).not.toHaveBeenCalled();
  });

  it('does not execute the mutation if missing plan', async () => {
    const mocks = [];
    const { result } = testHook({
      user,
      selectedPlan: null,
    });
    await expect(mockMutation).not.toHaveBeenCalled();
  });

  it('run the mutation and return the setupIntent', async () => {
    const { result, waitForNextUpdate } = testHook({
      user,
      selectedPlan,
    });

    act(() => {
      result.current.updateSubscriptionPlan();
    });
    await expect(mockMutation).toHaveBeenCalled();
    await waitForNextUpdate();
    await expect(result.current.data).toEqual({
      billingUpdateSubscriptionPlan: 'billingUpdateSubscriptionPlan',
    });
  });

  it('run the mutation and return an error', async () => {
    const { result, waitForNextUpdate } = testHook({
      user: userWithError,
      selectedPlan,
    });
    act(() => {
      result.current.updateSubscriptionPlan();
    });
    await waitForNextUpdate();
    await expect(result.current.error).toEqual(mocks[1].error);
  });
});
