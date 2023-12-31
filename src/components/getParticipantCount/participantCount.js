import { useState, useEffect } from "react";
import "./participantCount.css";

import {
    getParticipantCount
} from "../../utils/contract.js";

export default function ParticipantCount({ walletAddress, setStatus }) {
    const [participantCount, setParticipantCount] = useState(0); // New state for participant count

    const onGetParticipantsPressed = async () => {
        if (!window.ethereum || !walletAddress) {
            setStatus("💡 Connect your Metamask wallet to update the message on the blockchain.")
        } else {
            const count = await getParticipantCount(walletAddress);
            setParticipantCount(count);
        }

    };

    useEffect(() => {
        onGetParticipantsPressed();
    }, [onGetParticipantsPressed]);



    return (
        <section id='participantCount' class='christams-lottery-comp'>
            <div class="subtitle">Number of participants: {participantCount}</div>
        </section>
    )
}