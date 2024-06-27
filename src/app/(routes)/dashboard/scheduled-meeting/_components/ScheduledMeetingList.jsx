import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Clock, CalendarCheck, Timer } from "lucide-react";
import Link from "next/link";

const ScheduledMeetingList = ({ meetingList }) => {
  return (
    <div>
      {meetingList.map((meeting, index) => (
        <Accordion type="single" collapsible key={index}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {format(meeting.selectedDate.toDate(), "PPP")}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 mt-5">
                <h2 className="flex gap-2">
                  <Clock /> {meeting?.duration} Min
                </h2>
                <h2 className="flex gap-2">
                  <CalendarCheck />{" "}
                  {format(meeting.selectedDate.toDate(), "PPP")}
                </h2>
                <h2 className="flex gap-2">
                  <Timer /> {meeting.selectedTime}
                </h2>
                <Link href={meeting.locationUrl} className="text-primary">
                  {meeting?.locationUrl}
                </Link>
                <Link href={meeting.locationUrl}>
                  <Button className="mt-3">Join Now</Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
export default ScheduledMeetingList;
