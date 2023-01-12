import { Box, Button, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Web3 from "web3";
import useModalHook from "../../hook/useModal";
import RecevieTransactionModal from "../modal/receive";
import SendTransactionModal from "../modal/send";

export default function ConnectedDisplay() {
  const [balance, setBalance] = useState("");

  const { library, account } = useWeb3React();

  const web3Library = library as Web3;

  useEffect(() => {
    if (account) {
      web3Library.eth
        .getBalance(account)
        .then((resp) => {
          setBalance(web3Library.utils.fromWei(resp || ""));
        })
        .catch((e) => {
          setBalance(e.message);
        });
    }
  }, [account]);

  const { open: sendModal, toggle: toogleSendModal } = useModalHook();
  const { open: receiveModal, toggle: toogleReceiveModal } = useModalHook();
  return (
    <Box>
      <Typography> Balance: {balance} ETH </Typography>
      <Stack
        direction={"row"}
        gap={"2em"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Button
          variant="contained"
          disableElevation
          onClick={toogleSendModal}
          size="small"
        >
          Send
        </Button>
        <Button
          variant="contained"
          disableElevation
          size="small"
          color="secondary"
          onClick={toogleReceiveModal}
        >
          Receive
        </Button>
      </Stack>

      <SendTransactionModal open={sendModal} onClose={toogleSendModal} />
      <RecevieTransactionModal
        open={receiveModal}
        onClose={toogleReceiveModal}
      />
    </Box>
  );
}
