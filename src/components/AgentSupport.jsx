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
  const [currentMessage, setCurrentMessage] = useState("");

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

      vapi.on("message", (message) => {
        console.log(message);
        if (message.type === "tool-calls") {
          const toolCall = message.toolCalls[0];
          if (toolCall.function.name === "bookSlot") {
            const args = JSON.parse(toolCall.function.arguments);
            const date = new Date(args.time).toLocaleString();
            setCurrentMessage(
              `Appointment booked for ${args.LeadName} on ${date}. Details: ${args.description}`
            );
          }
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
      await vapiRef.current?.start("3281a528-842a-40df-87d3-6895ed9c4e57");
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
    <div>
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
          <>
            <CustomerActiveCallDetail
              assistantIsSpeaking={assistantIsSpeaking}
              onEndCallClick={endCall}
            />
          
          </>
        )}
      </div>
    </Tilt>
      <div className={`mt-4 p-2 font-light ${currentMessage ? 'text-green-600 dark:text-green-400' : ''}`}>
              <span className="font-bold">Result: </span> 
              {currentMessage || "No appointment booked yet... "}
            </div>
            </div>
  );
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






