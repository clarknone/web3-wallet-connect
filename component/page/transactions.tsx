import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Transaction } from "web3-eth";

interface Log {
  address: string;
  data: string;
  topics: string[];
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  removed: boolean;
}

export default function TransactionDisplay() {
  const { library, account } = useWeb3React();
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const web3Library: Web3 = library;

  useEffect(() => {
    web3Library.eth
      .getBlock("latest", true)
      .then((resp) => {
        setData(resp.transactions);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [account]);

  return (
    <TableContainer>
      <Typography> Transactions </Typography>

      <Table>
        <TableHead>
          <TableCell> TxIndex </TableCell>
          <TableCell> TxHash </TableCell>
          <TableCell> Amount </TableCell>
          <TableCell> To </TableCell>
        </TableHead>

        <TableBody>
          {data.length ? (
            <>
              {data.map((row) => (
                <TableRow>
                  <TableCell> {row.transactionIndex} </TableCell>
                  <TableCell> {row.hash.substring(0,16)}... </TableCell>
                  <TableCell>{web3Library.utils.fromWei(row.value)} ETH</TableCell>
                  <TableCell> {row.to} </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={4}>{error || "No Data Available"}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
