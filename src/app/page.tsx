"use client";
import React from "react";
import { useEffect } from "react";
import { Account } from "../components/Account";
import { Balance } from "../components/Balance";
import { BlockNumber } from "../components/BlockNumber";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
// import { NetworkSwitcher } from "../components/NetworkSwitcher";
// import { ReadContract } from "../components/ReadContract";
// import { ReadContracts } from "../components/ReadContracts";
// import { ReadContractsInfinite } from "../components/ReadContractsInfinite";
// import { SendTransaction } from "../components/SendTransaction";
// import { SendTransactionPrepared } from "../components/SendTransactionPrepared";
// import { SignMessage } from "../components/SignMessage";
// import { SignTypedData } from "../components/SignTypedData";
// import { Token } from "../components/Token";
// import { WatchContractEvents } from "../components/WatchContractEvents";
// import { WatchPendingTransactions } from "../components/WatchPendingTransactions";
// import { WriteContract } from "../components/WriteContract";
// import { WriteContractPrepared } from "../components/WriteContractPrepared";
import {
  FusionSDK,
  NetworkEnum,
  QuoteParams,
  Web3ProviderConnector,
  PrivateKeyProviderConnector,
} from "@1inch/fusion-sdk";
import { useContractWrite } from "wagmi";
import { erc20ABI } from "wagmi";
import { ethers } from "ethers";
import { useEthersSigner } from "./utils";
import { usePublicClient } from "wagmi";
import { parseEther } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";
import { useEthersProvider } from "./utils1";
import Web3 from "web3";
export default function Page() {
  const publicClient = usePublicClient();
  const tokenAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; // usdc
  const spenderAddress = "0x1111111254EEB25477B68fb85Ed929f73A960582";
  // Replace with the spender's address
  const bigIntValue = parseEther("0.001"); // Replace with the amount to approve
  const amountToApprove = BigInt(bigIntValue.toString());
  const { address, isConnecting, isDisconnected } = useAccount();

  // const signer = useEthersSigner();
  const provider = useEthersProvider();

  // const sdk = new FusionSDK({
  //   url: "https://fusion.1inch.io",
  //   network: NetworkEnum.ETHEREUM,
  //   // blockchainProvider: new Web3ProviderConnector(provider as any),
  // });
  // const params = {
  //   fromTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
  //   toTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  //   amount: "1000000000000000000000",
  // };

  // const getQuote = async () => {
  //   const quote = await sdk.getQuote(params);
  //   console.log(quote);
  // };

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: `0x${"7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"}`,
    abi: erc20ABI,
    functionName: "approve",
  });

  const swap = async () => {
    console.log(address);
    if (!provider) return;
    console.log(provider);

    const sdk = new FusionSDK({
      url: "https://fusion.1inch.io",
      network: NetworkEnum.POLYGON,
      blockchainProvider: new Web3ProviderConnector(
        new Web3(web3.currentProvider)
      ),
    });

    console.log(sdk);
    sdk
      .placeOrder({
        fromTokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        toTokenAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        amount: "1000000000000000",
        walletAddress: address as any,
      })
      .then(console.log);
  };
  // ubf...
  //Accio.NFT
  return (
    <div>
      <h1>wagmi + Next.js</h1>
      <Connect />
      <Connected>
        <button
          onClick={() => {
            console.log(amountToApprove);
            write({
              args: [
                `0x${"1111111254EEB25477B68fb85Ed929f73A960582"}`,
                amountToApprove,
              ],
            });
          }}
        >
          Approve
        </button>
        <button
          onClick={() => {
            swap();
          }}
        >
          swap
        </button>
      </Connected>
    </div>
  );
}

{
  /* <hr />
<h2>Network</h2>
<NetworkSwitcher />
<br />
<hr />
<h2>Account</h2>
<Account />
<br />
<hr />
<h2>Balance</h2>
<Balance />
<br />
<hr />
<h2>Block Number</h2>
<BlockNumber />
<br />
<hr />
<h2>Read Contract</h2>
<ReadContract />
<br />
<hr />
<h2>Read Contracts</h2>
<ReadContracts />
<br />
<hr />
<h2>Read Contracts Infinite</h2>
<ReadContractsInfinite />
<br />
<hr />
<h2>Send Transaction</h2>
<SendTransaction />
<br />
<hr />
<h2>Send Transaction (Prepared)</h2>
<SendTransactionPrepared />
<br />
<hr />
<h2>Sign Message</h2>
<SignMessage />
<br />
<hr />
<h2>Sign Typed Data</h2>
<SignTypedData />
<br />
<hr />
<h2>Token</h2>
<Token />
<br />
<hr />
<h2>Watch Contract Events</h2>
<WatchContractEvents />
<br />
<hr />
<h2>Watch Pending Transactions</h2>
<WatchPendingTransactions />
<br />
<hr />
<h2>Write Contract</h2>
<WriteContract />
<br />
<hr />
<h2>Write Contract (Prepared)</h2>
<WriteContractPrepared /> */
}
