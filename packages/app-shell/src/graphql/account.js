import gql from 'graphql-tag';

export const SET_CURRENT_ORGANIZATION = gql`
  mutation AccountSetCurrentOrganization($organizationId: String) {
    accountSetCurrentOrganization(organizationId: $organizationId)
  }
`;

export const QUERY_ACCOUNT = gql`
  query GetAccount {
    account {
      id
      email
      featureFlips
      isImpersonation
      currentOrganization {
        id
        name
        canEdit
        role
        createdAt
        isOneBufferOrganization
        billing {
          canAccessAnalytics
          canAccessEngagement
          canAccessPublishing
          paymentDetails {
            hasPaymentDetails
          }
          ... on MPBilling {
            billingRedirectUrl
          }
          ... on OBBilling {
            canStartTrial
            subscription {
              periodEnd
              trial {
                isActive
                remainingDays
                isAwaitingUserAction
                startDate
                endDate
              }
              plan {
                id
              }
            }
            changePlanOptions {
              planId
              planName
              planInterval
              channelsQuantity
              description
              isCurrentPlan
              highlights
              currency
              basePrice
              totalPrice
              discountPercentage
              discountNote
              priceNote
              absoluteSavings
              summary {
                details
                intervalBasePrice
                intervalUnit
              }
              isRecommended
            }
          }
        }
      }
      organizations {
        id
        name
        canEdit
        role
        createdAt
        isOneBufferOrganization
        billing {
          canAccessAnalytics
          canAccessEngagement
          canAccessPublishing
          paymentDetails {
            hasPaymentDetails
          }
          ... on MPBilling {
            billingRedirectUrl
          }
          ... on OBBilling {
            canStartTrial
            subscription {
              periodEnd
              trial {
                isActive
                remainingDays
                isAwaitingUserAction
                startDate
                endDate
              }
              plan {
                id
              }
            }
            changePlanOptions {
              planId
              planName
              planInterval
              channelsQuantity
              description
              isCurrentPlan
              highlights
              currency
              basePrice
              totalPrice
              discountPercentage
              discountNote
              priceNote
              absoluteSavings
              summary {
                details
                intervalBasePrice
                intervalUnit
              }
              isRecommended
            }
          }
        }
      }
      products {
        name
        userId
      }
    }
  }
`;
