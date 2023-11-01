import React, { useState } from "react";
import { updateDonor } from "../api/user";
import { useNotification } from "../hooks";
import UserFormDonor from "../form/UserFormDonor";
import ModalContainer from "./ModalContainer";


export default function UpdateActor({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateDonor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(actor);
    updateNotification("success", "User updated successfully.");
    onClose();
  };
  

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <UserFormDonor
        onSubmit={!busy ? handleSubmit : null}
        title="Update Donor"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}
