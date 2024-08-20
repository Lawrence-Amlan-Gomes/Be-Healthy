import { HoursContext } from "../contexts";
import { useContext } from "react";

export const useHours = () => {
  const { hours, setHours } = useContext(HoursContext);

  return { hours, setHours };
};
