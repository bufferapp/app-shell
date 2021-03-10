import React, { useState } from 'react';
import Text from '@bufferapp/ui/Text';
import CardIcon from '@bufferapp/ui/Icon/Icons/Card';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

import {
  Field as StyledField,
  Input,
  Error,
  ImgWrapper,
  CardWrapper,
} from '../style'

import {
  gray,
  redDark,
} from '@bufferapp/ui/style/colors';

const options ={
  style: {
    base: {
      color: "#636363",
      fontSize: "18px",
      fontFamily: 'Roboto, Open Sans, sans-serif',
      letterSpacing: "0.025em",
      "::placeholder": {
        color: gray
      }
    },
    invalid: {
      color: redDark
    }
  }
};

const Card = ({ brand }) => {
  switch(brand) {
    case 'visa':
      return (<ImgWrapper><img alt='visa' src='https://buffer-ui.s3.amazonaws.com/card-icon-visa.png' /></ImgWrapper>);
    case 'amex':
      return (<ImgWrapper><img alt='amex' src='https://buffer-ui.s3.amazonaws.com/card-icon-amex.png' /></ImgWrapper>);
    case 'diners_club':
      return (<ImgWrapper><img alt='diners_club' src='https://buffer-ui.s3.amazonaws.com/card-icon-diners.png' /></ImgWrapper>);
    case 'discover':
      return (<ImgWrapper><img alt='discover' src='https://buffer-ui.s3.amazonaws.com/card-icon-discover.png' /></ImgWrapper>);
    case 'jcb':
      return (<ImgWrapper><img alt='jcb' src='https://buffer-ui.s3.amazonaws.com/card-icon-jcb.png' /></ImgWrapper>);
    case 'mastercard':
      return (<ImgWrapper><img alt='mastercard' src='https://buffer-ui.s3.amazonaws.com/card-icon-mastercard.png' /></ImgWrapper>);
    default:
      return (<CardIcon size="medium" />);
  }
}

const Field = ({ label, enableSubmit }) => {
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState({});

  return (<StyledField>
    <Text type='label' >{label}
      <Input focus={focus} hasError={!!data.error} >
        {label === 'Credit card number' && <CardWrapper>
          <Card brand={data.brand} />
          <CardNumberElement
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={(value) => { enableSubmit(); setData(value); }}
              options={options}
          />
        </CardWrapper>}
        {label === 'Expiration date' && <CardExpiryElement
          options={options}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(value) => {setData(value)}}
        />}
        {label === 'CVC' && <CardCvcElement
          options={options}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(value) => {setData(value)}}
        />}
      </Input>
      <Error error={data.error} />
    </Text>
  </StyledField>);
}

export default Field;
