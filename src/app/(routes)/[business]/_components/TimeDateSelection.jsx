import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
const TimeDateSelection = ({
  date,
  handleDateChange,
  enableTimeSlots,
  timeSlots,
  setSelectedTime,
  selectedTime,
  prevBooking,
}) => {
  const checkTimeSlot = (time) => {
    return prevBooking.filter((prev) => prev.selectedTime === time).length;
  };
  return (
    <div className="px-4 sm:flex md:col-span-2">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="mt-5 border rounded-md"
          disabled={(date) => date <= new Date()}
        />
      </div>

      <ScrollArea className="flex flex-col w-full gap-4 p-5 overflow-auto max-h-[400px]">
        <div className="flex flex-col w-full h-full gap-4">
          {timeSlots?.map((time) => (
            <Button
              disabled={!enableTimeSlots || checkTimeSlot(time)}
              key={time}
              variant="outline"
              className={`text-primary border-primary hover:bg-primary hover:text-white ${
                selectedTime === time && "bg-primary text-white"
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export default TimeDateSelection;
