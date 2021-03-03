import React from 'react';
import { Summary } from './Summary';
import response from '../mock';

export default {
  title: 'Summary',
  component: Summary,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <Summary {...args} />
  </div>
);

export const SummaryExample = Template.bind({});
SummaryExample.args = {
  planOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
  selectedPlan:
    response.data.account.currentOrganization.billing.changePlanOptions[1],
};
