import React from 'react';
import { SelectionScreen } from './SelectionScreen';
import response from "../mock"

export default {
  title: 'Selection Screen',
  component: SelectionScreen,
};

const Template = (args) => <SelectionScreen {...args} />;

export const OneExample = Template.bind({});
OneExample.args = {
  planOptions: response.data.account.currentOrganization.billing.changePlanOptions,
};