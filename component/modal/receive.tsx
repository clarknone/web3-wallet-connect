import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import QRCode from "qrcode";

interface ReceiveModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RecevieTransactionModal({
  open,
  onClose,
}: ReceiveModalProps) {
  const { library, account } = useWeb3React();

  const [qrUrl, setQrUrl] = useState("");

  const web3 = library as Web3;

  useEffect(() => {
    if (account) {
      QRCode.toDataURL(account, (error, url) => {
        console.log({ url, error });
        if (url) {
          setQrUrl(url);
        }
      });
    }
  }, [account]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Stack
          direction="row"
          alignItems={"center"}
          gap={"1em"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6"> Receive Payment </Typography>
          <Box>
            <IconButton onClick={onClose}>
              {" "}
              <FaTimes />{" "}
            </IconButton>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography> Address: {account} </Typography>

        <Box width={"100%"} height={"200px"} position={"relative"}>
          <Image
            src={qrUrl}
            fill
            style={{ objectFit: "contain" }}
            alt="qrcode"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
