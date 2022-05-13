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
import { deleteLesson } from "../store/actions/lessonActions";
import {
  createCustomerToLesson,
  deleteCustomerToLesson,
} from "../store/actions/customerToLessonActions";

// export const EVENTS = [
//   {
//     event_id: 1,
//     title: 'Event 1',
//     start: new Date('2021 5 2 09:30'),
//     end: new Date('2021 5 2 10:30'),
//   },
//   {
//     event_id: 2,
//     title: 'Event 2',
//     start: new Date('2021 5 4 10:00'),
//     end: new Date('2021 5 4 11:00'),
//   },
//   {
//     event_id: 3,
//     title: 'Event 3',
//     start: new Date('2021 4 27 09:00'),
//     end: new Date('2021 4 28 10:00'),
//   },
//   {
//     event_id: 4,
//     title: 'Event 4',
//     start: new Date('2021 5 4 9:00'),
//     end: new Date('2021 5 4 10:36'),
//   },
//   {
//     event_id: 5,
//     title: 'Event 5',
//     start: new Date('2021 5 1 10:00'),
//     end: new Date('2021 5 18 11:00'),
//   },
//   {
//     event_id: 6,
//     title: 'Event 6',
//     start: new Date('2021 5 2 11:00'),
//     end: new Date('2021 5 2 12:00'),
//   },
//   {
//     event_id: 7,
//     title: 'Event 7',
//     start: new Date('2021 5 1 12:00'),
//     end: new Date('2021 5 1 13:00'),
//   },
//   {
//     event_id: 8,
//     title: 'Event 8',
//     start: new Date('2021 5 1 13:00'),
//     end: new Date('2021 5 1 14:00'),
//   },
//   {
//     event_id: 9,
//     title: 'Event 11',
//     start: new Date('2021 5 5 16:00'),
//     end: new Date('2021 5 5 17:00'),
//   },
//   {
//     event_id: 10,
//     title: 'Event 9',
//     start: new Date('2022 5 6  15:00'),
//     end: new Date('2022 5 6 16:00'),
//   },
//   {
//     event_id: 11,
//     title: 'Event 10',
//     start: new Date(1651249669506 - 1000 * 60 * 60),
//     end: new Date(1651249669506),
//   },
// ];

const SchedulerPage: React.FC = () => {
  //const [optionId, setOptionId] = useState(0);
  const [lessonsEvents, setLessonsEvents] = useState<Array<any>>([]);
  const [isAdmin, setAdmin] = useState(false);
  const dispatch = useAppDispatch();
  const { user, user_type } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const loadLessonsEvents = async () => {
    const newfullInfolessons: FullLesson[] =
      await lessonService.getFullInfoLessons();

    // console.log("Scheduler after get full lessons", newfullInfolessons);
    const newArr = await getEvents(newfullInfolessons);
    //  console.log("lessonsEvents hhhh", newArr);
    setLessonsEvents(newArr);
  };

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
    loadLessonsEvents();
  }, []);

  if (!user) {
    navigate("/");
    return <div>loading</div>;
  }

  const getEvents = (newfullInfolessons: any) => {
    console.log({ newfullInfolessons });
    const newEvents = newfullInfolessons.map((lesson_event: any) => {
      const tempStartDate = new Date(`${lesson_event.startDate}`);
      const tempEndDate = new Date(`${lesson_event.endDate}`);

      lesson_event = {
        event_id: lesson_event.lessonId,
        title: lesson_event.title,
        start: tempStartDate,
        end: tempEndDate,
      };
      return lesson_event;
    });
    return newEvents;
  };

  const handleConfirm = async (event: any, isRegister: any): Promise<any> => {
    // if (action === "edit") {
    /* if (event.option_id === 1) {
        const data = {
          lessonId: event.event_id,
          customerId: user.id,
        };
        dispatch(createCustomerToLesson(data));
      }*/
    const data = {
      lessonId: event.event_id,
      customerId: user.id,
    };

    //  if(isRegister === 1 && customers.length < max){}

    const lesson_event: Lesson = await lessonService.getLesson(event.event_id);
    const lessonType_event: LessonType = await lessonTypeService.getLessonType(
      lesson_event.lessonTypeId
    );
    //lesson_event.lessonTypeId
    console.log("lesson_event.customers.length", lesson_event);
    console.log("lessonType_event.max", lessonType_event);

    // if (
    //  isRegister === 1 &&
    //  lesson_event.customers &&
    //  lesson_event.customers.length < lessonType_event.max
    // )
    if (isRegister === 1) {
      dispatch(createCustomerToLesson(data));
    }
    //
    else if (isRegister === 2) {
      // console.log("data", data);
      dispatch(deleteCustomerToLesson(data));
    }
    // } else if (action === "create") {
    //}
  };

  const handleDelete = async (deletedId: any): Promise<any> => {
    if (isAdmin) {
      dispatch(deleteLesson(deletedId));
    }
    // Simulate http request: return the deleted id
    /* return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
    });*/
  };

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
        events={lessonsEvents}
        selectedDate={new Date()}
      />
    </>
  );
};

export default SchedulerPage;
