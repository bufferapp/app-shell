import React from 'react';
import { SelectionScreen } from './SelectionScreen';
import response from '../../../common/mocks/mock';

export default {
  title: 'Selection Screen',
  component: SelectionScreen,
};

const Template = (args) => <SelectionScreen {...args} />;

export const OneExample = Template.bind({});
OneExample.args = {
  planOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
  selectedPlan:
    response.data.account.currentOrganization.billing.changePlanOptions[0],
  handlePlanSelection: () => {
    console.log('changed plans!');
  },
  monthlyBilling: true,
};
