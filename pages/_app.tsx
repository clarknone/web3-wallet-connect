import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme";

function getLibrary(provider: any) {
  return new Web3(provider);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ThemeProvider>
  );
}
