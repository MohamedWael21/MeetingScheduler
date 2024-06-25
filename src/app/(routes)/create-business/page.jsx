"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebase-config";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CreateBusiness = () => {
  const [businessName, setBusinessName] = useState("");
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const onCreateBusiness = async () => {
    await setDoc(doc(db, "Business", user.email), {
      businessName: businessName,
      email: user.email,
      userName: `${user.given_name} ${user.family_name}`,
    });
    toast.success("New Business Created!");
    router.replace("/dashboard");
  };
  return (
    <div className="flex flex-col items-center gap-20 my-10 p-14">
      <Image src="/logo.svg" width={200} height={200} alt="logo" />
      <div className="flex flex-col items-center gap-4 max-w3xl">
        <h2 className="text-4xl font-bold">
          What should we call your business?
        </h2>
        <p className="text-slate-500">
          You can always change this later from settings{" "}
        </p>
        <div className="w-full">
          <label className="text-slate-400">Team Name</label>
          <Input
            placeholder="Ex. TubeGuruji"
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName}
          onClick={onCreateBusiness}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
};

export default CreateBusiness;
