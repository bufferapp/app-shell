import {
  grayLighter,
  blue,
  grayDark,
  white,
  black,
} from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 550px;
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid grey; //REMOVE THIS BEFORE MERGING!!!!
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 24px 24px;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
  background-image: url('https://buffer-ui.s3.amazonaws.com/Plan+Screen+-+Background.png');
  background-position-x: 85%;
  background-repeat: no-repeat;
  background-size: 400px;
  background-position-y: 0px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

export const PlanSelectorHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0px;
    color: ${blue};
  }

  p {
    color: #333333;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-left: 4px;
  }
`;

export const ButtonContainer = styled.div`
  background: #f5f5f5;
  border-bottom-right-radius: 8px;
  height: 88px;
  padding: 24px 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: inset 1px 0px 0px #bdbdbd;
`;

//SELECTION SCREEN STYLES

export const Wrapper = styled.div`
  border: ${(props) =>
    props.selectedPlan ? `1px solid ${blue}` : '1px solid #b8b8b8'};
  border-radius: 3px;
  height: 420px;
  position: relative;
  padding: 21px;
  flex: 1 1 0px;
  margin-right: 12px;
  box-sizing: border-box;
  background: ${white};

  p {
    font-weight: 500;
    margin: 0;
  }

  h3 {
    margin: 0;
  }

  &:focus {
    border: 1px solid ${blue};
    outline: none;
  }

  &:hover {
    border: 1px solid ${blue};
    outline: none;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  div:last-child {
    margin-right: 0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 16px;
`;

export const CardFooter = styled.div`
  position: absolute;
  bottom: 21px;
`;

export const CurrentLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: 64px;
  height: 25px;
  background: ${grayLighter};
  border-radius: 4px;

  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.4px;
  color: ${grayDark};
  text-transform: uppercase;
  margin-left: 12px;
  box-sizing: border-box;
`;

export const Recommended = styled(CurrentLabel)`
  background: ${blue};
  color: ${white};
  width: 110px;
  z-index: 1;
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  margin: auto;
`;

export const RadioButton = styled.div`
  position: absolute;
  top: 21px;
  right: 21px;

  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: ${(props) =>
    props.selectedPlan ? `${blue}` : 'transparent'};

  border: 1.5px solid #e0e0e0;
  transition: 0.2s all linear;
  margin-right: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${white};
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  sup {
    font-family: 'Roboto', sans-serif;
  }

  sup:first-child {
    font-weight: bold;
    font-size: 16px;
    line-height: 100%;
  }

  sup::last-child {
    font-weight: 900;
    font-size: 14px;
    line-height: 140%;
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
  position: initial;

  p {
    margin: 0 2px;
    font-size: 30px;
    line-height: 30px;
  }
`;

export const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 32px;
`;

export const Benefit = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    fill: ${blue};
    margin-right: 8px;
  }
`;

//SUMMARY STYLES
export const SummaryContainer = styled.div`
  width: 255px;
  background-color: #fcfcfc;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: inset 1px 0px 0px #bdbdbd;
  height: 100%;
  padding: 70px 0 24px;
  box-sizing: border-box;
  position: relative;
`;

export const Body = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  height: calc(100% - 88px);
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 21px;

  label {
    display: inline-block;
    margin-bottom: 8px;
  }
`;

export const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
  margin-bottom: 16px;

  p {
    margin-top: 0;
    margin-bottom: 8px;
    display: inline-block;
  }
`;

export const Detail = styled.li`
  display: flex;
  align-items: baseline;

  :before {
    content: '';
    height: 4px;
    width: 4px;
    border-radius: 50%;
    border: 2px solid ${blue};
    display: inline-block;
    margin-right: 8px;
  }
`;

export const DiscountReminder = styled.div`
  display: flex;
  align-items: center;
  p {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0px;
    color: ${blue};
    margin-top: 0;
    margin-bottom: 0;
  }
`;
