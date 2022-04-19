export interface Lesson {
    id?:number;
    date:Date | null;
    employeeId:number;
    lessonTypeId:number
    employees?:any[]
}