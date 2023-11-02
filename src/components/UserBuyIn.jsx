/* eslint-disable react/prop-types */
import  { useState } from "react";
import { buyTicket } from "../api/scholarship";
import { useNotification } from "../hooks";
import BuyInForm from "../form/BuyInForm";
import ModalContainer from "./ModalContainer";


export default function UserBuyIn({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message,  wallet } = await buyTicket(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(wallet);
    updateNotification("success", message);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <BuyInForm
        onSubmit={!busy ? handleSubmit : null}
        title="Buy Into Pot"
        btnTitle="Buy In"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
