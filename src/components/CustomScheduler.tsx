import React, { useState } from "react";
import {
  TextField,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";

interface CustomEditorProps {
  scheduler: any;
  handleConfirm: any;
}

const question: any[] = ["Yes", "No"];
const CustomScheduler: React.FC<CustomEditorProps> = ({
  scheduler,
  handleConfirm,
}) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [isRegister, setIsRegister] = useState<any>({
    register: event?.register || "",
  });
  const [isUnsubscribe, setIsUnsubscribe] = useState<any>({
    unsubscribe: event?.unsubscribe || "",
  });
  const [error, setError] = useState<any>(null);

  const handRegisterleChange = (event: any) => {
    setIsRegister({ ...isRegister, register: event.target.value });
  };
  const handleUnsubscribeChange = (event: any) => {
    setIsUnsubscribe({ ...isUnsubscribe, unsubscribe: event.target.value });
  };

  const handleSubmit = async (action: any) => {
    console.log("isUnsubscribe", isUnsubscribe.unsubscribe);
    handleConfirm(
      event,
      action,
      isRegister.register,
      isUnsubscribe.unsubscribe
    );
    scheduler.close();
  };

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Do you want to Register To Lesson or Unsubscribe?</p>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id='demo-simple-select-label'>
            Want to Register?
          </InputLabel>
          <Select
            value={isRegister.register}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Choose Employee:'
            onChange={handRegisterleChange}
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={2}>No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>
            Want to Unsubscribe?
          </InputLabel>
          <Select
            value={isUnsubscribe.unsubscribe}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Choose Employee:'
            onChange={handleUnsubscribeChange}
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={2}>No</MenuItem>
          </Select>
        </FormControl>
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};

export default CustomScheduler;
