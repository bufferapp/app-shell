import styled from 'styled-components';
import { gray } from '@bufferapp/ui/style/colors';

export const Container = styled.div`
  position: fixed;
  bottom: 37px;
  right: 37px;
  border: 1px solid ${gray};
  border-radius: 4px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);

  > div:first-of-type {
    border-radius: 4px;
  }
`;
