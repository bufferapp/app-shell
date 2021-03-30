import { useMutation } from '@apollo/client'
import { QUERY_ACCOUNT, SET_CURRENT_ORGANIZATION } from '../graphql/account';

function useOrgSwitcher() {
  const [setCurrentOrganization] = useMutation(SET_CURRENT_ORGANIZATION);

  const updateCache = (organizationId, client) => {
    const previousData = client.readQuery({ query: QUERY_ACCOUNT });
    const organizationSelected = previousData?.account?.organizations?.filter(
      (organization) => organization.id === organizationId
    )[0];
    const updatedData = {
      account: {
        ...previousData?.account,
        currentOrganization: organizationSelected,
      },
    };
    client.writeQuery({
      query: QUERY_ACCOUNT,
      data: updatedData,
    });
  };

  return async (organizationId, options = {}) => {
    await setCurrentOrganization({
      variables: {
        organizationId,
      },
      update: (client) => updateCache(organizationId, client),
    });

    // Needed, as the onCompleted is not triggered when passed as an option in the mutate function.
    if (options.onCompleted) {
      options.onCompleted(organizationId);
    }
  };
}

export default useOrgSwitcher;
