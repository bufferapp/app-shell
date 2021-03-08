import React from 'react';
import { PlanSelector } from './PlanSelector';
import response from '../mocks/mock';

export default {
  title: 'Plan Selector',
  component: PlanSelector,
};

const Template = (args) => <PlanSelector {...args} />;

export const AnotherExample = Template.bind({});
AnotherExample.args = {
  planOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
};
