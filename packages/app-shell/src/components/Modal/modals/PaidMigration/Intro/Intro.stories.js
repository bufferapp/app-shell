import React from 'react';
import Intro from './index';
import response from '../../../../../common/mocks/mock';
import { UserContext } from '../../../../../common/context/User';

export default {
  title: 'Modals/Paid Migration/Intro',
  component: Intro,
};

const Template = (args) => (
  <div style={{ height: '550px' }}>
    <UserContext.Provider value={response.data.account}>
      <Intro {...args} />
    </UserContext.Provider>
  </div>
);

export const Example = Template.bind({});
Example.args = {
  user: response.data.account,
};
