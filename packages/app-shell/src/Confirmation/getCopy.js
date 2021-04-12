export const SUCCESS_CTA = "Great, Let's Go!";
const getCopy = ({ planName, startedTrial }) => {
  if (startedTrial) {
    return {
      label: 'Trial activated! Time to explore.',
      description:
        'Let’s make the most of your 14-day trial. Jump in and start exploring your advanced publishing, analytics, and engagement features. ',
      buttonCopy: "Let's Go!",
      imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-celebrate.png',
    };
  }

  if (planName === 'Free') {
    return {
      label: 'Congrats! You are now on the Free plan',
      description:
        'Your change have gone through successfully. Start using your Free plan today.',
      buttonCopy: SUCCESS_CTA,
      imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-celebrate.png',
    };
  } else if (planName) {
    return {
      label: `Congrats! Welcome to the ${planName} plan`,
      description: `Your details have gone through successfully. Start using your ${planName} plan features.`,
      buttonCopy: SUCCESS_CTA,
      imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-celebrate.png',
    };
  }

  return {
    label: 'Your billing details are now updated',
    description:
      'Thank you, your billing details have gone through successfully.',
    buttonCopy: "That's great!",
    imageUrl: 'https://buffer-ui.s3.amazonaws.com/illustration-highfive.png',
  };
};

export default getCopy;
