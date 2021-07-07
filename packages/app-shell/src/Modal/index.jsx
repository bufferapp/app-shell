import React, { useState, useEffect } from 'react';

import { getCookie } from '../utils/cookies'
import { MODALS } from '../hooks/useModal';
import { useUser } from '../context/User';
import SimpleModal from '@bufferapp/ui/SimpleModal';
import PaymentMethod from '../PaymentMethod';
import PlanSelector from '../PlanSelector';
import StartTrial from '../StartTrial';
import Confirmation from '../Confirmation';
import TrialExpired from '../TrialExpired';


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
    const hasDismissedTrialModal = getCookie({ key: 'trialOverDismissed' })
    const isAwaitingUserAction = user?.currentOrganization?.billing?.subscription?.trial?.isAwaitingUserAction || false;
    if (!hasDismissedTrialModal && isAwaitingUserAction) {
      openModal(MODALS.trialExpired)
    }
  }, []);

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
