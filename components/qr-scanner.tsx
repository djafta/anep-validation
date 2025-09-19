"use client"
import { Result, useZxing } from "react-zxing";

export type QRScannerProps = {
  onDecodeResult: (decoded: Result) => void;
};

export default function QRScanner({ onDecodeResult }: QRScannerProps) {
  const { ref } = useZxing({
    onDecodeResult
  });

  return (
    <video ref={ ref } className="w-full h-full aspect-auto object-cover"/>
  );
}