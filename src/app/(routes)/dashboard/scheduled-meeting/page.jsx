"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduledMeetingList from "./_components/ScheduledMeetingList";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { compareAsc } from "date-fns";
import Loader from "@/app/_components/Loader";

const ScheduledMeeting = () => {
  const [meetingList, setMeetingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const getScheduledMeetings = async () => {
      try {
        const q = query(
          collection(db, "ScheduledMeetings"),
          where("businessEmail", "==", user.email)
        );
        const docsSnap = await getDocs(q);
        setMeetingList([]);
        docsSnap.forEach((doc) => {
          setMeetingList((prev) => [...prev, doc.data()]);
        });
      } catch (error) {
        console.error("Error fetching scheduled meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getScheduledMeetings();
    }
  }, [user]);

  const filterMeetingList = (type) => {
    if (type === "upcoming") {
      return meetingList.filter((meeting) => {
        return compareAsc(meeting.selectedDate.toDate(), new Date()) === 1;
      });
    } else {
      return meetingList.filter((meeting) => {
        return compareAsc(meeting.selectedDate.toDate(), new Date()) <= 0;
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Scheduled Meetings</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expired">
          <ScheduledMeetingList meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduledMeeting;
