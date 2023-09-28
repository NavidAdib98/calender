import React, { useState } from "react";

// utils
import { addToLocalStorage } from "../utils/localStorageFunctions";
// Type
import { AppoinmentType } from "../constant/Types";

interface Props {
  _key: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointment: React.Dispatch<React.SetStateAction<AppoinmentType[]>>;
}

const AddAppointment: React.FC<Props> = ({
  _key,
  setVisible,
  setAppointment,
}: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    description: "",
  });
  const [isValidTime, setIsValidTime] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "time") {
      // Validate the time input (HH:MM format)
      const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      setIsValidTime(timePattern.test(value));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidTime) {
      const d: AppoinmentType = {
        title: formData.title,
        description: formData.description,
        time: formData.time,
        id: Date.now().toString(),
      };
      addToLocalStorage<AppoinmentType>(_key, d);
      setAppointment((pre) => {
        const updatedList = [...pre];
        updatedList.push(d);
        return updatedList;
      });
      setVisible(false);
    } else {
      // Display an error message for invalid time
      alert("Please enter a valid time in HH:MM format.");
    }
  };
  return (
    <section
      onClick={() => setVisible(false)}
      className=" fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center"
    >
      <form
        className=" bg-slate-200 w-1/2 flex flex-col items-start gap-2 p-2 border rounded-sm"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <input
            placeholder="title ..."
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="time (HH:MM):"
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          {!isValidTime && (
            <span className="text-red-500">
              Please enter a valid time (HH:MM).
            </span>
          )}
        </div>
        <div>
          <input
            placeholder="Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddAppointment;
