import { useState } from 'react';

const useButtonOptions = (
  selectedPlan,
  updatePlan,
  openPaymentModal,
  hasPaymentDetails = false
) => {
  const getLabel = (selectedPlan) =>
    selectedPlan.isCurrentPlan
      ? 'Stay On My Current Plan'
      : 'Confirm Plan Change';

  const [label, setLabel] = useState(getLabel(selectedPlan));

  const buttonFunction = () => {
    if (selectedPlan.planId === 'free') {
      return updatePlan;
    } else return hasPaymentDetails ? updatePlan : openPaymentModal;
  };

  const [action, setAction] = useState(
    selectedPlan.isCurrentPlan ? null : buttonFunction
  );

  const updateButton = (selectedPlan) => {
    setLabel(getLabel(selectedPlan));
    setAction(selectedPlan.isCurrentPlan ? null : buttonFunction);
  };

  return {
    label,
    action,
    updateButton,
  };
};

export default useButtonOptions;
