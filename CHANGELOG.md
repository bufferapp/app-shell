# Changelog

## [2.3.0] - 2021-03-10
- Update @bufferapp/ui to 5.62.3
- add PlanSelector modal
## [2.2.0] - 2021-03-09
- Update @bufferapp/ui to 5.60.1
- add PaymentMethod modal

## [2.1.0] - 2021-02-04
- Add canAccess* flags to the organizations an account belongs to:
  - `canAccessAnalytics`
  - `canAccessEngagement`
  - `canAccessPublishing`

## [2.0.0] - 2021-02-04
- Add global organization switcher
- Breaking change: Added dependency with Apollo: now the AppShell needs to be 
  rendered within 
  an `ApolloProvider` compotent to be able to trigger its own queries and 
  mutations.

## [1.1.1] - 2021-01-21
- Update `Engagement` URL.

## [1.1.0] - 2021-01-20
- Remove requirement for `engageRollout` feature flip.
- Rename links on navigation bar.

## [1.0.6] - 2020-12-01
- Fix function binding error when trying to close `Banner`

## [1.0.5] - 2020-11-15
- Re-publishing to NPM with correct version.

## [1.0.4] - 2020-11-18
- Allow tooltip message for org switcher to be hidden.

## [1.0.3] - 2020-11-10
- Refactor appendOrgSwitcher function.

## [1.0.2] - 2020-11-09
- Fix org switcher menu items.

## [1.0.1] - 2020-10-28
- Replace empty channels copy in org switcher.

## [1.0.0] - 2020-10-21
- First release. 🎉
