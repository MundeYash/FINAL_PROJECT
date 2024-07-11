"use client";

import { useState } from "react";

import Dashboard from "../../../components/dashBoard/AdminDashboardForm";
import MainAdminDashboard from "../../../components/dashBoard/MainAdminDashboard";


import { buttonVariants } from "../../../components/ui/button";

export default function AdminDashboard() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <MainAdminDashboard />
    </>
  );
}
