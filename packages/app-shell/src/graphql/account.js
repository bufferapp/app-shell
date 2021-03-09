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
            canAccessAnalytics
            canStartTrial
            subscription {
              trial {
                isActive
                remainingDays
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
              summary {
                details
                warning
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
        billing {
          canAccessAnalytics
          canAccessEngagement
          canAccessPublishing
        }
      }
      products {
        name
        userId
      }
    }
  }
`;
