import useSelectedPlan from './useSelectedPlan';
import { renderHook, act } from '@testing-library/react-hooks';

const planOptions = [
  { planId: 'individual', isCurrentPlan: false },
  { planId: 'team', isCurrentPlan: true },
];

describe('useSelectedPlan', () => {
  it('should set the default as the current plan', () => {
    const { result } = renderHook(() => useSelectedPlan(planOptions));
    expect(result.current.selectedPlan.planId === 'team');
  });

  it('should update the selected plan', () => {
    const newSelectedPlan = { planId: 'individual' };

    const { result } = renderHook(() => useSelectedPlan(planOptions));
    act(() => {
      result.current.setSelectedPlan(newSelectedPlan);
    });
    expect(result.current.selectedPlan.id === 'individual');
  });
});
