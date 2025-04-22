"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {getAllBinancePairs} from "@/services/binance";

const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY || "";
const secretKey = process.env.NEXT_PUBLIC_BINANCE_SECRET_KEY || "";

export default function Home() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const handleStartScan = async () => {
    setScanning(true);
    setMessage("Scanning all USDT pairs, please wait...");
    try {
      const pairs = await getAllBinancePairs(apiKey, secretKey);
      setResults(pairs);
    } catch (error) {
      setMessage(`Scanning failed: ${(error as Error).message}`);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Binance Futures Scanner</h1>
      <Button onClick={handleStartScan} disabled={scanning}>
        {scanning ? "Scanning..." : "Start Scan"}
      </Button>
      {message && <p className="mt-4">{message}</p>}
      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Scanning Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="mb-2">
                Symbol: {result.symbol}, Volume: {result.volume24h}, Open
                Interest: {result.openInterest}, Spread: {result.spread}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
