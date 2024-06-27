"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebase-config";
import MeetingType from "./meeting-type/page";
import Loader from "@/app/_components/Loader";
const Dashboard = () => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const isBusinessRegistered = async () => {
      const docRef = doc(db, "Business", user.email);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (!docSnap.exists()) {
        router.replace("/create-business");
      }
    };
    if (user) {
      isBusinessRegistered();
    }
  }, [user, router]);

  if (loading) {
    return <Loader />;
  }

  return <MeetingType />;
};
export default Dashboard;
