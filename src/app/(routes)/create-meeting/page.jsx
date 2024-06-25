"use client";
import MeetingForm from "./_components/MeetingForm";
import { useState } from "react";
import PreviewMeeting from "./_components/PreviewMeeting";
const CreateMeeting = () => {
  const [formValue, setFormValue] = useState();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* Meeting Form */}
      <div className="border shadow-md md:h-screen">
        <MeetingForm setFormValue={setFormValue} />
      </div>

      {/* Preview */}
      <div className="md:col-span-2">
        <PreviewMeeting formValue={formValue} />
      </div>
    </div>
  );
};
export default CreateMeeting;
