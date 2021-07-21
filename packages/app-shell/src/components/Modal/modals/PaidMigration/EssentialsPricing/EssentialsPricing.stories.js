import React from 'react';
import Pricing from './index';
import response from '../../../../../common/mocks/mock';
import { UserContext } from '../../../../../common/context/User';

export default {
  title: 'Modals/Paid Migration/Essentials Pricing',
  component: Pricing,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <UserContext.Provider value={response.data.account}>
      <Pricing {...args} />
    </UserContext.Provider>
  </div>
);

export const Example = Template.bind({});
Example.args = {
  user: response.data.account,
};
