import React, { useState, useEffect } from 'react';
import SimpleModal from '@bufferapp/ui/SimpleModal';
import PaymentMethod from '../PaymentMethod';
import { MODALS } from '../hooks/useModal';
import PlanSelector from '../PlanSelector';

const ModalContent = ({ modal }) => {
  switch (modal) {
    case MODALS.paymentMethod:
      return (<PaymentMethod />);
    case MODALS.planSelector:
      return (<PlanSelector />);
    case MODALS.success:
      return (<div> Success </div>);
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
