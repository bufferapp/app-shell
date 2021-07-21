import styled, { keyframes } from 'styled-components';
import { black, purple } from '@bufferapp/ui/style/colors';

const SlideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 432px;
  height: 336px;
  background-color: #f8fafc;
  position: relative;
  padding: 25px;
  overflow: hidden;

  h3 {
    opacity: 0;
    max-width: 183px;
    margin-top: 15px;
    margin-bottom: 16px;
    text-align: center;
    align-self: center;
    animation: 0.4s ${SlideUp} ease-out 0.6s 1 forwards;
    color: ${black};
  }
`;

export const BackgroundLayerBottom = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 20px;
  left: 0;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/hook-layer-bottom.png');
  background-repeat: no-repeat;
  background-size: cover;
  animation: 0.4s ${SlideUp} ease-out 1 forwards;
`;

export const BackgroundLayerTop = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/hook-layer-top.png');
  background-repeat: no-repeat;
  background-size: cover;
  animation: 0.4s ${SlideUp} ease-out 0.3s 1 forwards;
`;

export const IconWrapper = styled.div`
  text-align: center;
  opacity: 0;
  animation: 0.4s ${SlideUp} ease-out 1s 1 forwards;

  svg {
    width: 32px;
    height: 32px;
    color: ${purple};
  }
`;

export const OverlayBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 80%,
    rgba(255, 255, 255, 1) 100%
  );
`;

export const ButtonContainer = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 25px;
  left: 20px;
  animation: 0.6s ${SlideUp} ease-out 1.5s 1 forwards;

  > div:first-child {
    margin-right: 8px;
  }
`;
