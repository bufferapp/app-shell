const useCopy = ({ planName, startedTrial, onlyUpdatedCardDetails }) => {
  if (startedTrial) {
    return {
      label: 'Congrats! You are now starting your trial',
      description:
        'For the next 14 days you get to experience Buffer to it’s full. Have fun!',
      buttonCopy: "Great. Let's Go",
    };
  }

  if (onlyUpdatedCardDetails) {
    return {
      label: 'Your billing details are now updated',
      description:
        'Thank you, your billing details have gone through successfully.',
      buttonCopy: "That's great!",
    };
  }

  if (planName === 'Free') {
    return {
      label: 'Congrats! You are now on the Free plan',
      description:
        'Your change have gone through successfully. Start using your Free plan today.',
      buttonCopy: "Great. Let's Go",
    };
  } else {
    return {
      label: `Congrats! Welcome to the ${planName} plan`,
      description: `Your details have gone through successfully. Start using your ${planName} plan features.`,
      buttonCopy: "Great. Let's Go",
    };
  }
};

export default useCopy;
