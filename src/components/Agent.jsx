import { useEffect, useState, useRef } from "react";
import { Tilt } from "./motion-ui/Tilt";
import { Spotlight } from "./motion-ui/Spotlight";

import ActiveCallDetail from "./components/ActiveCallDetail";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";
import PhoneCallUI from "./components/PhoneCallUI";
import { InView } from "./motion-ui/in-view";

export default function App() {
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
      // Various assistant messages can come back (like function calls, transcripts, etc)
      vapi.on("message", (message) => {
        console.log(message);
        if (message.type === "tool-calls") {
          const toolCall = message.toolCalls[0];
          if (toolCall.function.name === "storeLead") {
            const args = toolCall.function.arguments;
            const action = args.isBuyer ? "buy" : "sell";
            setCurrentMessage(`You want to ${action} ${args.Property}`);
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
      await vapiRef.current?.start("7d85d053-4f81-4195-b467-faf6fe32445e");
    } catch (error) {
      console.error("Failed to start call:", error);
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
      console.error("Failed to end call:", error);
    }
  };

  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      viewOptions={{ margin: "0px 0px -200px 0px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div>
        <Tilt
          rotationFactor={4}
          isRevese
          style={{ transformOrigin: "center center" }}
          springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
          className="group relative rounded-3xl"
        >
          <Spotlight
            className="z-10 from-white/50 via-white/20 to-white/10 blur-2xl"
            size={248}
            springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }}
          />
          <div className="w-[300px] min-h-[500px]  bg-gray-100 dark:bg-gray-800 p-4 shadow-xl">
            <PhoneCallUI
              onAnswer={handleAnswer}
              onReject={handleReject}
              isConnecting={connecting}
              connected={connected}
              assistantIsSpeaking={assistantIsSpeaking}
              onEndCallClick={endCall}
            />
          </div>
        </Tilt>
        <div
          className={`mt-4 p-2 font-light w-[300px] ${
            currentMessage ? "text-green-600 dark:text-green-400" : ""
          }`}
        >
          <span className="font-bold"> Result: </span>{" "}
          {currentMessage ||
            "Nothing yet... tell the assistant about the property that you want to sell or buy."}
        </div>
      </div>
    </InView>
  );
}

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
