export interface Lesson {
  id?: number;
  startDate: Date | null;
  endDate: Date | null;
  employeeId: number;
  lessonTypeId: number;
  customers?: any[];
}

export interface FullLesson {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  employeeLName: string;
  employeeFName: string;
  tags: string[];
  title: string;
  customerIds: number[];
}
