"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Header() {
	const router = useRouter();

	return (
		<header className="w-full px-6 py-4 bg-[#1e293b] text-white shadow flex justify-between items-center">
			<div className="flex items-center gap-2">
				<span className="font-semibold text-sm">TestnetApp</span>
			</div>

			<nav className="space-x-4 text-xs">
				<Link href="/" className="hover:underline">
					Home
				</Link>
				<Link href="/docs" className="hover:underline">
					Docs
				</Link>
				<Link href="/about" className="hover:underline">
					About
				</Link>
			</nav>

			<Button
				size="sm"
				className="text-xs bg-white text-[#1e293b] border border-[#1e293b] hover:bg-[#1e293b] hover:text-white hover:border-white transition-colors"
				onClick={() => router.push("/test")}
			>
				Start Test
			</Button>
		</header>
	);
}
