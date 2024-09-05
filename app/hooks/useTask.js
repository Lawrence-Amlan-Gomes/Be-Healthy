import { TaskContext } from "../contexts";
import { useContext } from "react";

export const useTask = () => {
    const {task, setTask, clicked, setClicked} = useContext(TaskContext);

    return {task, setTask, clicked, setClicked};
}