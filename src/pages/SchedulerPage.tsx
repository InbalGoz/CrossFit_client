import React , {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { Scheduler } from "@aldabil/react-scheduler";
import Header from '../components/Header';
import axios from 'axios';

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import  { getAllLessons } from '../store/actions/lessonActions';

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
    start: new Date("2021 5 6 14:00"),
    end: new Date("2021 5 6 15:00")
  }
];


const SchedulerPage:React.FC = ()=> {
  const [tempFields , setTempFields] = useState([]);

 /* const { id } = useParams();
  const [isAdmin , setAdmin] = useState(true);
  const [ lessonsEvents , setLessonsEvents ] = useState<Array<any>>([]);

  const dispatch = useAppDispatch();
  const all_lessons = useAppSelector(state => state.lesson.all_lessons);

  const lessonsEventsCreate = () => {
    let newEvents: any[] = [];
    let newEvent = {
      event_id: 0,
      title:'' ,
      start: new Date(),
      end: new Date()
    }

    all_lessons.forEach((element:any) => {
      console.log("element" , element)
      newEvent = {
        event_id: element.id,
        title: element.lessonTypeId,
        start: element.startDate,
        end: element.endDate
      }
      newEvents.push(newEvent);
    })
    setLessonsEvents(newEvents)
  }

  useEffect(()=>{
    dispatch(getAllLessons());
    console.log("all_lessons" , all_lessons)

   // lessonsEventsCreate();
    console.log("startTime" , all_lessons[0].startDate)
    //console.log("time" , new Date(all_lessons[0].startDate))
    console.log("lessonsEvents" , lessonsEvents)
  },[all_lessons])*/

  useEffect(()=>{
    console.log()
  })

  return (
    <>
    <Header isAdmin={true}/>
    <Scheduler
      fields={[
        {
          name: "user_id",
          type: "select",
          // Should provide options with type:"select"
          options: [
            { id: 1, text: "Register", value: 1 },
            { id: 2, text: "Dont Register", value: 2 }
          ],
          config: { label: "Register To Lesson", required: true, errMsg: "Plz Select Choice" }
        },  
      ]}
      view="week"
      events={EVENTS}
      selectedDate={new Date(2021, 4, 5)}
    />
    </>
  );
}

export default SchedulerPage;

/*
<Scheduler
      view="week"
      //events={EVENTS}
      events={lessonsEvents}
      selectedDate={new Date(2021, 4, 5)}
    />*/




