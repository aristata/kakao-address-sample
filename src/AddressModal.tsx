import DaumPostcodeEmbed from "react-daum-postcode";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
interface AddressModalProps {
  isOpenModalProp: boolean;
  closeModalFnPorp: (
    event: object,
    reason: "backdropClick" | "escapeKeyDown" | "cancelButtonClick"
  ) => void;
  setAddressDataFnProp: (data: any) => void;
}
const AddressModal = ({
  isOpenModalProp,
  closeModalFnPorp,
  setAddressDataFnProp
}: AddressModalProps) => {
  const handler = {
    selectAddress: (data: any) => {
      setAddressDataFnProp(data);
      closeModalFnPorp({}, "cancelButtonClick");
    }
  };

  return (
    <Dialog
      open={isOpenModalProp}
      onClose={closeModalFnPorp}
      maxWidth={"lg"}
      fullWidth
    >
      <DialogTitle>주소 검색</DialogTitle>
      <DialogContent>
        <DaumPostcodeEmbed
          autoClose={true}
          onComplete={handler.selectAddress}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
