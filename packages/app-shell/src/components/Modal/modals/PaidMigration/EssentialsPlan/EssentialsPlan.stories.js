import React from 'react';
import LearnMore from './index';
import response from '../../../../../common/mocks/mock';
import { UserContext } from '../../../../../common/context/User';

export default {
  title: 'Modals/Paid Migration/Essentials Plan',
  component: LearnMore,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <UserContext.Provider value={response.data.account}>
      <LearnMore {...args} />
    </UserContext.Provider>
  </div>
);

export const LearnMoreExample = Template.bind({});
LearnMoreExample.args = {
  planOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
  selectedPlan:
    response.data.account.currentOrganization.billing.changePlanOptions[1],
};
