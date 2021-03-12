import useCopy from './useCopy';
import { renderHook } from '@testing-library/react-hooks';

describe('useCopy', () => {
  it('should return label, description and buttonCopy for a team/individual plan change', () => {
    const planName = 'Team';

    const { result } = renderHook(() => useCopy({ planName }));

    expect(result.current.label).toBe('Congrats! Welcome to the Team plan');
    expect(result.current.description).toBe(
      'Your details have gone through successfully. Start using your Team plan features.'
    );
    expect(result.current.buttonCopy).toBe("Great. Let's Go");
  });
  it('should return label, description and buttonCopy for a free plan change', () => {
    const planName = 'Free';

    const { result } = renderHook(() => useCopy({ planName }));

    expect(result.current.label).toBe('Congrats! You are now on the Free plan');
    expect(result.current.description).toBe(
      'Your change have gone through successfully. Start using your Free plan today.'
    );
    expect(result.current.buttonCopy).toBe("Great. Let's Go");
  });
  it('should return label, description and buttonCopy for a billing info change', () => {
    const planName = 'Free';
    const onlyUpdatedCardDetails = true;

    const { result } = renderHook(() =>
      useCopy({ planName, onlyUpdatedCardDetails })
    );

    expect(result.current.label).toBe('Your billing details are now updated');
    expect(result.current.description).toBe(
      'Thank you, your billing details have gone through successfully.'
    );
    expect(result.current.buttonCopy).toBe("That's great!");
  });
  it('should return label, description and buttonCopy for a new trial start', () => {
    const planName = 'Team';
    const startedTrial = true;

    const { result } = renderHook(() => useCopy({ planName, startedTrial }));

    expect(result.current.label).toBe(
      'Congrats! You are now starting your trial'
    );
    expect(result.current.description).toBe(
      'For the next 14 days you get to experience Buffer to it’s full. Have fun!'
    );
    expect(result.current.buttonCopy).toBe("Great. Let's Go");
  });
});
