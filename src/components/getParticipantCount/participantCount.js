import { useState, useEffect } from "react";
import "./participantCount.css";

import {
    getParticipantCount
} from "../../utils/contract.js";

export default function ParticipantCount({ walletAddress, setStatus }) {
    const [participantCount, setParticipantCount] = useState("..."); // initial state for participant count

    const onGetParticipantsPressed = async () => {
        // check if Metamask is installed and if a wallet is connected
        if (window.ethereum && walletAddress) {
            const {count, status} = await getParticipantCount(walletAddress);
            if (status) setStatus(status);
            setParticipantCount(count);
        }

    };

    useEffect(() => {
        onGetParticipantsPressed();
    }, [onGetParticipantsPressed]);

    return (
        <section id='participantCount' class='christmas-lottery-comp'>
            <div class="subtitle">Number of participants: {participantCount}</div>
        </section>
    )
}