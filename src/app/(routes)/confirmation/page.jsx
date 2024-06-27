import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function Confirmation() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-20">
      <CheckCircle className="text-green-500 h-9 w-9" />
      <h2 className="text-3xl font-bold">
        Your meeting scheduled successfully!
      </h2>
      <h2 className="text-lg text-gray-500">Confirmation sent on your email</h2>
      <Link href={"/"}>
        <Button>Thank you</Button>
      </Link>
    </div>
  );
}

export default Confirmation;
