import useSelectedPlan from './useSelectedPlan';
import { renderHook, act } from '@testing-library/react-hooks';

const planOptions = [
  { planId: 'individual', isCurrentPlan: false, planInterval: 'year' },
  { planId: 'team', isCurrentPlan: true, planInterval: 'year' },
  { planId: 'free', planInterval: 'month' },
];

describe('useSelectedPlan', () => {
  it('should set the default as the current plan', () => {
    const { result } = renderHook(() => useSelectedPlan(planOptions));
    expect(result.current.selectedPlan.planId).toBe('team');
  });
  it('should set the default as the free plan is the user is on the free plan', () => {
    const isFreePlan = true;

    const { result } = renderHook(() =>
      useSelectedPlan(planOptions, isFreePlan)
    );
    expect(result.current.selectedPlan.planId).toBe('free');
  });
  it('should update the selected plan', () => {
    const planString = 'individual_year';

    const { result } = renderHook(() => useSelectedPlan(planOptions));
    act(() => {
      result.current.updateSelectedPlan(planString);
    });
    expect(result.current.selectedPlan.planId).toBe('individual');
  });
  it('should update the selected plan with a new interval', () => {
    const planString = 'free_month';

    const { result } = renderHook(() => useSelectedPlan(planOptions));
    act(() => {
      result.current.updateSelectedPlan(planString);
    });
    expect(result.current.selectedPlan.planId).toBe('free');
    expect(result.current.selectedPlan.planInterval).toBe('month');
  });
});
