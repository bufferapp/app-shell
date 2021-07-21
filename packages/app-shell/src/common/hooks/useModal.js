import { useState, useEffect, useCallback } from 'react';

import eventDispatcher from './utils/eventDispatcher';

export const MODALS = {
  paymentMethod: 'paymentMethod',
  planSelector: 'planSelector',
  success: 'success',
  startTrial: 'startTrial',
  paidMigration: 'paidMigration',
  essentialsPlan: 'essentialsPlan',
  essentialsPricing: 'essentialsPricing',
  upgradeSuccess: 'upgradeSuccess',
};

export const EVENT_KEY = 'appshell__modal_event';

export const ACTIONS = {
  openModal(modalKey, modalData = null) {
    eventDispatcher(EVENT_KEY, { modal: modalKey, data: modalData });
  },
};

function useModal() {
  const [modal, setModal] = useState(null);
  const [data, setData] = useState(null);

  const openModal = useCallback((modalKey, modalData = null) => {
    const matchingModal = Object.keys(MODALS).find((k) => k === modalKey);
    if (matchingModal) {
      setModal(matchingModal);
      if (modalData) {
        setData(modalData);
      }
    } else {
      setModal(null);
    }
  }, []);

  // Open Modal from url matching
  useEffect(() => {
    const { hash } = window.location;
    const matchingModal = Object.keys(MODALS).find(
      (k) => k === hash.replace('#', '')
    );
    if (matchingModal) {
      window.location.hash = '';
      setModal(matchingModal);
    }
  }, []);

  // Open modal from events
  function handleOpenModal({ detail }) {
    const { modal: modalKey, data: modalData } = detail;
    openModal(modalKey, modalData);
  }

  useEffect(() => {
    window.addEventListener(EVENT_KEY, handleOpenModal);

    return function cleanup() {
      window.removeEventListener(EVENT_KEY, handleOpenModal);
    };
  }, []);

  return {
    data,
    modal,
    openModal,
  };
}

export default useModal;
