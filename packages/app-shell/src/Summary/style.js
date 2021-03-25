import { blue, grayDark, grayDarker } from '@bufferapp/ui/style/colors';
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
    margin-bottom: 0;
    display: inline-block;
    font-weight: 600;
  }
`;

export const Detail = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    fill: ${blue};
    height: 14px;
    width: 14px;
    margin-right: 6px;
    margin-left: -3px;
  }

  ${(props) =>
    !props.noBulletPoint &&
    css`
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
  margin-bottom: 12px;
  margin-top: 12px;
`;

export const SummaryNote = styled.div`
  p {
    font-weight: 600;
    color: ${grayDark};
    margin: 0;
  }

  span {
    font-weight: 600;
    color: ${grayDarker};
  }
`;
