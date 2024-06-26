"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase-config";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Clock, Copy, MapPin, PenIcon, Settings, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MeetingEventList = () => {
  const [eventList, setEventList] = useState([]);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const getEventList = async () => {
      const q = query(
        collection(db, "MeetingEvent"),
        where("createdBy", "==", user.email),
        orderBy("__name__", "desc")
      );
      const docsSnapShot = await getDocs(q);
      const eventListTemp = [];
      docsSnapShot.forEach((doc) => {
        eventListTemp.push({ id: doc.id, ...doc.data() });
      });
      setEventList(eventListTemp);
    };
    if (user) {
      getEventList();
    }
  }, [user]);

  const onDeleteEventMeeting = async (event) => {
    await deleteDoc(doc(db, "MeetingEvent", event.id));
    setEventList((prevList) =>
      prevList.filter((currEvent) => currEvent.id !== event.id)
    );
    toast.success("Event deleted successfully");
  };

  return (
    <div className="grid grid-cols-1 gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3">
      {eventList.length <= 0 && <h2>Loading...</h2>}
      {eventList.map((event) => (
        <div
          key={event.id}
          className="flex flex-col gap-5 p-5 border border-t-8 rounded-lg shadow-md"
          style={{ borderTopColor: event?.themeColor }}
        >
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Settings className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2">
                  <PenIcon />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => onDeleteEventMeeting(event)}
                >
                  <Trash /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h2 className="text-2xl font-medium">{event.eventName}</h2>
          <div className="flex justify-between">
            <h2 className="flex gap-2">
              <Clock /> {event.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin /> {event.locationType}
            </h2>
          </div>
          <hr />
          <div>
            <div className="flex items-center justify-between">
              <h2
                className="flex gap-2 text-sm cursor-pointer text-primary"
                onClick={() => {
                  navigator.clipboard.writeText(event.locationURL);
                  toast.info("Copied To clipboard");
                }}
              >
                <Copy className="w-4 h-4" /> Copy Link
              </h2>
              <Button
                variant="outline"
                className="rounded-full hover:bg-primary hover:text-white border-primary text-primary"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MeetingEventList;
