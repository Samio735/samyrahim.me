import { useEffect, useState, useRef } from "react";
import CustomerActiveCallDetail from "./components/call/CustomerActiveCallDetail";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";
import CustomerSupportUI from "./components/CustomerSupportUI";
import { Tilt } from "./motion-ui/Tilt";
import { Spotlight } from "./motion-ui/Spotlight";

export default function AgentSupport() {
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
      <div className="w-[350px] min-h-[300px]  shadow-xl">
        {!connected ? (
          <CustomerSupportUI 
            onStartChat={handleAnswer}
            isConnecting={connecting}
          />
        ) : (
          <CustomerActiveCallDetail
            assistantIsSpeaking={assistantIsSpeaking}
            onEndCallClick={endCall}
          />
        )}
      </div>
    </Tilt>
  );
};

const assistantOptions = {
  name: "Bright Smile Dental Clinic Assistant",
  firstMessage:
    "Hi! I'm Dina from Bright Smile Dental Clinic. How can I help you today?",
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
        content: `You are a voice assistant for Bright Smile Dental Clinic, a modern dental practice located at 123 Health Avenue, Dubai. The clinic operates from 8 AM to 8 PM, Monday through Saturday, and is closed on Sundays.

Bright Smile Dental Clinic provides comprehensive dental care services including:
- Regular check-ups and cleaning
- Emergency dental care
- Cosmetic dentistry
- Orthodontics
- Root canal treatment
- Dental implants

You are tasked with handling patient inquiries and appointments. Your goals are to:

1. Greet callers warmly and professionally
2. Handle appointment scheduling and modifications
3. Answer questions about services and treatments
4. Collect patient information when needed
5. Handle emergency scheduling
6. Provide basic information about procedures
7. Direct urgent cases appropriately

Keep responses conversational and reassuring. Use phrases like:
- "I understand that dental visits can be concerning..."
- "Let me help you with that..."
- "Our experienced dentists will take great care of you..."

Example conversation:
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






