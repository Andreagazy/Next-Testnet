"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/components/head-foot/Footer";
import Header from "@/components/head-foot/Header";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Header />

			<main className="flex-1 flex flex-col items-center justify-start py-10 px-4">
				<div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mb-10 mt-16">
					<div className="md:w-1/2 mb-6 md:mb-0">
						<h2 className="text-3xl font-bold mb-4 text-gray-800">
							A Modern App Interface for Interacting with Smart Contracts
						</h2>
						<p className="text-sm text-gray-600">
							Explore, test, and interact with smart contracts on the testnet. Add your own
							contracts or simulate sending ETH with a simple UI.
						</p>
					</div>
					<div className="md:w-1/2 flex justify-center">
						<Image
							src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Banner"
							width={400}
							height={250}
							className="rounded-md shadow"
						/>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
