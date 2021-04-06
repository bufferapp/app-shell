import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';

import { QUERY_ACCOUNT } from '../graphql/account';
import { UPDATE_SUBSCRIPTION_PLAN } from '../graphql/billing';
import useUpdateSubscriptionPlan from './useUpdateSubscriptionPlan';

describe('useUpdateSubscriptionPlan', () => {
  const mockSuccessMutation = jest.fn(() => {
    return {
      data: {
        billingUpdateSubscriptionPlan: {
          success: true,
        },
      },
    };
  });

  const mockErrorMutation = jest.fn(() => {
    return {
      data: {
        billingUpdateSubscriptionPlan: {
          userFriendlyMessage: 'Whoops',
        },
      },
    };
  });

  const user = {
    currentOrganization: {
      id: '123FooOrganization',
    },
  };
  const plan = {
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
          plan: plan.planId,
          interval: plan.planInterval,
        },
      },
      newData: mockSuccessMutation,
    },
    {
      request: {
        query: UPDATE_SUBSCRIPTION_PLAN,
        variables: {
          organizationId: userWithError.currentOrganization.id,
          plan: plan.planId,
          interval: plan.planInterval,
        },
      },
      newData: mockErrorMutation,
      error: new Error('Whoops'),
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
      plan,
      user: null,
    });
    await expect(mockSuccessMutation).not.toHaveBeenCalled();
  });

  it('does not execute the mutation if missing plan', async () => {
    const mocks = [];
    const { result } = testHook({
      user,
      plan: null,
    });
    await expect(mockSuccessMutation).not.toHaveBeenCalled();
  });

  it('run the mutation and return the setupIntent', async () => {
    const hasPaymentMethod = true;
    const alreadyProcessing = true;
    const { result, waitForNextUpdate } = testHook({
      user,
      plan,
      hasPaymentMethod,
      alreadyProcessing,
    });

    act(() => {
      result.current.updateSubscriptionPlan();
    });
    await expect(mockSuccessMutation).toHaveBeenCalled();
    await waitForNextUpdate();
    await expect(result.current.data).toEqual({
      billingUpdateSubscriptionPlan: { success: true },
    });
  });

  it('run the mutation and return a user friendly error', async () => {
    const hasPaymentMethod = true;
    const alreadyProcessing = true;
    const { result, waitForNextUpdate } = testHook({
      user: userWithError,
      plan,
      hasPaymentMethod,
      alreadyProcessing,
    });
    act(() => {
      result.current.updateSubscriptionPlan();
    });
    await expect(mockErrorMutation).toHaveBeenCalled();
    await waitForNextUpdate();
    await expect(result.current.error).toEqual(mocks[1].error);
  });
});
