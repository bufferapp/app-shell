import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';

import { QUERY_ACCOUNT } from '../graphql/account';
import { START_TRIAL } from '../graphql/billing';
import useStartTrial from './useStartTrial';

describe('useStartTrial', () => {
  const mockSuccessMutation = jest.fn(() => {
    return {
      data: {
        billingStartTrial: {
          success: true,
        },
      },
    };
  });

  const mockErrorMutation = jest.fn(() => {
    return {
      data: {
        billingStartTrial: {
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
        query: START_TRIAL,
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
        query: START_TRIAL,
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
      () => useStartTrial(params),
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

  it('run the mutation and return the start trial success', async () => {
    const { result, waitForNextUpdate } = testHook({
      user,
      plan,
    });
    act(() => {
      result.current.startTrial();
    });
    await expect(mockSuccessMutation).toHaveBeenCalled();
    await waitForNextUpdate();
    await expect(result.current.trial.billingStartTrial.success).toBeTruthy();
  });

  it('run the mutation and return a user friendly error', async () => {
    const { result, waitForNextUpdate } = testHook({
      user: userWithError,
      plan,
    });
    act(() => {
      result.current.startTrial();
    });
    await expect(mockErrorMutation).toHaveBeenCalled();
    await waitForNextUpdate();
    await expect(result.current.error).toEqual(mocks[1].error);
  });
});
