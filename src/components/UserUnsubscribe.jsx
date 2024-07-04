/* eslint-disable react/prop-types */
import  { useState } from "react";
import { cancelSubscription } from "../api/scholarship";
import { useNotification } from "../hooks";
import CancelForm from "../form/CancelSubForm";
import ModalContainer from "./ModalContainer";


export default function UserBuyIn({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async () => {
    
    setBusy(true);
    const { error, message } = await cancelSubscription(initialState.id, initialState.subscriptionId);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(false);
    updateNotification("success", message);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <CancelForm
        onSubmit={!busy ? handleSubmit : null}
        title="Cancel Subscription"
        btnTitle="Cancel Subscription"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
