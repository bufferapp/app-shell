import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import Link from '@bufferapp/ui/Link';

import { Holder, ButtonContainer } from './style';

const Success = () => {
  return (
    <Holder>
      <Text type="h1">Congrats! Welcome to the Essentials plan</Text>

      <Text type="p">
        Your details have gone through successfully. Start using your Essentials
        plan features.
      </Text>

      <ButtonContainer>
        <Button type="primary" label="Great, Let's go" onClick={() => {}} />
      </ButtonContainer>

      <Text type="p">
        <i>
          You can always access your invoices and billing information{' '}
          <Link href="http://buffer.com">here</Link>
        </i>
      </Text>
    </Holder>
  );
};

export default Success;
