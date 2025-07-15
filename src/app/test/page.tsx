"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";
import Header from "@/components/head-foot/Header";
import Footer from "@/components/head-foot/Footer";

const initialContracts = [
    { id: 1, name: "Token ERC20" },
    { id: 2, name: "NFT ERC721" },
    { id: 3, name: "Voting Contract" },
];

export default function TestPage() {
    const [smartContracts, setSmartContracts] = useState(initialContracts);
    const [selected, setSelected] = useState<number | null>(null);
    const [address, setAddress] = useState("");
    const [value, setValue] = useState("");
    const [addingNew, setAddingNew] = useState(false);
    const [newContractName, setNewContractName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
            `Smart Contract: ${smartContracts.find((c) => c.id === selected)?.name
            }\nAddress: ${address}\nValue: ${value}`
        );
        setSelected(null);
        setAddress("");
        setValue("");
    };

    const handleAddContract = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newContractName) return;
        const newId = smartContracts.length + 1;
        setSmartContracts([
            ...smartContracts,
            { id: newId, name: newContractName },
        ]);
        setNewContractName("");
        setAddingNew(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-20">
                <div className="flex flex-row justify-center items-start gap-12 w-full max-w-6xl mt-12">
                    {/* Left Side */}
                    <div className="w-1/2 space-y-4">
                        <div className="p-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">List Smart Contract</h2>
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
                                        key={contract.id}
                                        className={`p-4 cursor-pointer border transition-all ${selected === contract.id
                                                ? "border-blue-600 bg-blue-50 shadow"
                                                : "hover:bg-gray-100 border-gray-200"
                                            }`}
                                        onClick={() => {
                                            setSelected(contract.id);
                                            setAddingNew(false);
                                        }}
                                    >
                                        <h3
                                            className={`font-medium text-sm ${selected === contract.id
                                                    ? "text-blue-700"
                                                    : "text-gray-800"
                                                }`}
                                        >
                                            {contract.name}
                                        </h3>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-1/2">
                        <div className="p-2 min-h-[300px] flex items-center justify-center">
                            {addingNew ? (
                                <form
                                    onSubmit={handleAddContract}
                                    className="bg-white border shadow-md rounded-lg p-4 space-y-4 w-full max-w-sm"
                                >
                                    <h2 className="text-md font-bold mb-2 text-center">
                                        Add New Smart Contract
                                    </h2>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Contract Name</label>
                                        <Input
                                            placeholder="e.g. My New Contract"
                                            value={newContractName}
                                            onChange={(e) => setNewContractName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-green-600 text-white">
                                        Add Contract
                                    </Button>
                                </form>
                            ) : !selected ? (
                                <div className="flex flex-col items-center">
                                    <Image
                                        src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                                        {" "}
                                        {smartContracts.find((c) => c.id === selected)?.name}
                                    </h2>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Address</label>
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
                                            step="0.001"
                                            min="0.001"
                                            placeholder="e.g. 0.05"
                                            value={value}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Hanya angka dan titik
                                                if (/^\d*\.?\d*$/.test(val)) {
                                                    setValue(val);
                                                }
                                            }}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-blue-600 text-white">
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
