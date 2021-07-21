import styled from 'styled-components';

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 376px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: right 48px center;
  background-image: url('https://buffer-ui.s3.amazonaws.com/illustrations/success-celebration.jpg');
  background-size: 410px;
  padding: 24px;

  h1 {
    max-width: 308px;
    margin-top: 22px;
    margin-bottom: 16px;
  }

  p {
    margin-top: 0px;
    margin-bottom: 0;
    max-width: 282px;
  }
`;

export const ButtonContainer = styled.div`
  width: fit-content;
  margin-top: 32px;
  margin-bottom: 32px;
`;
