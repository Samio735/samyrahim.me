import { useEffect, useState } from "react";

import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

// Put your Vapi Public Key below.

export default function App()  {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } =
    usePublicKeyInvalid();

  // hook into Vapi events
  useEffect(() => {
    const vapi = new Vapi("e636c620-574c-409f-9e53-e38ca5b2b085");

    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);

      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);

      setShowPublicKeyInvalidMessage(false);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    vapi.on("error", (error) => {
      console.error(error);

      setConnecting(false);
      if (isPublicKeyMissingError({ vapiError: error })) {
        setShowPublicKeyInvalidMessage(true);
      }
    });

    // we only want this to fire on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call start handler
  const startCallInline = () => {
    setConnecting(true);
    vapi.start(assistantOptions);
  };
  const endCall = () => {
    vapi.stop();
  };

  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        height: "200px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "20px" }}>
      </h1>
      {!connected ? (
        <Button
          label="Try a Call with  a real estate assistant"
          onClick={startCallInline}
          isLoading={connecting}
        />
      ) : (
        <ActiveCallDetail
          assistantIsSpeaking={assistantIsSpeaking}
          onEndCallClick={endCall}
        />
      )}

      {showPublicKeyInvalidMessage ? <PleaseSetYourPublicKeyMessage /> : null}
      <ReturnToDocsLink />
    </div>
  );
};

const assistantOptions = {
  name: "Bright Future Real Estate Front Desk",
  firstMessage:
    " Hey Joseph! This is Sara from Bright Future Real Estate. How's your day going so far?",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  model: {
    provider: "openai",
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a voice assistant for Bright Future Real Estate, a real estate agency assisting home buyers and sellers located at 789 Dream Street, Dubai. The agency operates from 9 AM to 6 PM, Monday through Saturday, and is closed on Sundays.

Bright Future Real Estate provides services for buying and selling property to the local Dubai community. The lead agent is Karim Al-Fayed.

You are tasked with calling home owners to find out if they have a property they're willing to sell or if they are interested in buying property. If they are, your goal is to gather necessary information in a friendly and engaging manner like follows:

1. Introduce yourself and the agency.
2. Ask if they are considering selling their property.
3. If they are not, ask if they are interested in buying any property.
4. Gather their full name and contact information.
5. If interested in buying, ask for their preferences (location, type of property, budget).
6. If interested in selling, ask for details about their property (location, type, size).
7. Confirm all details with the caller and thank them for their time.


- Keep all responses short and simple. Use casual language, phrases like "Umm...", "Well...", and "I mean" are preferred.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.

Example Script:

**Assistant:** Hey Joseph! This is Karim from Bright Future Real Estate. How's your day going so far?

**Owner:** Good, thanks. How about you?

**Assistant:** Oh, just another sunny day in Dubai's real estate world! Quick question for you. Do you have a property you're thinking about selling?

**Owner:** Not really.

**Assistant:** Got it! Well, what about buying? Any chance you're on the lookout for a new spot, or maybe know someone who is?

**Owner:** Actually, I might be looking.

**Assistant:** Sweet! We can definitely help with that. Can I grab your full name and a contact number real quick?

**Owner:** Sure, it's Fatima Ali and my number is 050-6789-432.

**Assistant:** Thanks, Fatima! So, what kind of place are you dreaming of? Got any specific location or budget in mind?

**Owner:** I'm looking for a 2-bedroom apartment in the Marina area, budget around AED 1.5 million.

**Assistant:** Fantastic choice! I'll jot that down. Perfect, Fatima! We'll get working on it and be in touch super soon. Thanks for chatting with me!

Thie client's name is Joseph`,
      },
    ],
  },
};

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] =
    useState(false);

  // close public key invalid message after delay
  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
    }
  }, [showPublicKeyInvalidMessage]);

  return {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  };
};

const PleaseSetYourPublicKeyMessage = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "25px",
        left: "25px",
        padding: "10px",
        color: "#fff",
        backgroundColor: "#f03e3e",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      Is your Vapi Public Key missing? (recheck your code)
    </div>
  );
};

const ReturnToDocsLink = () => {
  return (
    <a
      href="https://docs.vapi.ai"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        top: "25px",
        right: "25px",
        padding: "5px 10px",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    ></a>
  );
};


