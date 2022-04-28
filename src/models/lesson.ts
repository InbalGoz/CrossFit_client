export interface Lesson {
    id?: number;
    startDate: Date | null ;
    endDate: Date | null;
    employeeId: number;
    lessonTypeId: number;
    employees: any[];
   // coustomers?:any[];
}