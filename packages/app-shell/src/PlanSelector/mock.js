export default {
  data: {
    account: {
      currentOrganization: {
        id: '600750cd1d3b3b14cc552adf',
        canEdit: true,
        billing: {
          paymentDetails: {
            hasPaymentDetails: true,
          },
          isFree: false,
          canAccessAnalytics: true,
          subscription: {
            trial: {
              canStartTrial: false,
              isActive: false,
              remainingDays: 0,
            },
          },
          changePlanOptions: [
            {
              planId: 'free',
              planName: 'Free',
              planInterval: 'month',
              channelsQuantity: 1,
              description: 'Commit to a social media strategy before you pay.',
              isCurrentPlan: false,
              highlights: ['3 social channels', '10 scheduled posts'],
              currency: '$',
              basePrice: 0,
              totalPrice: 0,
              discountPercentage: 0,
              discountNote: '',
              priceNote: 'Enjoy for free',
              summary: {
                details: ['Upgrade anytime'],
                warning:
                  'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
                intervalBasePrice: 0,
                intervalUnit: 'mo',
              },
            },
            {
              planId: 'individual',
              planName: 'Individual',
              planInterval: 'month',
              channelsQuantity: 1,
              description:
                'Grow your business with advanced features and unlimited usage.',
              isCurrentPlan: false,
              highlights: ['Unlimited usage', 'Advanced IG features'],
              currency: '$',
              basePrice: 5,
              totalPrice: 5,
              discountPercentage: 0,
              discountNote: '',
              priceNote: 'Price per social channel',
              summary: {
                details: ['Add social channels anytime', 'Cancel at anytime'],
                warning:
                  'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
                intervalBasePrice: 5,
                intervalUnit: 'mo',
              },
            },
            {
              planId: 'team',
              planName: 'Team',
              planInterval: 'month',
              channelsQuantity: 1,
              description:
                'Collaborate with your team in one place and create shareable reports.',
              isCurrentPlan: false,
              highlights: ['Unlimited usage', 'Unlimited users'],
              currency: '$',
              basePrice: 10,
              totalPrice: 10,
              discountPercentage: 0,
              discountNote: '',
              priceNote: 'Price per social channel',
              summary: {
                details: [
                  'Add users anytime',
                  'Add social channels anytime',
                  'Cancel at anytime',
                ],
                warning:
                  'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
                intervalBasePrice: 10,
                intervalUnit: 'mo',
              },
            },
            {
              planId: 'free',
              planName: 'Free',
              planInterval: 'year',
              channelsQuantity: 1,
              description: 'Commit to a social media strategy before you pay.',
              isCurrentPlan: false,
              highlights: ['3 social channels', '10 scheduled posts'],
              currency: '$',
              basePrice: 0,
              totalPrice: 0,
              discountPercentage: 0,
              discountNote: '0% Discount',
              priceNote: 'Enjoy for free',
              summary: {
                details: ['Upgrade anytime'],
                warning:
                  'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
                intervalBasePrice: 0,
                intervalUnit: 'yr',
              },
            },
            {
              planId: 'individual',
              planName: 'Individual',
              planInterval: 'year',
              channelsQuantity: 1,
              description:
                'Grow your business with advanced features and unlimited usage.',
              isCurrentPlan: false,
              highlights: ['Unlimited usage', 'Advanced IG features'],
              currency: '$',
              basePrice: 4,
              totalPrice: 48,
              discountPercentage: 20,
              discountNote: '20% Discount',
              priceNote: 'Price per social channel',
              summary: {
                details: ['Add social channels anytime', 'Cancel at anytime'],
                warning:
                  'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
                intervalBasePrice: 48,
                intervalUnit: 'yr',
              },
            },
            {
              planId: 'team',
              planName: 'Team',
              planInterval: 'year',
              channelsQuantity: 1,
              description:
                'Collaborate with your team in one place and create shareable reports.',
              isCurrentPlan: true,
              highlights: ['Unlimited usage', 'Unlimited users'],
              currency: '$',
              basePrice: 8,
              totalPrice: 96,
              discountPercentage: 20,
              discountNote: '20% Discount',
              priceNote: 'Price per social channel',
              summary: {
                details: [
                  'Add users anytime',
                  'Add social channels anytime',
                  'Cancel at anytime',
                ],
                warning:
                  'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
                intervalBasePrice: 96,
                intervalUnit: 'yr',
              },
            },
          ],
        },
      },
    },
  },
};
