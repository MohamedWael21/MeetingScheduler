import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const PreviewMeeting = ({ formValue }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();

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
    if (formValue?.duration) {
      createTimeSlot(formValue.duration);
    }
  }, [formValue?.duration]);

  return (
    <div
      className="p-5 py-10 m-5 border-t-8 shadow-lg"
      style={{ borderTopColor: formValue?.themeColor }}
    >
      <Image src="/logo.svg" width={150} height={150} alt="logo" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* MeetingInfo */}
        <div className="p-4 border-r">
          <h2>BusinessName</h2>
          <h2 className="text-2xl font-bold">
            {formValue?.eventName || "Meeting Name"}
          </h2>
          <div className="flex flex-col gap-4 mt-5">
            <h2 className="flex gap-2">
              <Clock /> {formValue?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin /> {formValue?.locationType} Meeting
            </h2>
            <Link href={formValue?.locationURL || "#"} className="text-primary">
              {formValue?.locationURL}
            </Link>
          </div>
        </div>

        {/* Time & Date Selction */}
        <div className="px-4 lg:flex md:col-span-2">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mt-5 border rounded-md"
              disabled={(date) => date <= new Date()}
            />
          </div>

          <ScrollArea className="flex flex-col w-full gap-4 p-5 overflow-auto max-h-[400px]">
            <div className="flex flex-col w-full h-full">
              {timeSlots?.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary hover:text-white"
                >
                  {time}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
export default PreviewMeeting;
