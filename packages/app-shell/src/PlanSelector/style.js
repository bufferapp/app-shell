import {
  grayLighter,
  blue,
  grayDark,
  white,
  grayLight,
  blueLighter,
} from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 610px;
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const LoadingContainer = styled(Container)`
  width: 700px;
  justify-content: center;
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

  h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const PlanSelectorHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #333333;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-left: 4px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const AbsoluteSavings = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  color: ${blue};
  min-width: 112px;
  text-align: right;
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
    props.selectedPlan ? 'none' : `2px solid ${grayLight}`};
  box-shadow: ${(props) =>
    props.selectedPlan
      ? `0px 0px 0px 1.5px #2c4bff, 0px 4px 8px rgba(0, 0, 0, 0.04)`
      : `0px 4px 8px rgba(0, 0, 0, 0.04)`};
  border-radius: 3px;
  height: 450px;
  position: relative;
  padding: 21px;
  flex: 1 1 0px;
  margin-right: 12px;
  box-sizing: border-box;
  background: ${white};
  cursor: pointer;
  width: 285px;

  p {
    font-weight: 500;
    margin: 0;
    max-width: 200px;
  }

  h3 {
    margin: 0;
  }

  &:focus,
  &:hover {
    border: none;
    box-shadow: ${(props) =>
      props.selectedPlan
        ? `0px 0px 0px 1.5px #2c4bff, 0px 4px 8px rgba(0, 0, 0, 0.04)`
        : `0px 0px 0px 1.5px ${blueLighter}, 0px 4px 8px rgba(0, 0, 0, 0.04)`};
    outline: none;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 20px;

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

  label {
    font-weight: 700;
  }
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

  border: ${(props) =>
    props.selectedPlan ? `2px solid ${blue}` : '2px solid rgb(224, 224, 224)'};
  transition: 0.2s all linear;
  margin-right: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;

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
    font-size: 20px;
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
    font-weight: 600;
    font-size: 26px;
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

export const DowngradeMessage = styled.li`
  display: flex;
  margin-bottom: 20px;
  margin-top: -10px;
  max-width: 610px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: ${blue};

  svg {
    fill: ${blue};
    height: 22px;
    width: 22px;
    margin-top: -4px;
    margin-right: 5px;
  }
`;
