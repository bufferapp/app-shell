import useInterval from './useInterval';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useInterval', () => {
  it("should set the current plan's interval as the initial interval", () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      { planId: 'team', planInterval: 'year', isCurrentPlan: false },
    ];

    const { result } = renderHook(() => useInterval(planOptions));

    expect(result.current.monthlyBilling).toBe(true);
  });
  it("should set the initial interval to month if it's a free plan", () => {
    const planOptions = [
      { planId: 'individual', planInterval: 'month', isCurrentPlan: false },
      { planId: 'team', planInterval: 'month', isCurrentPlan: false },
    ];

    const isFreePlan = true;

    const { result } = renderHook(() => useInterval(planOptions, isFreePlan));

    expect(result.current.monthlyBilling).toBe(true);
  });
  it('should change the current interval when updated', () => {
    const planOptions = [
      { planId: 'free', planInterval: 'month', isCurrentPlan: true },
      { planId: 'team', planInterval: 'year', isCurrentPlan: false },
    ];

    const { result } = renderHook(() => useInterval(planOptions));
    act(() => {
      result.current.setBillingInterval(!result.current.monthlyBilling);
    });
    expect(result.current.monthlyBilling).toBe(false);
  });
});
