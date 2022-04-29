import { Scheduler } from "@aldabil/react-scheduler";
import { Button } from "@mui/material";
import Header from "../components/Header";
import React ,  { useState , useEffect } from "react";

export const EVENTS = [
  {
    event_id: 1,
    title: "Event 1",
    start: new Date("2021 5 2 09:30"),
    end: new Date("2021 5 2 10:30")
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date("2021 5 4 10:00"),
    end: new Date("2021 5 4 11:00")
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date("2021 4 27 09:00"),
    end: new Date("2021 4 28 10:00")
  },
  {
    event_id: 4,
    title: "Event 4",
    start: new Date("2021 5 4 9:00"),
    end: new Date("2021 5 4 10:36")
  },
  {
    event_id: 5,
    title: "Event 5",
    start: new Date("2021 5 1 10:00"),
    end: new Date("2021 5 18 11:00")
  },
  {
    event_id: 6,
    title: "Event 6",
    start: new Date("2021 5 2 11:00"),
    end: new Date("2021 5 2 12:00")
  },
  {
    event_id: 7,
    title: "Event 7",
    start: new Date("2021 5 1 12:00"),
    end: new Date("2021 5 1 13:00")
  },
  {
    event_id: 8,
    title: "Event 8",
    start: new Date("2021 5 1 13:00"),
    end: new Date("2021 5 1 14:00")
  },
  {
    event_id: 9,
    title: "Event 11",
    start: new Date("2021 5 5 16:00"),
    end: new Date("2021 5 5 17:00")
  },
  {
    event_id: 10,
    title: "Event 9",
    start: new Date("2021 5 6  15:00"),
    end: new Date("2021 5 6 16:00")
  },
  {
    event_id: 11,
    title: "Event 10",
    start: new Date(1651249669506 - 1000 * 60 * 60),
    end: new Date(1651249669506)
  }
];

const SchedulerPage = () => {
  const [optionId , setOptionId] = useState(0);


  const register = () =>{
    if(optionId === 1){
      //register the customer to the lesson
    }
    else{
      ///dont register
    }
  };

  useEffect(() => {

  })

  

  const handleConfirm = async (event:any, action:any): Promise<any> => {
    console.log(event, action);
    console.log(event.option_id)

    setOptionId(event.option_id);

    if (action === "edit") {
      //register
      //// add the id of the customer to the lesson customer array
      /** PUT event to remote DB */
    } else if (action === "create") {
      /**POST event to remote DB */
    }
    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          ...event,
          event_id: event.event_id || Math.random()
        });
      }, 3000);
    });
  };

  const handleDelete = async (deletedId:any) : Promise<any>=> {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
    });
  };

  return (
    <>
    <Header isAdmin={true}/>
    <Scheduler
      //view="week"
      events={EVENTS}
      fields={[
        {
          name: "option_id",
          type: "select",
          // Should provide options with type:"select"
          options: [
            { id: 1, text: "Register", value: 1 },
            { id: 2, text: "Dont Register", value: 2 }
          ],
          config: { label: "Register To Lesson", required: true, errMsg: "Plz Select Choice" }
        },  
      ]}
      onConfirm={handleConfirm}
      onDelete={handleDelete}
      selectedDate={new Date(2022, 4, 5)}
    />
    </>
  );
}

export default SchedulerPage;








