import { React, useEffect, useState } from "react";
import "./walletConnection.css";
import { connectWallet, getCurrentWalletConnected } from "../../utils/wallet.js";
export default function Wallet({ walletAddress, setStatus, setWallet }) {

    useEffect(() => {
        // get the connected wallet
        async function getConnectedWallet() {
            const { address, status } = await getCurrentWalletConnected();
            setWallet(address);
            setStatus(status);
        }
        getConnectedWallet();
        // event listener for changes in the wallet connection
        walletListener();
    }, []);

    // lister for changes in the wallet connection
    function walletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                } else {
                    setWallet("");
                    setStatus("🦊 Connect to Metamask using the \"Connect Wallet\" button.");
                }
            });
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" href={`https://metamask.io/download.html`}>
                        You must install Metamask in your browser.
                    </a>
                </p>
            );
        }
    }

    // show only the first and last 6 characters of the wallet address
    const formatWalletAddress = (address) => {
        return "Connected: " +
            String(address).substring(0, 6) +
            "..." +
            String(address).substring(38);
    }

    const handleWalletConnection = async () => {
        const { status, address } = await connectWallet();
        if (status) setStatus(status);
        setWallet(address);
    };

    return (
        <section id='wallet' class='christmas-lottery-comp'>
            <button type="text" class="submit" onClick={handleWalletConnection}>
                {walletAddress.length > 0 ? formatWalletAddress(walletAddress) : <span>Connect Wallet</span>}
            </button>
        </section >
    )
}