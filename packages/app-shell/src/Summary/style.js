import { blue } from '@bufferapp/ui/style/colors';
import styled, { css } from 'styled-components';

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
  height: calc(100% - 65px);
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 8px;

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
    font-weight: 600;
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
    box-sizing: content-box;
  }

  ${(props) =>
    props.changing &&
    css`
      p {
        font-weight: 800;
        color: ${blue};
      }
    `}
`;

export const DiscountReminder = styled.div`
  display: flex;
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

export const BoldPrice = styled.span`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0px;
`;

export const Notice = styled.div`
  border: 2px solid rgb(240, 233, 195);
  background: rgb(255, 252, 235) none repeat scroll 0% 0%;
  border-radius: 4px;
  padding: 16px 16px;
  display: flex;
  justify-content: flex-start;
  position: relative;

  span {
    color: #625920;
    font-size: 14px;
    line-height: 1.25;
  }
`;
