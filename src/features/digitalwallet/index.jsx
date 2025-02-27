import React, { useState } from "react";
import { Wallet } from "../digitalwallet/components/wallet";

export default function DigitalWalletPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Digital Document Wallet</h1>
        <p className="text-gray-500 mb-8">
          Securely store and manage your important documents
        </p>
        <Wallet />
      </div>
    </main>
  );
}
