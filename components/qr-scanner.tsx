"use client"
import { useState } from "react";
import { useZxing } from "react-zxing";

export default function QRScanner() {
  const [result, setResult] = useState("");

  const { ref } = useZxing({
    onDecodeResult(decoded) {
      setResult(decoded.getText());
    },
  });

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <video ref={ ref } className="w-full max-w-md rounded-lg shadow"/>
      <p>{ result }</p>
    </div>
  );
}