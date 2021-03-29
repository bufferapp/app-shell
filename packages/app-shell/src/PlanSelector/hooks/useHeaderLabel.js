import { freePlan } from '../../mocks/freePlan';

const useHeaderLabel = (isActiveTrial, planOptions, isFreePlan) => {
  let headerLabel;

  if (isActiveTrial) {
    return { headerLabel: 'Upgrade from Trial' };
  }

  const currentPlan = isFreePlan
    ? freePlan
    : planOptions.find((option) => option.isCurrentPlan);
  if (currentPlan.planId === 'free') {
    return { headerLabel: 'Upgrade from Free' };
  }

  return {
    headerLabel: 'Change my plan',
  };
};

export default useHeaderLabel;
