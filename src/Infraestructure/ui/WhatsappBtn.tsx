import React from "react";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface WhatsappButtonProps {
  phoneNumber: string;
  message?: string;
  position?: "bottom-left" | "bottom-right";
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({
  phoneNumber,
  message = "",
  position = "bottom-right",
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const sxPosition = {
    position: "fixed",
    bottom: 16,
    right: position === "bottom-right" ? 16 : "auto",
    left: position === "bottom-left" ? 16 : "auto",
    zIndex: 1300,
  };

  return (
    <Tooltip title="Enviar mensaje por WhatsApp">
      <Fab
        color="success"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={sxPosition}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  );
};

export default WhatsappButton;
