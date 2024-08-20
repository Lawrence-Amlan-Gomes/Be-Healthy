import { DaysContext } from "../contexts";
import { useContext } from "react";

export const useDays = () => {
  const { days, setDays } = useContext(DaysContext);

  return { days, setDays };
};
