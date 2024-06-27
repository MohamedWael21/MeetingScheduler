"use client";
import { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import Loader from "@/app/_components/Loader";

const SharedMeetingEvent = ({ params: { business, meetingEventId } }) => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMeetingBusinessAndEventDetails = async () => {
      try {
        const q = query(
          collection(db, "Business"),
          where("businessName", "==", decodeURI(business))
        );
        const docsSnap = await getDocs(q);
        docsSnap.forEach((doc) => {
          setBusinessInfo(doc.data());
        });

        const docRef = doc(db, "MeetingEvent", meetingEventId);
        const result = await getDoc(docRef);
        setEventInfo({ ...result.data(), id: result.id });
      } catch (error) {
        console.error("Error fetching business or event details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMeetingBusinessAndEventDetails();
  }, [business, meetingEventId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <MeetingTimeDateSelection
      eventInfo={eventInfo}
      businessInfo={businessInfo}
    />
  );
};

export default SharedMeetingEvent;
