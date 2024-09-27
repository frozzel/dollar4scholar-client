import  { useState } from "react";
import { updateUserWallet } from "../api/user";
import { useNotification } from "../hooks";
import WalletForm from "../form/DonarWalletForm";
import ModalContainer from "./ModalContainer";

export default function DonarWallet({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();
  console.log(initialState);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, wallet } = await updateUserWallet(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(wallet);
    updateNotification("success", "User wallet updated successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
    <WalletForm
      onSubmit={!busy ? handleSubmit : null}
      title="Current Wallet "
      btnTitle="Add Funds"
      busy={busy}
      initialState={initialState}
    />
  </ModalContainer>
  );
}
