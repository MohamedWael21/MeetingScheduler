"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import locations from "@/utils/location-options";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import themeOptions from "@/utils/theme-options";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MeetingForm = ({ setFormValue }) => {
  const [locationType, setLocationType] = useState("");
  const [themeColor, setThemeColor] = useState("");
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(30);
  const [locationURL, setLocationURL] = useState("");

  useEffect(() => {
    setFormValue({
      eventName,
      duration,
      locationType,
      locationURL,
      themeColor,
    });
  }, [
    eventName,
    duration,
    locationType,
    locationURL,
    themeColor,
    setFormValue,
  ]);

  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const onCreateEvent = async () => {
    const id = Date.now().toString();
    await setDoc(doc(db, "MeetingEvent", id), {
      eventName,
      duration,
      locationType,
      locationURL,
      themeColor,
      businessid: doc(db, "Business", user?.email),
      createdBy: user?.email,
    });
    toast.success("New Meeting Event Created");
    router.replace("/dashboard/meeting-type");
  };

  return (
    <div className="p-8">
      <Link href="/dashboard">
        <h2 className="flex gap-2">
          <ChevronLeft /> Cancel
        </h2>
      </Link>

      <div className="mt-4">
        <h2 className="my-4 text-2xl font-bold">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your meeting event"
          onChange={(e) => setEventName(e.target.value)}
        />
        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDuration(15)}>
              15 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>
              30 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 Min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Locations *</h2>
        <div className="grid grid-cols-4 gap-3">
          {locations.map((option, index) => (
            <div
              key={index}
              className={`${
                locationType === option.name ? "bg-blue-100 border-primary" : ""
              } flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer hover:border-primary hover:bg-blue-100`}
              onClick={() => setLocationType(option.name)}
            >
              <Image
                src={option.icon}
                width={30}
                height={30}
                alt={option.name}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        {locationType && (
          <>
            <h2 className="font-bold">Add URL *</h2>
            <Input
              placeholder="Add URL"
              onChange={(e) => setLocationURL(e.target.value)}
            />
          </>
        )}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
          {themeOptions.map((color) => (
            <div
              className={`rounded-full h-7 w-7 ${
                themeColor === color ? "border-4 border-black" : ""
              }`}
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}
            ></div>
          ))}
        </div>
      </div>
      <Button
        className="w-full mt-9"
        disabled={!(eventName && duration && locationType && locationURL)}
        onClick={onCreateEvent}
      >
        Create
      </Button>
    </div>
  );
};
export default MeetingForm;
