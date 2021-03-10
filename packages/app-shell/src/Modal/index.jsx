import React, { useState, useEffect } from 'react';
import { MODALS } from '../hooks/useModal';
import SimpleModal from '@bufferapp/ui/SimpleModal';
import PaymentMethod from '../PaymentMethod';
import PlanSelector from '../PlanSelector';
import StartTrial from '../StartTrial';
import Confirmation from '../Confirmation';

const ModalContent = ({ modal }) => {
  switch (modal) {
    case MODALS.paymentMethod:
      return (<PaymentMethod />);
    case MODALS.planSelector:
      return (<PlanSelector />);
    case MODALS.success:
      return (<Confirmation />);
    case MODALS.startTrial:
      return (<StartTrial />);
    default:
      return null;
  }
}

const Modal = ({ modal, openModal }) => {
  const [hasModal, setHasModal] = useState(!!modal);

  useEffect(() => {
    setHasModal(!!modal);
  }, [modal]);

  return (<>
    {hasModal && <SimpleModal closeAction={() => {
      openModal(null);
    }}>
      <ModalContent modal={modal} />
    </SimpleModal>}
  </>)
}

export default Modal;
