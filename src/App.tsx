import React, { useState } from "react";
import AddressModal from "./AddressModal";
import Grid2 from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface DaumAddress {
  zonecode: string;
  address: string;
  addressDetail?: string;
}

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<DaumAddress>({
    zonecode: "",
    address: "",
    addressDetail: ""
  });

  const openButtonClickHandler = () => {
    setIsOpen(true);
  };

  const closeChargeModalHandler = (
    event: object,
    reason: "backdropClick" | "escapeKeyDown" | "cancelButtonClick"
  ) => {
    if (reason === "escapeKeyDown" || reason === "cancelButtonClick") {
      setIsOpen((prev) => false);
    } else {
      // console.log("모달 종료 이벤트 호출됨. 이유 = ", reason);
    }
  };

  const addressChangeHandler = (data: DaumAddress) => {
    console.log("야호");
    console.log(data);

    setAddress((prev) => ({
      zonecode: data.zonecode,
      address: data.address
    }));
  };
  return (
    <div>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 container md={12}>
          <Grid2 md={4}>
            <TextField label="우편번호" fullWidth>
              {address.zonecode}
            </TextField>
          </Grid2>
          <Grid2 md={2}>
            <Button
              variant="outlined"
              size="large"
              onClick={openButtonClickHandler}
            >
              우편번호 찾기
            </Button>
          </Grid2>
        </Grid2>
        <Grid2 container md={12}>
          <Grid2 md={4}>
            <TextField label="도로명주소" fullWidth>
              {address.address}
            </TextField>
          </Grid2>
        </Grid2>

        <Grid2 container md={12}>
          <Grid2 md={4}>
            <TextField label="상세주소" fullWidth>
              {address.addressDetail}
            </TextField>
          </Grid2>
        </Grid2>
      </Grid2>
      <AddressModal
        isOpenModalProp={isOpen}
        closeModalFnPorp={closeChargeModalHandler}
        setAddressDataFnProp={addressChangeHandler}
      />
    </div>
  );
}

export default App;
