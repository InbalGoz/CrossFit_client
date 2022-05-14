import { Scheduler } from "@aldabil/react-scheduler";
import { Button } from "@mui/material";
import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import CustomEditor from "../components/CustomScheduler";
import { useNavigate } from "react-router-dom";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { lessonService } from "../services/lessonService";
import { lessonTypeService } from "../services/lessonTypeService";
import { LessonType } from "../models/lessonType";
import { employeeService } from "../services/employeeService";
import { Employee } from "../models/employee";
import { FullLesson, Lesson } from "../models/lesson";
import {
  deleteLesson,
  getFullInfoLessons,
  editLesson,
} from "../store/actions/lessonActions";
import {
  createCustomerToLesson,
  deleteCustomerToLesson,
} from "../store/actions/customerToLessonActions";

const SchedulerPage: React.FC = () => {
  const [lessonsEvents, setLessonsEvents] = useState<Array<any>>([]);
  //const [fullInfoLessons, setFullInfoLessons] = useState<Array<any>>([]);
  const [isAdmin, setAdmin] = useState(false);
  const dispatch = useAppDispatch();
  const { user, user_type } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { all_fullInfoLessons } = useAppSelector((state) => state.lesson);

  const getLogedEmployee = async () => {
    if (user) {
      const logedEmployee: Employee = await employeeService.getLoggedEmployee(
        user.id
      );
      //console.log("logedEmployee header", logedEmployee);
      if (logedEmployee.isAdmin) {
        setAdmin(true);
      }
    }
  };

  useEffect(() => {
    if (user && user_type == "employee") {
      getLogedEmployee();
    }

    dispatch(getFullInfoLessons());
  }, []);

  if (!user) {
    navigate("/");
    return <div>loading</div>;
  }

  const handleConfirm = async (event: any, isRegister: any): Promise<any> => {
    const data = {
      lessonId: event.event_id,
      customerId: user.id,
    };
    const lesson_event: Lesson = await lessonService.getLesson(event.event_id);
    const lessonType_event: LessonType = await lessonTypeService.getLessonType(
      lesson_event.lessonTypeId
    );
    if (
      isRegister === 1 &&
      event.customerIds &&
      event.customerIds.length <= lessonType_event.max
    ) {
      dispatch(createCustomerToLesson(data));
    } else if (isRegister === 2) {
      dispatch(deleteCustomerToLesson(data));
    }
  };

  const handleDelete = async (deletedId: any): Promise<any> => {
    if (isAdmin) {
      dispatch(deleteLesson(deletedId));
    }
  };

  const convertToEvents = (lessons: FullLesson[]) => {
    const newEvents = lessons.map((lesson_event: any) => {
      const tempStartDate = new Date(`${lesson_event.startDate}`);
      const tempEndDate = new Date(`${lesson_event.endDate}`);
      if (lesson_event.customerIds.includes(user.id)) {
        lesson_event = {
          event_id: lesson_event.lessonId,
          title: lesson_event.title,
          start: tempStartDate,
          end: tempEndDate,
          color: "#8B008B",
          customerIds: lesson_event.customerIds,
        };
        return lesson_event;
      } else {
        lesson_event = {
          event_id: lesson_event.lessonId,
          title: lesson_event.title,
          start: tempStartDate,
          end: tempEndDate,
          // color: "#8B008B",
          customerIds: lesson_event.customerIds,
        };
        return lesson_event;
      }
    });
    return newEvents;
  }

  return (
    <>
      <Header />
      <Scheduler
        customEditor={(scheduler) => (
          <CustomEditor scheduler={scheduler} handleConfirm={handleConfirm} />
        )}
        view='week'
        week={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: 7,
          endHour: 22,
          step: 60,
        }}
        day={{
          startHour: 7,
          endHour: 22,
          step: 60,
        }}
        // onConfirm={handleConfirm}
        onDelete={handleDelete}
        events={convertToEvents(all_fullInfoLessons || [])}
        // events={lessonsEvents}
        selectedDate={new Date()}
      />
    </>
  );
};

export default SchedulerPage;
