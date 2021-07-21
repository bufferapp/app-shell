import styled from 'styled-components';
import {
  purpleLight,
  blue,
  gray,
  grayLight,
  grayDark,
  grayDarker,
} from '@bufferapp/ui/style/colors';

export const Holder = styled.div`
  display: flex;
  flex-direction: row;
  width: 710px;
  height: 550px;

  h2 {
    max-width: 241px;
    margin-top: 22px;
    margin-bottom: 16px;
  }

  p {
    margin-top: 0px;
    margin-bottom: 0;
    max-width: 282px;
  }
`;

export const LeftColumn = styled.div`
  background: rgb(246, 249, 251);
  background: linear-gradient(
    90deg,
    rgba(246, 249, 251, 1) 95%,
    rgba(235, 237, 240, 1) 100%
  );
  flex: 1;
  width: 440px;
  padding: 50px;
  position: relative;

  button {
    color: ${blue};
  }
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 35px;

  svg {
    color: ${purpleLight};
    margin-right: 4px;
  }

  li {
    display: flex;

    p {
      margin-bottom: 16px;
    }
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  padding-left: -16px;
`;

export const RightColumn = styled.div``;

export const SummaryContainer = styled.div`
  width: 285px;
  background-color: #fcfcfc;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: inset 1px 0px 0px #bdbdbd;
  height: 100%;
  padding: 70px 0 24px;
  box-sizing: border-box;
  position: relative;

  h2 {
    margin-left: 8px;
    margin-bottom: 16px;
  }
`;

export const Body = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
`;

export const Bottom = styled.div`
  margin-left: 8px;

  label {
    display: inline-block;
    margin-bottom: 8px;
    font-weight: 700;
  }
`;

export const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  p {
    margin-top: 0;
    margin-bottom: 0;
    display: inline-block;
    font-weight: 500;
  }
`;

export const Detail = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export const DiscountReminder = styled.div`
  display: flex;
  margin-top: 4px;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0px;
    color: ${blue};
    margin-bottom: 0;
    margin-top: 0;
  }
  svg {
    fill: ${blue};
    margin-right: 4px;
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  sup {
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    font-size: 18px;
  }

  sup:first-child {
    font-weight: bold;
    font-size: 24px;
    line-height: 100%;
  }

  p {
    color: black;
    margin-left: 2px;
    margin-right: 2px;
  }
`;

export const TotalPrice = styled(Price)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 20px;
  position: initial;

  p {
    margin: 0 2px;
    font-size: 40px;
    line-height: 30px;
  }
`;

export const BoldPrice = styled.span`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0px;
`;

export const Separator = styled.span`
  height: 2px;
  width: 100%;
  display: block;
  background-color: #eeeeee;
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const SummaryNote = styled.div`
  p {
    color: ${gray};
    margin: 0;
  }

  b {
    font-weight: 600;
    color: ${grayDarker};
  }
`;

export const SummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background: #ffffff;
  border: 1px solid ${grayLight};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 20px 16px;
`;

export const Title = styled.div`
  margin-bottom: 16px;

  p {
    margin-top: 0;
    margin-bottom: 0;
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const PriceFooterWrapper = styled.div`
  margin-bottom: 15px;

  p {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 12px;
    font-weight: 500;
  }
`;
