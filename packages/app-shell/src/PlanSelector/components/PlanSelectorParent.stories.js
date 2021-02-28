import React from 'react';
import { PlanSelectorParent } from './PlanSelectorParent';
import response from '../mock';

export default {
  title: 'Plan Selector Parent',
  component: PlanSelectorParent,
};

const Template = (args) => <PlanSelectorParent {...args} />;

export const AnotherExample = Template.bind({});
AnotherExample.args = {
  planOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
};
