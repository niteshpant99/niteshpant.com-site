"use client";

import React from "react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oops! Something went wrong... maybe try refreshing?</p>
    </div>
  );
}
