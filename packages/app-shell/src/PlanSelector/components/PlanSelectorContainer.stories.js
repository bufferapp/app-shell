import React from 'react';
import { PlanSelectorContainer } from './PlanSelectorContainer';
import response from '../../mocks/mock';

export default {
  title: 'Plan Selector',
  component: PlanSelectorContainer,
};

const Template = (args) => <PlanSelectorContainer {...args} />;

export const AnotherExample = Template.bind({});
AnotherExample.args = {
  planOptions:
    response.data.account.currentOrganization.billing.changePlanOptions,
};
