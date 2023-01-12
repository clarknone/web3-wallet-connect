import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import DefaultLayout from "../layout";
import { Box, Button, Stack, Typography } from "@mui/material";
import ConnectedDisplay from "../component/page/connected";
import DisconnectDisplay from "../component/page/disconnected";
import TransactionDisplay from "../component/page/transactions";

const injected = new InjectedConnector({
  supportedChainIds: [1, 2, 3, 4, 5, 42, 1337],
});

export default function Home() {
  const { account, active, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log({ ex });
    }
  }
  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log({ ex });
    }
  }
  return (
    <DefaultLayout title="Home Page">
      <Stack p={"1em"} direction={"row"} justifyContent="flex-end">
        {active ? (
          <Stack direction={"row"} alignItems="center" gap="2em">
            <Typography> Address : {account?.substring(0, 10)}... </Typography>
            <Button
              disableElevation
              size="small"
              variant="contained"
              onClick={disconnect}
            >
              Disconnect
            </Button>
          </Stack>
        ) : (
          <Button
            disableElevation
            size="small"
            variant="contained"
            onClick={connect}
          >
            Connect
          </Button>
        )}
      </Stack>
      <Box>
        {active ? (
          <>
            <ConnectedDisplay />
            <TransactionDisplay />
          </>
        ) : (
          <DisconnectDisplay />
        )}
      </Box>
    </DefaultLayout>
  );
}
