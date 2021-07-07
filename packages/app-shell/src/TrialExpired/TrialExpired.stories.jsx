import React from 'react'
import { Modal as TrialExpired } from './index'
import { UserContext } from '../context/User'
import response from '../mocks/trialExpiredMock'

export default {
  title: 'Trial Expired Modal',
  component: TrialExpired,
}

const Template = (args) => (
  <UserContext.Provider value={response.data.account}>
    <TrialExpired {...args} />
  </UserContext.Provider>
)

export const OneExample = Template.bind({})
OneExample.args = {
  user: response.data.account,
  onDismiss: () => { console.log('dimiss') },
  onUpgrade: () => { console.log('upgrade') },
}
