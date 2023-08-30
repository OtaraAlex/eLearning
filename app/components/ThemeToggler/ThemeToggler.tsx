"use client";

import React from "react";
import { IconButton, Typography } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useMediaQuery } from "@mui/material";
import scss from "./ThemeToggler.module.scss";

export type ThemeToggleButtonProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
    currentMode: "light" | "dark"; // Prop for the current mode
    showLabel?: boolean;
  };

  const ThemeToggler = (props: ThemeToggleButtonProps) => {
    const mobileCheck = useMediaQuery("(min-width: 500px)");
    const { ColorModeContext, currentMode, showLabel = false } = props;
    const colorMode = React.useContext(ColorModeContext);

    return (
        <>
            {mobileCheck && showLabel && <Typography>{currentMode}</Typography>}
            <IconButton
                className={scss[currentMode]}
                sx={{ mr: 2 }}
                title={currentMode + " mode"} // Use currentMode for title
                aria-label={currentMode + " mode button"}
                onClick={colorMode?.toggleColorMode}
            >
                {currentMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </>
    )
  }

export default ThemeToggler;