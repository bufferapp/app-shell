import useButtonOptions from './useButtonOptions';
import { renderHook, act } from '@testing-library/react-hooks';

const updatePlan = () => {
  console.log('update the plan');
};

const openPaymentMethod = () => {
  console.log('opens payment modal');
};

describe('useButtonOptions', () => {
  it("should return the label 'Stay On My Current Plan' and action null if there's no plan change", () => {
    const selectedPlan = {
      planId: 'team',
      planInterval: 'year',
      isCurrentPlan: true,
    };

    const { result } = renderHook(() => useButtonOptions({ selectedPlan }));
    expect(result.current.label).toBe('Stay On My Current Plan');
    expect(result.current.action).toBe(null);
  });
  it("should return {label 'Go To Payment', action: openPaymentMethod} if the user changes plan and doesn't have payment details", () => {
    const selectedPlan = {
      planId: 'team',
      planInterval: 'year',
      isCurrentPlan: false,
    };

    const hasPaymentDetails = false;

    const { result } = renderHook(() =>
      useButtonOptions({
        selectedPlan,
        updatePlan,
        openPaymentMethod,
        hasPaymentDetails,
      })
    );

    expect(result.current.label).toBe('Go To Payment');
    expect(result.current.action).toBe(openPaymentMethod);
  });
  it("should return {label 'Confirm Plan Change', action: updatePlan} if the user changes plan and does have payment details", () => {
    const selectedPlan = {
      planId: 'team',
      planInterval: 'year',
      isCurrentPlan: false,
    };

    const hasPaymentDetails = true;

    const { result } = renderHook(() =>
      useButtonOptions({
        selectedPlan,
        updatePlan,
        openPaymentMethod,
        hasPaymentDetails,
      })
    );

    expect(result.current.label).toBe('Confirm Plan Change');
    expect(result.current.action).toBe(updatePlan);
  });
  it("should return {label 'Confirm Plan Change', action: updatePlan} if the user changes to a free plan", () => {
    const selectedPlan = {
      planId: 'free',
      planInterval: 'year',
      isCurrentPlan: false,
    };

    const hasPaymentDetails = false;

    const { result } = renderHook(() =>
      useButtonOptions({
        selectedPlan,
        updatePlan,
        openPaymentMethod,
        hasPaymentDetails,
      })
    );

    expect(result.current.label).toBe('Confirm Plan Change');
    expect(result.current.action).toBe(updatePlan);
  });
  it("should return {label 'Confirm Trial Plan', action: updatePlan} is on a trial and has payment details", () => {
    const selectedPlan = {
      planId: 'team',
      planInterval: 'year',
      isCurrentPlan: false,
    };

    const hasPaymentDetails = true;
    const isActiveTrial = true;

    const { result } = renderHook(() =>
      useButtonOptions({
        selectedPlan,
        updatePlan,
        openPaymentMethod,
        hasPaymentDetails,
        isActiveTrial,
      })
    );

    expect(result.current.label).toBe('Confirm Trial Plan');
    expect(result.current.action).toBe(updatePlan);
  });
  it("should return {label 'Go To Payment', action: openPaymentMethod} is on a trial and doesn't have payment details", () => {
    const selectedPlan = {
      planId: 'team',
      planInterval: 'year',
      isCurrentPlan: false,
    };

    const hasPaymentDetails = false;
    const isActiveTrial = true;

    const { result } = renderHook(() =>
      useButtonOptions({
        selectedPlan,
        updatePlan,
        openPaymentMethod,
        hasPaymentDetails,
        isActiveTrial,
      })
    );

    expect(result.current.label).toBe('Go To Payment');
    expect(result.current.action).toBe(openPaymentMethod);
  });
  it("should return {label 'Confirm Free Plan'} if isAwaitingUserAction and is on free plan", () => {
    const selectedPlan = {
      planId: 'free',
      planInterval: 'year',
      isCurrentPlan: true,
    };

    const hasPaymentDetails = false;
    const isActiveTrial = false;
    const isAwaitingUserAction = true;

    const { result } = renderHook(() =>
      useButtonOptions({
        selectedPlan,
        updatePlan,
        openPaymentMethod,
        hasPaymentDetails,
        isActiveTrial,
        isAwaitingUserAction,
      })
    );

    expect(result.current.label).toBe('Confirm Free Plan');
  });
  it("should update the label and action when there's a new selectedPlan", () => {
    const selectedPlan = {
      planId: 'team',
      isCurrentPlan: true,
    };

    const newPlan = {
      planId: 'individual',
      isCurrentPlan: false,
    };

    const hasPaymentDetails = true;

    const { result } = renderHook(() =>
      useButtonOptions({
        selectedPlan,
        updatePlan,
        openPaymentMethod,
        hasPaymentDetails,
      })
    );

    act(() => {
      result.current.updateButton(newPlan);
    });

    expect(result.current.label).toBe('Confirm Plan Change');
  });
});
