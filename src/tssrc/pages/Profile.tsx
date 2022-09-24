import { useEffect, useState, FC } from "react";

type WorkObject = {
    name: string;
    company: string;
    description: string;
    dateStarted: string;
    dateEnded: string | null;
    type: 'work' | 'school';
    current: boolean;
}

const Profile: FC = () => {

    const [workData, setWorkData] = useState<Array<WorkObject>>([]);

    const fakeWorkData: Array<WorkObject> = [
        {
            name: 'Software Developer',
            company: 'Easier Accounting',
            description: 'Worked on CRM to provide good sotware for staff by adding, maintaining, and fixing features.',
            dateStarted: '2021-05-25',
            dateEnded: null,
            type: 'work',
            current: true
        },
        {
            name: 'Software Developer',
            company: 'Easier Accounting',
            description: 'Worked on CRM to provide good sotware for staff by adding, maintaining, and fixing features.',
            dateStarted: '2021-05-25',
            dateEnded: null,
            type: 'work',
            current: true
        },
        {
            name: 'Software Developer',
            company: 'Easier Accounting',
            description: 'Worked on CRM to provide good sotware for staff by adding, maintaining, and fixing features.',
            dateStarted: '2021-05-25',
            dateEnded: null,
            type: 'work',
            current: true
        },
    ];

    useEffect(() => {
        setWorkData(fakeWorkData)
    }, [])

    return (
        <div className='profile-page-container'>
            <div className='row h-100'>
                <div className='col-md-4 p-4'>
                    <div className='profile-image-container'>
                        <img src={require('../../assets/logo.png')} width='212px' height='212px' alt="Me" />
                    </div>

                    <div className='profile-work-container'>
                        <div className="separator">Work</div>

                        {workData.map((data, index) => {
                            return (
                                <div key={index} className='work-data-card'>
                                    <div className='work-data-card-title'>
                                        <div>{data.name}</div>
                                        {data.current && <span className="work-data-card-title-current">Current</span>}
                                    </div>

                                    <div className='work-data-card-subtitle'>{data.company}</div>

                                    <div className='work-data-card-body'>{data.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='col-md-8'>
                    Right Column
                </div>
            </div>
        </div>
    );
}

export default Profile