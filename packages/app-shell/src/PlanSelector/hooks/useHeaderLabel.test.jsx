import useHeaderLabel from './useHeaderLabel';
import { renderHook } from '@testing-library/react-hooks';

describe('useHeaderLabel', () => {
  it("should set the header label to 'Confirm Trial Plan' when a user is on a trial", () => {
    const isActiveTrial = true;
    const { result } = renderHook(() => useHeaderLabel(isActiveTrial));

    expect(result.current.headerLabel).toBe('Confirm Trial Plan');
  });
  it("should set the header label to 'Change My Plan' when a user changes plan", () => {
    const isActiveTrial = false;
    const planOptions = [{ planId: 'individual', isCurrentPlan: true }];
    const { result } = renderHook(() =>
      useHeaderLabel(isActiveTrial, planOptions)
    );

    expect(result.current.headerLabel).toBe('Change My Plan');
  });
  it("should set the header label to 'Upgrade from Free' when a user is on a free plan", () => {
    const isActiveTrial = false;
    const planOptions = [{ planId: 'free', isCurrentPlan: true }];
    const { result } = renderHook(() =>
      useHeaderLabel(isActiveTrial, planOptions)
    );

    expect(result.current.headerLabel).toBe('Upgrade from Free');
  });
});
