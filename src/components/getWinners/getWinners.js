import { useState } from "react";
import "./getWinners.css";
import {
    getWinners
} from "../../utils/contract.js";

export default function Winners({ walletAddress, setStatus }) {
    const [winners, setWinners] = useState([]);

    const onGetWinnersPressed = async () => {
        // check if Metamask is installed and if a wallet is connected
        if (!window.ethereum || !walletAddress) {
            setStatus("💡 Connect your Metamask wallet to play with the lottery.")
        } else {
            const { winners, status } = await getWinners(walletAddress);
            setWinners(winners);
            setStatus(status);
        }
    };

    return (
        <section id='winners' class='christmas-lottery-comp'>
            <div class="subtitle"> Winners:
                {winners.map((winner, index) => (
                    <div key={index}>
                        <p>Name: {winner.firstname} </p>
                        <p>Surname: {winner.lastname}</p>
                        <p>Student ID: {winner.studentID}</p>
                        <hr />
                    </div>
                ))}
            </div>
            <button type="text" class="submit" onClick={onGetWinnersPressed}>
                Get Winners
            </button>
        </section>
    );
}