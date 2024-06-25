"use client";
import { db } from "@/config/firebase-config";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const MeetingEventList = () => {
  const [eventList, setEventList] = useState([]);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const getEventList = async () => {
      const q = query(
        collection(db, "MeetingEvent"),
        where("createdBy", "==", user.email)
      );
      const docsSnapShot = await getDocs(q);
      const eventListTemp = [];
      docsSnapShot.forEach((doc) => {
        eventListTemp.push(doc.data());
      });
      setEventList(eventListTemp);
    };
    if (user) {
      getEventList();
    }
  }, [user]);
  return (
    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3"></div>
  );
};
export default MeetingEventList;
