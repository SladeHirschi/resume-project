import moment from "moment";

export type WorkDataType = {
    id: null | number;
    occupation: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string | null;
    type: 'work' | 'school';
    isCurrent: boolean;
}

export const EmptyWorkData: WorkDataType = {
    id: null,
    occupation: '',
    company: '',
    description: '',
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    type: 'work',
    isCurrent: false
}