const useHeaderLabel = (isActiveTrial, planOptions) => {
  let headerLabel;

  if (isActiveTrial) {
    return { headerLabel: 'Upgrade from Trial' };
  }

  const currentPlan = planOptions.find((option) => option.isCurrentPlan);
  if (currentPlan.planId === 'free') {
    return { headerLabel: 'Upgrade from Free' };
  }

  return {
    headerLabel: 'Change My Plan',
  };
};

export default useHeaderLabel;
