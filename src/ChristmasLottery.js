import React from "react";
import { useEffect, useState } from "react";
import AddTicketForm from "./components/addTicket/addTicket";
import {
  getParticipantCount,
} from "./utils/contract.js";
import {
  connectWallet,
  getCurrentWalletConnected
} from "./utils/wallet.js";

function SmartContractForm() {

  const [participantCount, setParticipantCount] = useState(0); // New state for participant count

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getConnectedWallet() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    getConnectedWallet();
    addWalletListener();
    
  }, []);

  // lister for changes in the wallet connection
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("🤞🏻 Good Luck!");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const onGetParticipantsPressed = async () => {
    const count = await getParticipantCount(walletAddress);
    setParticipantCount(count);
  };

  const formatWalletAddress = (address) => {
    return "Connected: " +
      String(address).substring(0, 6) +
      "..." +
      String(address).substring(38);
  }

  const handleWalletConnection = async () => {
    const { status, address } = await connectWallet();
    setStatus(status);
    setWallet(address);
  };

  return (
    <div id="container">

      <button id="walletButton" onClick={handleWalletConnection}>
        {walletAddress.length > 0 ? formatWalletAddress(walletAddress) : <span>Connect Wallet</span>}
      </button>

      <AddTicketForm
        walletAddress={walletAddress}
        setStatus={setStatus}
      />

      <div>
        <p>Number of participants: {participantCount}</p>
        <button onClick={onGetParticipantsPressed}>
          Get Participant Count
        </button>
      </div>

      <p id="status">{status}</p>

    </div>
  );
}

export default SmartContractForm;