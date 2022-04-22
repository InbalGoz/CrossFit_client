export interface Lesson {
    _id:string;
    id?:number;
    date:Date | null;
    employeeId:number;
    lessonTypeId:number;
    employees?:any[];
}