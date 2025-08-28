"use client";

import React from "react";

const VisualEditsMessenger: React.FC = () => {
  React.useEffect(() => {
    // Example: Listen for messages from parent window (if in iframe)
    const handleMessage = (event: MessageEvent) => {
      // You can add logic here to handle messages
      if (event.data && event.data.type === "VISUAL_EDIT") {
        // Handle the visual edit message
        console.log("Received visual edit message:", event.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return null; // No UI needed, just a messenger
};

export default VisualEditsMessenger;