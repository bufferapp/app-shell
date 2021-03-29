import { useState } from 'react';
import { freePlan } from '../../mocks/freePlan';

const useInterval = (planOptions, isUpgradeIntent) => {
  const defaultSelectedPlan = isUpgradeIntent
    ? planOptions[1]
    : planOptions.find((plan) => plan.isCurrentPlan);
  const initiallyMonthly = defaultSelectedPlan.planInterval === 'month';
  const [monthlyBilling, setBillingInterval] = useState(initiallyMonthly);

  return {
    monthlyBilling,
    setBillingInterval,
  };
};

export default useInterval;
