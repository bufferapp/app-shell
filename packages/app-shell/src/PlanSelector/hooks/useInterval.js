import { useState } from 'react';
const useInterval = (planOptions) => {
  const defaultSelectedPlan = planOptions.find((plan) => plan.isCurrentPlan);
  const initiallyMonthly = defaultSelectedPlan.planInterval === 'month';
  const [monthlyBilling, setBillingInterval] = useState(initiallyMonthly);

  return {
    monthlyBilling,
    setBillingInterval,
  };
};

export default useInterval;
