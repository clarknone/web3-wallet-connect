import { Dialog, DialogContent, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormEvent, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SendTransactionModal({
  open,
  onClose,
}: TransactionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { library, account } = useWeb3React();

  const web3 = library as Web3;

  const sendTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.target as { [index: string]: any };
    const data: { from?: string; to?: string; value?: any } = {
      from: account || "",
    };
    data.to = input?.from.value;
    data.value = web3.utils.toWei(input["amount"].value);
    setLoading(true);
    setError("");
    web3.eth
      .sendTransaction({ ...data })
      .then(() => {
        onClose && onClose();
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{minWidth:"400px"}}>
        <form onSubmit={sendTransaction}>
          <Stack gap="1em">
            <TextField name="from" label="Receiver's Address" />
            <TextField
              name="amount"
              label="Amount in Eth"
              type={"number"}
              inputProps={{ step: "any" }}
            />
            <Typography color="error"> {error} </Typography>
            <LoadingButton loading={loading} variant="contained" type="submit">
              Send
            </LoadingButton>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
