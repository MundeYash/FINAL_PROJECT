"use client";

import { useState } from "react";

import EmployeeForm from "../../../components/form/EmployeeForm";

import { buttonVariants } from "../../../components/ui/button";

export default function OperatorBatchEntry() {
  const [mode, setMode] = useState(0);

  return (
    <>
      <EmployeeForm />
    </>
  );
}
