"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BreadcrumbNav = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const pathname = window.location.pathname;

  if (pathname === "/") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: "16px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => router.back()}
        sx={{
          backgroundColor: "#fff",
          color: "#5F6368",
          borderRadius: "50%",
          padding: "12px",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#f8f9fa",
            transform: "scale(1.1)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <ArrowBackIcon
          sx={{
            fontSize: "1.5rem",
          }}
        />
      </IconButton>
    </div>
  );
};

export default BreadcrumbNav;
