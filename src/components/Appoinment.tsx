import React, { FC, useState } from "react";

// component
import EditAppoinment from "./EditAppoinment";
import { AppoinmentType } from "../constant/Types";

interface Props {
  app: AppoinmentType;
  _key: string;
  setAppointment: React.Dispatch<React.SetStateAction<AppoinmentType[]>>;
}

const Appoinment: FC<Props> = ({ app, _key, setAppointment }: Props) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const clickHandler = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.stopPropagation();
    setVisible(true);
  };
  return (
    <>
      <span
        onClick={clickHandler}
        className=" cursor-pointer p-1 rounded-sm bg-green-800 text-zinc-100"
      >
        {app.title}
      </span>
      <section>
        {isVisible && (
          <EditAppoinment
            setVisible={setVisible}
            setAppointment={setAppointment}
            _key={_key}
            app={app}
          />
        )}
      </section>
    </>
  );
};

export default Appoinment;
