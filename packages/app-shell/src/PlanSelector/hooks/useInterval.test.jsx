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
