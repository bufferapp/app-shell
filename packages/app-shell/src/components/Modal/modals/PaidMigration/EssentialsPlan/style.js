import styled from 'styled-components';

import {
  black,
  blue,
  gray,
  grayDark,
  grayLight,
  grayLighter,
  grayDarker,
  purple,
  purpleLight,
  teal,
} from '@bufferapp/ui/style/colors';

export const Holder = styled.div`
  width: 900px;
  height: 540px;
  box-sizing: border-box;
  padding-top: 24px;
  overflow-y: scroll;
`;

export const Hero = styled.div`
  width: 100%;
  text-align: center;
  background-image: url('https://buffer-ui.s3.amazonaws.com/shapes/wavy-gradient-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: 100%;
  padding-bottom: 55px;

  img {
    margin: 0 auto 20px;
    display: block;
  }

  h1 {
    margin-top: 69px;
    margin-bottom: 0;
  }

  p {
    color: ${grayDark};
    max-width: 460px;
    margin: 0 auto;
  }
`;

export const IconWrapper = styled.div`
  text-align: center;
  margin-top: 69px;

  svg {
    width: 32px;
    height: 32px;
    color: ${purpleLight};
  }
`;

export const SectionIntro = styled.div`
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionOneBuffer = styled.div`
  background-color: ${blue};
  padding-top: 200px;
`;

export const SectionAnalytics = styled.div`
  background-color: ${teal};
  background: linear-gradient(0deg, white 30%, ${teal} 40%);
  padding-top: 150px;
`;

export const IntroducingEssentials = styled.div`
  width: 900px;
  height: 785px;
  margin-top: -85px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/introducing.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Feature = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 25px;
    margin-bottom: 0;
  }

  p {
    max-width: 430px;
    margin-top: 25px;
  }
`;

export const InstagramPosting = styled.div`
  width: 900px;
  height: 726px;
  margin-bottom: -200px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/instagram-posting.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const BufferSuite = styled.div`
  width: 900px;
  height: 403px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/buffer-suite.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const OneBuffer = styled.div`
  width: 900px;
  height: 602px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/one-buffer.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Label = styled.div`
  border: 2px solid ${(props) => props.color};
  padding: 5px 12px;
  border-radius: 3px;
  width: fit-content;
  margin: 0 auto;

  svg {
    color: ${(props) => props.color};
    margin-right: 7px;
  }

  p {
    color: ${(props) => props.color};
    display: inline;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;
    font-size: 12px;
  }
`;

export const BottomSection = styled.div`
  background-color: #f8fafc;
  padding-bottom: 150px;
`;

export const TableContainer = styled.div`
  position: relative;
  max-width: 720px;
  margin: 0 auto;

  p:first-of-type {
    max-width: 272px;
  }
`;

export const FeaturesTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
  z-index: 9;
  margin-top: -35px;

  td,
  th {
    padding: 10px;
    text-align: center;

    &:nth-child(2) {
      box-shadow: inset -1em 0em #f8fafc, inset 1em 0em #f8fafc;
    }

    &:nth-child(3) {
      box-shadow: inset 1em 0em #f8fafc, inset -1em 0em #f8fafc;
    }

    &:nth-child(2),
    &:nth-child(3) {
      background-color: white;
      width: 174px;
      text-align: center;
    }
  }

  thead {
    th {
      padding: 10px;
      text-align: center;

      span {
        font-size: 24px;
      }

      /* feature category name */
      &:nth-child(1) {
        text-align: left;
        font-weight: 600;
        vertical-align: bottom;
      }
    }
  }

  tbody {
    tr {
      border-top: 1px solid ${grayLight};
    }

    td {
      text-align: left;
      margin-bottom: 7px;
      line-height: 1.2rem;
    }

    svg {
      width: 40px;
    }
  }
`;

export const PlanLabel = styled.div`
  background-color: ${(props) => (props.highlight ? blue : grayLight)};
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  border-radius: 3px;
  padding: 4px 12px;

  p {
    text-transform: uppercase;
    color: ${(props) => (props.highlight ? 'white' : grayDark)};
    font-size: 12px;

    letter-spacing: 1.5px;
    font-weight: 600;
    margin: 0;
    display: inline-block;
  }

  svg {
    color: white;
    margin-right: 9px;
  }
`;

export const PlanName = styled.div`
  margin-top: 10px;

  p {
    font-size: 30px;
    font-weight: 600;
    margin: 0;
    line-height: 30px;
  }
`;

export const FeatureIcon = styled.div`
  display: flex;
  justify-content: center;

  svg {
    color: ${blue};
  }
`;

export const DashIcon = styled.div`
  width: 12px;
  height: 3px;
  border-radius: 10px;
  background-color: ${gray};
`;

export const FreePlanBorder = styled.div`
  border: 2px solid ${gray};
  position: absolute;
  height: 100%;
  border-radius: 5px;
  width: 165px;
  left: 345px;
  z-index: 99;
  top: 70px;
  pointer-events: none;
`;

export const EssentialsPlanBorder = styled.div`
  border: 3px solid ${blue};
  position: absolute;
  height: 100%;
  border-radius: 5px;
  width: 165px;
  right: 12px;
  z-index: 99;
  top: 70px;
  pointer-events: none;
`;

export const ButtonWrapper = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
`;
