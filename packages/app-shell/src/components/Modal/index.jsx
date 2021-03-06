import React, { useState, useEffect } from 'react';
import SimpleModal from '@bufferapp/ui/SimpleModal';

import { getCookie } from '../../common/utils/cookies'
import { MODALS } from '../../common/hooks/useModal';
import { useUser } from '../../common/context/User';
import PaymentMethod from './modals/PaymentMethod';
import PlanSelector from './modals/PlanSelector';
import StartTrial from './modals/StartTrial';
import Confirmation from './modals/Confirmation';
import TrialExpired from './modals/TrialExpired';


const ModalContent = ({ modal }) => {
  switch (modal) {
    case MODALS.paymentMethod:
      return <PaymentMethod />;
    case MODALS.planSelector:
      return <PlanSelector />;
    case MODALS.success:
      return <Confirmation />;
    case MODALS.startTrial:
      return <StartTrial />;
    case MODALS.trialExpired:
      return <TrialExpired />;
    default:
      return null;
  }
};

const Modal = ({ modal, openModal }) => {
  const [hasModal, setHasModal] = useState(!!modal);
  const user = useUser()

  useEffect(() => {
    const isAwaitingUserAction = user?.currentOrganization?.billing?.subscription?.trial?.isAwaitingUserAction || false;
    const hasDismissedTrialModal = getCookie({ key: 'trialOverDismissed' })
    if (!hasDismissedTrialModal && isAwaitingUserAction) {
      openModal(MODALS.trialExpired)
    }
  }, [user.loading]);

  useEffect(() => {
    setHasModal(!!modal);
  }, [modal]);

  return (
    <>
      {hasModal && (
        <SimpleModal
          closeAction={() => {
            openModal(null);
          }}
        >
          <ModalContent modal={modal} />
        </SimpleModal>
      )}
    </>
  );
};

export default Modal;
