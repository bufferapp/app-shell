import gql from 'graphql-tag';

export const SET_CURRENT_ORGANIZATION = gql`
  mutation AccountSetCurrentOrganization($organizationId: String) {
    accountSetCurrentOrganization(organizationId: $organizationId)
  }
`;

/**
 * IMPORTANT: since our cache is being updated manually for the
 * setCurrentOrganization mutation, make sure that when you add,
 * change or delete fields inside the currentOrganization in this
 * query, you also do the same inside the organizations.
 */

export const QUERY_ACCOUNT = gql`
  query GetAccount {
    account {
      id
      email
      avatar
      featureFlips
      isImpersonation
      currentOrganization {
        id
        name
        canEdit
        role
        createdAt
        isOneBufferOrganization
        featureFlips
        billing {
          canAccessAnalytics
          canAccessEngagement
          canAccessPublishing
          paymentDetails {
            hasPaymentDetails
          }
          ... on MPBilling {
            billingRedirectUrl
            subscriptions {
              plan
              product
            }
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
                name
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
              downgradedMessage
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
        featureFlips
        billing {
          canAccessAnalytics
          canAccessEngagement
          canAccessPublishing
          paymentDetails {
            hasPaymentDetails
          }
          ... on MPBilling {
            billingRedirectUrl
            subscriptions {
              plan
              product
            }
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
                name
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
              downgradedMessage
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
