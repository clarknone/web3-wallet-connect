import { Box, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

export default function DisconnectDisplay() {
  const { error } = useWeb3React();
  return (
    <Box>
      <Typography> No connected wallet </Typography>
      <Typography> {error?.message} </Typography>
    </Box>
  );
}
