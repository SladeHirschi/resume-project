export type WorkDataType = {
    occupation: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string | null;
    type: 'work' | 'school';
    current: boolean;
}

export const EmptyWorkData: WorkDataType = {
    occupation: '',
    company: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'work',
    current: false
}