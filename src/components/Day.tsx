import React, { FC, useState } from "react";

// Hooks
import useLocalStorage from "../hooks/useLocalStorage";

//Type
import { AppoinmentType } from "../constant/Types";

// component
import AddAppointment from "./AddAppointment";
import Appoinment from "./Appoinment";

interface Props {
  date: Date | null | string;
}

const Day: FC<Props> = ({ date }: Props) => {
  const key: string = date instanceof Date ? date.toDateString() : "dummy-date";
  //   console.log(key);
  let [appoinments, setAppointment] = useLocalStorage<AppoinmentType>(key);
  //   console.log(appoinments);
  const [isVisible, setVisible] = useState<boolean>(false);

  return (
    <>
      <section>
        {typeof date === "string" && (
          <div className=" flex flex-col items-center text-xs text-gray-600 w-28 h-28 p-2 border border-gray-600">
            {date}
          </div>
        )}

        {date === null && (
          <div className=" flex flex-col items-center text-xs text-gray-600 w-28 h-28 p-2 border border-gray-600"></div>
        )}

        {date instanceof Date && (
          <div
            onClick={() => setVisible(true)}
            className=" cursor-pointer flex flex-col items-center text-xs text-gray-600 w-28 h-28 p-2 border border-gray-600"
          >
            {date.getDate()}
            <section className=" w-11/12 flex flex-col overflow-auto gap-1">
              {appoinments.map((app: AppoinmentType) => (
                <Appoinment
                  key={app.id}
                  app={app}
                  _key={key}
                  setAppointment={setAppointment}
                />
              ))}
            </section>
          </div>
        )}
      </section>
      <section>
        {isVisible && (
          <AddAppointment
            setVisible={setVisible}
            setAppointment={setAppointment}
            _key={key}
          />
        )}
      </section>
    </>
  );
};

export default Day;
