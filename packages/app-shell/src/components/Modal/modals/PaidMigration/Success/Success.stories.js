import React from 'react';
import Success from './index';
import response from '../../../../../common/mocks/mock';
import { UserContext } from '../../../../../common/context/User';

export default {
  title: 'Modals/Paid Migration/Success',
  component: Success,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <UserContext.Provider value={response.data.account}>
      <Success {...args} />
    </UserContext.Provider>
  </div>
);

export const Example = Template.bind({});
Example.args = {
  user: response.data.account,
};
