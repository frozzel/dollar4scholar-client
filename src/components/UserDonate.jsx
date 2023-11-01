import React, { useState } from "react";
import { donateToPot } from "../api/scholarship";
import { useNotification } from "../hooks";
import DonateForm from "../form/DonateForm";
import ModalContainer from "./ModalContainer";


export default function UserDonate({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message,  wallet, contributions } = await donateToPot(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(wallet, contributions);
    updateNotification("success", message);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <DonateForm
        onSubmit={!busy ? handleSubmit : null}
        title="Pot Donation"
        btnTitle="Donate"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
