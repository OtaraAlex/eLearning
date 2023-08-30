"use client";
import { Metadata } from "next";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "@/app/components/Header/Header";
import useUserData from "@/app/hooks/useUserData";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";
import { CssBaseline } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata: Metadata = {
    title: "Enlightify",
    description: "Courses for the curious learner",
    keywords: "e-learning, video courses, software development, programming",
  };

  const ThemeMUIMode = createContext({
    toggleColorMode: () => {},
  });

  const userData = useUserData();

  const storedTheme = localStorage.getItem("theme");
  const initialMode = storedTheme || "dark";
  const [mode, setMode] = useState<"light" | "dark">(
    initialMode as "light" | "dark",
  );

  // Update stored theme when mode changes
  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    [],
  );

  const chosenTheme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeMUIMode.Provider value={colorMode}>
    <html lang="en">
      <head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content={metadata.description as string | undefined}
        />
        <meta
          name="keywords"
          content={metadata.keywords as string | undefined}
        />
        <meta name="author" content="Enlightify" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
        <ThemeProvider theme={createTheme(chosenTheme)}>
          <CssBaseline />
          <body
            style={{
              backgroundColor: chosenTheme?.palette?.background?.default,
              maxWidth: "80rem",
              margin: "auto",
            }}
          >
            <Header
              userData={userData}
              ColorModeContext={ThemeMUIMode}
              currentMode={mode}
              showLabel={false}
            />
            {children}
          </body>
        </ThemeProvider>
    </html>
    </ThemeMUIMode.Provider>
  );
}
