import React from 'react';

import { ModalContext } from '../../../../../common/context/Modal';
import { MODALS } from '../../../../../common/hooks/useModal';
import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import { purple, white, blue, teal } from '@bufferapp/ui/style/colors';

import {
  Holder,
  Hero,
  IconWrapper,
  Feature,
  Label,
  InstagramPosting,
  BufferSuite,
  OneBuffer,
  FreePlanBorder,
  EssentialsPlanBorder,
  FeaturesTable,
  TableContainer,
  FeatureIcon,
  DashIcon,
  PlanLabel,
  PlanName,
  BottomSection,
  ButtonWrapper,
  IntroducingEssentials,
  SectionIntro,
  SectionOneBuffer,
  SectionAnalytics,
} from './style';

const EssentialsPlan = () => {
  const checkIfTrue = (plan) => {
    switch (plan) {
      case true:
        return <CheckmarkIcon size="large" />;
      default:
        return <DashIcon />;
    }
  };

  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <Holder>
          <Hero>
            <img
              src="https://buffer-ui.s3.amazonaws.com/avatars/avatar-joel.jpg"
              width="117"
              height="117"
            />
            <Text type="p">
              Hey, it’s Joel the CEO here. I wanted to say that we’re embarking
              on a new future here at Buffer that involves what we believe to be
              better plans, better pricing that works for you and your online
              business.
            </Text>

            <IconWrapper>
              <FlashIcon size="large" />
            </IconWrapper>

            <Text type="h1">Introducing the Essentials plan</Text>
          </Hero>

          <SectionIntro>
            <IntroducingEssentials></IntroducingEssentials>
            <Feature>
              <Label color={purple}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </Label>

              <Text type="h2">Take your posting power to the next level</Text>
              <Text type="p">
                With advanced Instagram features like our Hashtag Manager, Shop
                Grid and Instagram Stories scheduling you can take things
                further
              </Text>
            </Feature>

            <InstagramPosting></InstagramPosting>
          </SectionIntro>

          <SectionOneBuffer>
            <Feature>
              <Label color={white}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </Label>

              <Text type="h2" color="white">
                Giving you the best of what we offer
              </Text>
              <Text type="p" color="white">
                You get the full package with our comprehensive publishing,
                analytics and engagement tools to power your business
              </Text>
            </Feature>
            <BufferSuite></BufferSuite>
          </SectionOneBuffer>

          <SectionAnalytics>
            <Feature>
              <Label color={white}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </Label>

              <Text type="h2" color="white">
                Know where to take your business next
              </Text>
              <Text type="p" color="white">
                Go deeper with comprehensive cross-network analytics that will
                let you see the bigger picture and help you shape where to go
                next
              </Text>
            </Feature>

            <OneBuffer></OneBuffer>
          </SectionAnalytics>

          <BottomSection>
            <TableContainer>
              <Text type="h2">There is so much to gain</Text>
              <Text type="p">
                Supercharging your plan with so much more than what you have
                today
              </Text>

              <FreePlanBorder></FreePlanBorder>
              <EssentialsPlanBorder></EssentialsPlanBorder>
              <FeaturesTable>
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <PlanLabel>
                        <Text type="p">Current Plan</Text>
                      </PlanLabel>
                      <PlanName>
                        <Text type="p">Free</Text>
                      </PlanName>
                    </th>
                    <th>
                      <PlanLabel highlight>
                        <FlashIcon size="medium" verticalAlign="middle" />
                        <Text type="p">New Plan</Text>
                      </PlanLabel>
                      <PlanName>
                        <Text type="p">Essentials</Text>
                      </PlanName>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {PlansFeatures.map((feature, index) => (
                    <tr key={`row-${index}`}>
                      <td>
                        <Text type="p">
                          <b>{feature.featureName}</b>
                        </Text>
                        <Text type="p">{feature.description}</Text>
                      </td>
                      <td>
                        <FeatureIcon>
                          {checkIfTrue(feature.publishPro)}
                        </FeatureIcon>
                      </td>
                      <td>
                        <FeatureIcon type="p">
                          {checkIfTrue(feature.essentials)}
                        </FeatureIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </FeaturesTable>
            </TableContainer>

            <ButtonWrapper>
              <Button
                type="primary"
                label="I’m Super Interested!"
                onClick={() => {
                  openModal(MODALS.essentialsPricing, {
                    cta: 'Migrate to OB Modal',
                    ctaButton: 'I’m Super Interested!',
                  });
                }}
              />
            </ButtonWrapper>
          </BottomSection>
        </Holder>
      )}
    </ModalContext.Consumer>
  );
};

export const PlansFeatures = [
  {
    featureName: 'Publishing tools',
    description: 'Auto-schedule posts across multiple networks',
    publishPro: true,
    essentials: true,
  },
  {
    featureName: 'Engagement tools',
    description: 'Get back to your customers without delay',
    publishPro: true,
    essentials: true,
  },
  {
    featureName: 'Comprehensive analytics',
    description: 'Construct and schedule posts across networks',
    publishPro: false,
    essentials: true,
  },
  {
    featureName: 'Campaign analytics',
    description: 'Take your campaigns further with in-depth analysis',
    publishPro: false,
    essentials: true,
  },
  {
    featureName: 'Customisable reports',
    description: 'Custom-made reports out of your social media analytics',
    publishPro: false,
    essentials: true,
  },
  {
    featureName: 'Best time to post',
    description: 'Know when it’s the right time to post and how',
    publishPro: false,
    essentials: true,
  },
  {
    featureName: 'Advanced Instagram features',
    description: 'Schedule Instagram stories and post to first comment',
    publishPro: false,
    essentials: true,
  },
  {
    featureName: 'Compare organic and boosted posts',
    description: 'See how your paid posts are performing',
    publishPro: false,
    essentials: true,
  },
  {
    featureName: 'Hashtag manager',
    description: 'Don’t get lost with hashtags, manage them with ease',
    publishPro: false,
    essentials: true,
  },
  {
    featureName: 'Per social channel pricing',
    description: 'Pay only for what you use with the social channels you need',
    publishPro: false,
    essentials: true,
  },
];

export default EssentialsPlan;
