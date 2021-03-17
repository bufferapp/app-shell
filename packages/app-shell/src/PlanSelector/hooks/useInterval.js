import { useState } from 'react';
import { freePlan } from '../../mocks/freePlan';

const useInterval = (planOptions, isFreePlan) => {
  const defaultSelectedPlan = isFreePlan
    ? freePlan
    : planOptions.find((plan) => plan.isCurrentPlan);
  const initiallyMonthly = defaultSelectedPlan.planInterval === 'month';
  const [monthlyBilling, setBillingInterval] = useState(initiallyMonthly);

  return {
    monthlyBilling,
    setBillingInterval,
  };
};

export default useInterval;
