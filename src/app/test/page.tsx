/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";
import Header from "@/components/head-foot/Header";
import Footer from "@/components/head-foot/Footer";
import api from "@/lib/axios";
import { ethers } from "ethers";

type SmartContract = {
    address: string;
    name: string;
    initialValue: string;
};

export default function TestPage() {
    const [smartContracts, setSmartContracts] = useState<SmartContract[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [address, setAddress] = useState("");
    const [value, setValue] = useState("");
    const [addingNew, setAddingNew] = useState(false);
    const [newContractName, setNewContractName] = useState("");
    const [newInitialValue, setNewInitialValue] = useState(""); // initial value
    const [errorMessage, setErrorMessage] = useState("");
    const [reason, setReason] = useState("");


    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
            const res = await api.get("/api/contract");
            if (Array.isArray(res.data)) {
                const formatted = res.data.map((c: any) => ({
                    address: c.contractAddress,
                    name: c.contractName,
                    initialValue: c.contractBalance
                        ? ethers.formatEther(c.contractBalance.toString())
                        : "0",
                }));
                setSmartContracts(formatted);
            }
        } catch (err) {
            console.error("Failed to fetch contracts", err);
            setErrorMessage("Failed to load contracts. Please check backend connection.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        const selectedContract = smartContracts.find((c) => c.address === selected);
        if (!selectedContract) return;

        try {
            const payload = {
                receiverAddress: address,
                value,
                reason,
            };

            await api.post(`/api/contract/${selected}`, payload);

            alert("Transaction sent successfully!");

            // Reset form
            setSelected(null);
            setAddress("");
            setValue("");
            setReason("");

            await fetchContracts();
        } catch (error: any) {
            const err = error?.response?.data?.message || error?.message || "Failed to send transaction.";
            console.error("Transaction Error:", error);
            setErrorMessage(Array.isArray(err) ? err.join(" ") : err);
        }
    };

    const handleAddContract = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!newContractName) return;

        try {
            const payload = {
                contractName: newContractName,
                initialValue: newInitialValue || "0",
            };

            await api.post("/api/contract", payload);

            setNewContractName("");
            setNewInitialValue("");
            setAddingNew(false);
            fetchContracts();
        } catch (error: any) {
            const err = error?.response?.data?.message || "Failed to add contract.";
            console.error("Add Contract Error:", error);
            setErrorMessage(Array.isArray(err) ? err.join(" ") : err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="flex flex-row justify-center items-start gap-12 w-full max-w-6xl mt-12">
                    {/* List Contracts */}
                    <div className="w-1/2 space-y-4">
                        <div className="p-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold tracking-wide">List Smart Contract</h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setAddingNew(true);
                                        setSelected(null);
                                    }}
                                    className="gap-1"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {smartContracts.map((contract) => (
                                    <Card
                                        key={contract.address}
                                        className={`p-4 cursor-pointer border transition-all duration-200 ${selected === contract.address
                                            ? "border-blue-600 bg-blue-50 shadow"
                                            : "hover:bg-[#1e293bcc] border-gray-200"
                                            }`}
                                        onClick={() => {
                                            setSelected(contract.address);
                                            setAddingNew(false);
                                        }}
                                    >
                                        <h3 className={`font-medium text-sm ${selected === contract.address ? "text-blue-700" : "text-gray-800"}`}>
                                            {contract.name}
                                            <span className="text-xs text-gray-500"> ({contract.initialValue} ETH)</span>
                                        </h3>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="w-1/2">
                        <div className="p-2 min-h-[300px] flex items-center justify-center">
                            {addingNew ? (
                                <form
                                    onSubmit={handleAddContract}
                                    className="bg-white border shadow-md rounded-lg p-4 space-y-4 w-full max-w-sm"
                                >
                                    <h2 className="text-md font-bold mb-2 text-center">Add New Smart Contract</h2>
                                    {errorMessage && (
                                        <div className="text-red-500 text-xs text-center">{errorMessage}</div>
                                    )}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Contract Name</label>
                                        <Input
                                            placeholder="e.g. My New Contract"
                                            value={newContractName}
                                            onChange={(e) => setNewContractName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Initial Value (ETH)</label>
                                        <Input
                                            placeholder="0.1"
                                            type="number"
                                            step="0.00001"
                                            value={newInitialValue}
                                            onChange={(e) => setNewInitialValue(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 text-white hover:bg-green-700"
                                    >
                                        Add Contract
                                    </Button>
                                </form>
                            ) : !selected ? (
                                <div className="flex flex-col items-center">
                                    <Image
                                        src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
                                        alt="Smart Contract Illustration"
                                        width={300}
                                        height={200}
                                        className="rounded-md shadow"
                                    />
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white border shadow-md rounded-lg p-4 space-y-4 w-full max-w-sm"
                                >
                                    <h2 className="text-md font-bold mb-2 text-center">
                                        {smartContracts.find((c) => c.address === selected)?.name}
                                    </h2>
                                    {errorMessage && (
                                        <div className="text-red-500 text-xs text-center">{errorMessage}</div>
                                    )}
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Receiver Address</label>
                                        <Input
                                            placeholder="0x..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Value (ETH)</label>
                                        <Input
                                            type="number"
                                            step="0.00001"
                                            min="0.00001"
                                            placeholder="e.g. 0.05"
                                            value={value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^\d*\.?\d*$/.test(val)) setValue(val);
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Reason</label>
                                        <Input
                                            placeholder="e.g. Payment for service"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Send Transaction
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
