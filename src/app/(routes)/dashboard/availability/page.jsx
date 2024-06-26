"use client";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { toast } from "sonner";
import daysList from "@/utils/days-list";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Oval } from "react-loader-spinner";

const Availability = () => {
  const [daysAvailable, setDaysAvailable] = useState([]);
  const [time, setTime] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useKindeBrowserClient();

  const onHandleChange = (day, value) => {
    setDaysAvailable((prevDays) =>
      value ? [...prevDays, day] : prevDays.filter((currDay) => currDay !== day)
    );
  };

  useEffect(() => {
    const getBusinessInfo = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const docRef = doc(db, "Business", user.email);
        const docSnap = await getDoc(docRef);
        const result = docSnap.data();
        setDaysAvailable(result.daysAvailable);
        setTime({
          startTime: result.startTime,
          endTime: result.endTime,
        });
      } catch (error) {
        console.error("Error fetching business info: ", error);
        toast.error("Failed to fetch business info");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getBusinessInfo();
    }
  }, [user]);

  const onSave = async () => {
    if (user) {
      await updateDoc(doc(db, "Business", user.email), {
        daysAvailable,
        startTime: time.startTime,
        endTime: time.endTime,
      });
      toast.success("Changes updated");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#0069ff"
          secondaryColor="#0069ff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <hr className="my-7" />
        <div className="grid grid-cols-2 gap-5 my-3 md:grid-cols-4">
          {daysList.map((item) => (
            <div key={item.day}>
              <h2 className="flex items-center gap-2">
                <Checkbox
                  checked={daysAvailable.includes(item.day)}
                  onCheckedChange={(value) => onHandleChange(item.day, value)}
                />
                {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mt-10 font-bold">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              value={time.startTime}
              onChange={(e) =>
                setTime((prevTime) => ({
                  ...prevTime,
                  startTime: e.target.value,
                }))
              }
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              value={time.endTime}
              onChange={(e) =>
                setTime((prevTime) => ({
                  ...prevTime,
                  endTime: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default Availability;
