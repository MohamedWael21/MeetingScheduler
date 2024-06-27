import { CalendarCheck, Clock, MapPin, Timer } from "lucide-react";
import Plunk from "@plunk/node";
import { render } from "@react-email/components";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import { Button } from "@/components/ui/button";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { toast } from "sonner";
import Email from "../../../../../emails";
import { useRouter } from "next/navigation";

const MeetingTimeDateSelection = ({ eventInfo, businessInfo }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [enableTimeSlots, setEnableTimeSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState();
  const [prevBooking, setPrevBooking] = useState();

  const router = useRouter();

  useEffect(() => {
    const createTimeSlot = (interval) => {
      const startTime = 8 * 60; // 8 AM in minutes
      const endTime = 22 * 60; // 10 PM in minutes
      const totalSlots = (endTime - startTime) / interval;
      const slots = Array.from({ length: totalSlots }, (_, i) => {
        const totalMinutes = startTime + i * interval;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
        const period = hours >= 12 ? "PM" : "AM";
        return `${String(formattedHours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")} ${period}`;
      });
      setTimeSlots(slots);
    };
    if (eventInfo?.duration) {
      createTimeSlot(eventInfo.duration);
    }
  }, [eventInfo?.duration]);

  useEffect(() => {
    const getPrevEventBooking = async () => {
      const q = query(
        collection(db, "ScheduledMeetings"),
        where("selectedDate", "==", date),
        where("eventId", "==", eventInfo.id)
      );
      const docsSnap = await getDocs(q);
      const prevBookingTemp = [];
      docsSnap.forEach((doc) => {
        prevBookingTemp.push(doc.data());
      });
      setPrevBooking(prevBookingTemp);
    };
    getPrevEventBooking();
  }, [date, eventInfo.id]);

  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_SECRET_KEY);

  const sendEmail = (user) => {
    const emailHtml = render(
      <Email
        businessName={businessInfo.businessName}
        date={format(date, "PPP").toString()}
        duration={eventInfo.id}
        meetingTime={selectedTime}
        meetingUrl={eventInfo.locationURL}
        userFirstName={user}
      />
    );
    plunk.emails
      .send({
        to: userEmail,
        subject: "Meeting Schedul Details",
        body: emailHtml,
      })
      .then(() => {
        router.replace("/confirmation");
      });
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const day = format(newDate, "EEEE");
    setEnableTimeSlots(businessInfo.daysAvailable.includes(day));
  };

  const handleScheduleEvent = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(userEmail)) {
      toast.error("Enter Valid Email");
      return;
    }
    const docId = Date.now().toString();
    await setDoc(doc(db, "ScheduledMeetings", docId), {
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      selectedTime: selectedTime,
      selectedDate: date,
      duration: eventInfo.duration,
      eventId: eventInfo.id,
      userName,
      userEmail,
      locationUrl: eventInfo.locationURL,
      ...(userNote && { userNote }),
    });
    toast.success("Meeting Scheduled");
    sendEmail(userName);
  };

  return (
    <div
      className="p-5 py-10 m-5 mx-10 border-t-8 shadow-lg md:mx-26 lg:mx-56"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.svg" width={150} height={150} alt="logo" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* MeetingInfo */}
        <div className="p-4 border-r">
          <h2>{businessInfo.businessName}</h2>
          <h2 className="text-2xl font-bold">
            {eventInfo?.eventName || "Meeting Name"}
          </h2>
          <div className="flex flex-col gap-4 mt-5">
            <h2 className="flex gap-2">
              <Clock /> {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin /> {eventInfo?.locationType} Meeting
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck /> {format(date, "PPP")}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer /> {selectedTime}
              </h2>
            )}
            <Link href={eventInfo?.locationURL || "#"} className="text-primary">
              {eventInfo?.locationURL}
            </Link>
          </div>
        </div>

        {/* Time & Date Selction */}
        {step === 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlots={enableTimeSlots}
            handleDateChange={handleDateChange}
            timeSlots={timeSlots}
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className="flex justify-end gap-3 mt-10">
        {step === 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button disabled={!selectedTime || !date} onClick={() => setStep(2)}>
            Next
          </Button>
        ) : (
          <Button
            disabled={!userName || !userEmail}
            onClick={handleScheduleEvent}
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
};
export default MeetingTimeDateSelection;
