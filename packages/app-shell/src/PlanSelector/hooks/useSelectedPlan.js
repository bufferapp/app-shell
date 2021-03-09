import { useState } from 'react';

const useSelectedPlan = (planOptions) => {
  const defaultSelectedPlan = planOptions.find((plan) => plan.isCurrentPlan);
  const [selectedPlan, setSelectedPlan] = useState(defaultSelectedPlan);

  return {
    selectedPlan,
    setSelectedPlan,
  };
};

export default useSelectedPlan;
