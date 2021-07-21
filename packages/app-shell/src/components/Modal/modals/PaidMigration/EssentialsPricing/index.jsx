import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import { ModalContext } from '../../../../../common/context/Modal';
import { MODALS } from '../../../../../common/hooks/useModal';

import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';

import {
  Holder,
  FeaturesList,
  LeftColumn,
  RightColumn,
  TotalPrice,
  Detail,
  DetailList,
  Bottom,
  Body,
  SummaryContainer,
  Separator,
  SummaryNote,
  SummaryDetails,
  PriceFooterWrapper,
  ButtonContainer,
} from './style';

const EssentialsPricing = () => {
  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <Holder>
          <LeftColumn>
            <Text type="h2">Why supercharge your plan to Essentials?</Text>

            <Text type="p">
              By upgrading your plan today you are gaining so many features.
            </Text>

            <FeaturesList>
              <li>
                <FlashIcon size="large" />
                <Text type="p">Comprehensive analytics</Text>
              </li>
              <li>
                <FlashIcon size="large" />
                <Text type="p">Intelligent answers and suggestions</Text>
              </li>
              <li>
                <FlashIcon size="large" />
                <Text type="p">Advanced Instagram features</Text>
              </li>
              <li>
                <FlashIcon size="large" />
                <Text type="p">The entirety of the Buffer platform</Text>
              </li>
            </FeaturesList>

            <ButtonContainer>
              <Button
                type="text"
                onClick={() => {
                  openModal(MODALS.planSelector, {
                    cta: 'planSelection',
                    ctaButton: 'Go back to plans',
                  });
                }}
                label="Go back to plans"
                icon={<ArrowLeftIcon />}
              />
            </ButtonContainer>
          </LeftColumn>

          <RightColumn>
            <SummaryContainer>
              <Body>
                <Text type="h2">Your upgrade</Text>
                <SummaryDetails>
                  {
                    <>
                      <DetailList>
                        {selectedPlan.summary.details.map((detail) => (
                          <Detail key={detail}>
                            <Text type="p">{detail}</Text>
                          </Detail>
                        ))}
                      </DetailList>
                      <Separator />
                      <SummaryNote>
                        <Text type="p">
                          Payment made today is pro rata of new plan price until
                          the next billing cycle begins on <b>August 3, 2021</b>
                        </Text>
                      </SummaryNote>
                    </>
                  }
                </SummaryDetails>

                <Bottom>
                  <TotalPrice>
                    <sup>{selectedPlan.currency}</sup>
                    <Text type="h2" as="p">
                      {selectedPlan.totalPrice}
                    </Text>
                  </TotalPrice>

                  <PriceFooterWrapper>
                    <Text type="p" color="grayDark">
                      Billed monthly in USD
                    </Text>
                    <Text type="p" color="grayDark">
                      Includes ${selectedPlan.channelsQuantity} social channels
                    </Text>
                  </PriceFooterWrapper>

                  <Button
                    type="primary"
                    onClick={() => {
                      openModal(MODALS.upgradeSuccess, {
                        cta: 'Migrate to OB Modal',
                        ctaButton: 'Supercharge My Plan',
                      });
                    }}
                    label="Supercharge My Plan"
                  />
                </Bottom>
              </Body>
            </SummaryContainer>
            <div></div>
          </RightColumn>
        </Holder>
      )}
    </ModalContext.Consumer>
  );
};

export const selectedPlan = {
  planId: 'essentials',
  planName: 'Essentials',
  planInterval: 'month',
  channelsQuantity: 1,
  description: 'Grow your business with advanced features and unlimited usage.',
  isCurrentPlan: false,
  highlights: ['Unlimited usage', 'Advanced IG features'],
  currency: '$',
  basePrice: 5,
  totalPrice: 5,
  discountPercentage: 0,
  discountNote: '',
  priceNote: 'Price per social channel',
  summary: {
    details: [
      'Unlimited scheduled posts',
      'Unlimited social channels',
      'One user',
    ],
    warning:
      'By downgrading, aspects of your account will be frozen to meet with plan quotas. Nothings will be lost.',
    intervalBasePrice: 5,
    intervalUnit: 'mo',
  },
  isRecommended: false,
};

export default EssentialsPricing;
