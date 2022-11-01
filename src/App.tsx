import React, { useState } from "react";
import AddressModal from "./AddressModal";
import Grid2 from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";

interface DaumAddress {
  zonecode: string;
  address: string;
}

interface AddressForm {
  zoneCode: string;
  address: string;
  addressDetail: string;
}

function App() {
  // ---------------------------------------------------------------------------
  // state
  // ---------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // react hook form
  // ---------------------------------------------------------------------------
  const { setValue, control, setFocus } = useForm<AddressForm>({
    defaultValues: {
      zoneCode: "",
      address: "",
      addressDetail: ""
    }
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
    // console.log(data);
    setValue("zoneCode", data.zonecode);
    setValue("address", data.address);

    // 위에서 state 가 갱신되면서 포커싱 한 것도 사라짐
    // 이를 방지하기 위해 타임아웃을 거는 방법 말곤 못찾겠음
    setTimeout(() => setFocus("addressDetail"), 500);
  };

  return (
    <form>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 container md={12}>
          <Grid2 md={4}>
            <Controller
              name={"zoneCode"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="우편번호"
                  fullWidth
                  value={value}
                  onChange={onChange}
                />
              )}
            ></Controller>
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
            <Controller
              name="address"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="주소"
                  fullWidth
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid2>
        </Grid2>

        <Grid2 container md={12}>
          <Grid2 md={4}>
            <Controller
              name={"addressDetail"}
              control={control}
              render={({ field: { name, onChange, value, ref } }) => (
                <TextField
                  label="상세주소"
                  fullWidth
                  value={value}
                  name={name}
                  onChange={onChange}
                  inputRef={ref}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </Grid2>
      <AddressModal
        isOpenModalProp={isOpen}
        closeModalFnPorp={closeChargeModalHandler}
        setAddressDataFnProp={addressChangeHandler}
      />
    </form>
  );
}

export default App;
