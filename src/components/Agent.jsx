import { useEffect, useState, useRef } from "react";
import { Tilt } from "./motion-ui/Tilt";
import { Spotlight } from "./motion-ui/Spotlight";

import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";
import PhoneCallUI from "./components/PhoneCallUI";

export default function App() {
  const vapiRef = useRef(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } =
    usePublicKeyInvalid();

  useEffect(() => {
    vapiRef.current = new Vapi("e636c620-574c-409f-9e53-e38ca5b2b085");
    const vapi = vapiRef.current;

    const setupVapiListeners = () => {
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
    };

    setupVapiListeners();

    return () => {
      // Cleanup listeners if needed
      vapi.removeAllListeners();
    };
  }, [setShowPublicKeyInvalidMessage]);

  const handleAnswer = async () => {
    try {
      setConnecting(true);
      await vapiRef.current?.start(assistantOptions);
    } catch (error) {
      console.error('Failed to start call:', error);
      setConnecting(false);
      setShowPublicKeyInvalidMessage(true);
    }
  };

  const handleReject = () => {
    setConnecting(false);
  };

  const endCall = () => {
    try {
      vapiRef.current?.stop();
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  return (
    <Tilt 
      rotationFactor={4}
      isRevese
      style={{ transformOrigin: 'center center' }}
      springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
      className="group relative rounded-3xl"
    >
      <Spotlight 
        className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
        size={248}
        springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
      />
      <div className="w-[300px] min-h-[500px]  bg-gray-100 dark:bg-gray-800 p-4 shadow-xl">
        {!connected ? (
          <PhoneCallUI 
            onAnswer={handleAnswer}
            onReject={handleReject}
            isConnecting={connecting}
          />
        ) : (
          <ActiveCallDetail
            assistantIsSpeaking={assistantIsSpeaking}
            onEndCallClick={endCall}
          />
        )}
      </div>
    </Tilt>
  );
};

const assistantOptions = {
  name: "Bright Future Real Estate Front Desk",
  firstMessage:
    " Hey ! This is Sara from Bright Future Real Estate. How's your day going so far?",
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

`,
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






