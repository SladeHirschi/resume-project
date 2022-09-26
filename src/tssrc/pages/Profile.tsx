import { useEffect, useState, FC } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { MdLocationOn, MdTextsms, MdOutlineEmail } from 'react-icons/md';
import { TbBrandGithub } from 'react-icons/tb';

import { WorkDataType, EmptyWorkData } from "../helpers/types/workDataType";
import WorkDataModal from "../components/modals/WorkDataModal";
import InfoModal from "../components/modals/InfoModal";
import SMSModal from "../components/modals/SMSModal";
import EmailModal from "../components/modals/EmailModal";

type Info = {
    label: string
    value: string
    link: string
}

const Profile: FC = () => {

    const [workData, setWorkData] = useState<Array<WorkDataType>>([]);
    const [basicInfo, setBasicInfo] = useState<Array<Info>>([]);
    const [contactInfo, setContactInfo] = useState<Array<Info>>([]);

    const [SMSMessage, setSMSMessage] = useState<string>('');
    const [emailDraft, setEmailDraft] = useState<{ body: string, sender: string }>({ body: '', sender: '' });
    const [workDataDraft, setWorkDataDraft] = useState<WorkDataType>(EmptyWorkData);
    const [basicInfoDraft, setBasicInfoDraft] = useState<Info>({ label: '', value: '', link: '' });
    const [contactInfoDraft, setContactInfoDraft] = useState<Info>({ label: '', value: '', link: '' });

    const [showSMSModal, setShowSMSModal] = useState<boolean>(false);
    const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
    const [showWorkDataModal, setShowWorkDataModal] = useState<boolean>(false);
    const [showBasicInfoModal, setShowBasicInfoModal] = useState<boolean>(false);
    const [showContactInfoModal, setShowContactInfoModal] = useState<boolean>(false);

    const fakeWorkData: Array<WorkDataType> = [
        {
            occupation: 'Software Developer',
            company: 'Easier Accounting',
            description: 'Worked on CRM to provide good sotware for staff by adding, maintaining, and fixing features.',
            startDate: '2021-05-25',
            endDate: null,
            type: 'work',
            current: true
        }
    ];

    const fakeContactInfo: Array<Info> = [
        { label: 'Phone', value: '(435) 218-1442', link: '' },
        { label: 'Email', value: 'sladehirsc@gmail.com', link: '' },
        { label: 'Address', value: '275 North 100 West', link: '' },
        { label: 'City', value: 'Washington', link: '' },
        { label: 'State', value: 'Utah', link: '' },
        { label: 'Zipcode', value: '84780', link: '' },
    ]

    const fakeBasicInfo: Array<Info> = [
        { label: 'Gender', value: 'Male', link: '' },
        { label: 'Age', value: '21', link: '' },
        { label: 'Birthday', value: 'Jun 01 2001', link: '' },
        { label: 'Occupation', value: 'Software Developer', link: '' },
        { label: 'Marital Status', value: 'Married', link: '' },
        { label: 'Grad Status', value: "Pursuing Bachelor of Science. (December 2022)", link: '' },
        { label: 'LinkedIn', value: "LinkedIn", link: "https://linkedin.com/in/slade-hirschi-a45583206" },
    ]

    useEffect(() => {
        setWorkData(fakeWorkData)
    }, [])

    useEffect(() => {
        setContactInfo(fakeContactInfo)
    }, [])

    useEffect(() => {
        setBasicInfo(fakeBasicInfo)
    }, [])

    function onSubmitWorkModal(): void {
        setWorkData([...workData, workDataDraft]);
        setWorkDataDraft(EmptyWorkData);
        setShowWorkDataModal(false);
    }

    function onSubmitContactInfoModal(): void {
        setContactInfo([...contactInfo, contactInfoDraft]);
        setContactInfoDraft({ label: '', value: '', link: '' });
        setShowContactInfoModal(false);
    }

    function onSubmitBasicInfoModal(): void {
        setBasicInfo([...basicInfo, basicInfoDraft]);
        setBasicInfoDraft({ label: '', value: '', link: '' });
        setShowBasicInfoModal(false);
    }

    async function onSubmitSMSModal() {
        var body = 'message=' + encodeURIComponent(SMSMessage);
        const rawResponse = await fetch('http://localhost:8080/sendSMS', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        console.log("rawResponse: ", rawResponse);
        setShowSMSModal(false);
    }

    async function onSubmitEmailModal() {
        var body = 'body=' + encodeURIComponent(emailDraft.body);
        body += '&sender=' + encodeURIComponent(emailDraft.sender);
        const rawResponse = await fetch('http://localhost:8080/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        console.log("rawResponse: ", rawResponse);
        setShowEmailModal(false);
    }

    return (
        <div className='profile-page-container'>
            <div className='row h-100'>
                <div className='col-md-4 profile-left-column'>
                    <div className='profile-image-container'>
                        <img src={require('../../assets/logo.png')} width='212px' height='212px' alt="Me" />
                    </div>

                    <div className='profile-work-container'>
                        <div className="separator">Work</div>
                        <div className='d-flex justify-content-end'>
                            <button
                                className='btn btn-primary d-flex align-items-center justify-content-between mb-2'
                                onClick={() => setShowWorkDataModal(true)}
                            >
                                <span>Add Item</span>
                                <AiOutlinePlus style={{ marginLeft: '0.25rem' }} />
                            </button>
                        </div>
                        {workData.map((data, index) => {
                            return (
                                <div key={index} className='work-data-card'>
                                    <div className='work-data-card-title'>
                                        <div>{data.occupation}</div>
                                        {data.current && <span className="work-data-card-title-current">Current</span>}
                                    </div>
                                    <div className='work-data-card-subtitle'>{data.company}</div>
                                    <div className='work-data-card-body'>{data.description}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className='col-md-8 h-100'>
                    <div className='d-flex flex-column h-100'>

                        <div style={{ flex: 1, minHeight: 0 }}>
                            <div className='d-flex align-items-baseline'>
                                <h3>Slade Hirschi</h3>
                                <div style={{ fontSize: '1.25rem', marginLeft: '1rem', display: 'flex' }}>
                                    <MdLocationOn />
                                    <h6 style={{ color: 'gray' }}>Washington, UT</h6>
                                </div>
                            </div>

                            <h5 style={{ color: 'rgb(33, 188, 240)' }}>Software Developer</h5>

                            <div className='row gx-3 gy-1 col-md-6 mb-5'>
                                <div className='col-xl-4'>
                                    <button
                                        className='btn btn-primary d-flex align-items-center w-100 fit-content-desktop'
                                        onClick={() => setShowSMSModal(true)}
                                    >
                                        <MdTextsms />
                                        <span style={{ fontSize: '0.85rem' }} className='ms-2'>Send Text</span>
                                    </button>
                                </div>
                                <div className='col-xl-4'>
                                    <button
                                        className='btn btn-secondary d-flex align-items-center w-100 fit-content-desktop'
                                        onClick={() => setShowEmailModal(true)}
                                    >
                                        <MdOutlineEmail />
                                        <span style={{ fontSize: '0.85rem' }} className='ms-2'>Send Email</span>
                                    </button>
                                </div>
                                <div className='col-xl-4'>
                                    <button className='btn btn-dark d-flex align-items-center w-100 fit-content-desktop'>
                                        <TbBrandGithub />
                                        <span style={{ fontSize: '0.85rem' }} className='ms-2'>View GitHub</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div style={{ flex: 1, minHeight: 0, overflowY: 'scroll' }}>
                            <div className="separator">Contact Info</div>

                            <div className='d-flex justify-content-end'>
                                <button
                                    className='btn btn-primary d-flex align-items-center justify-content-between mb-2'
                                    onClick={() => setShowContactInfoModal(true)}
                                >
                                    <span>Add Item</span>
                                    <AiOutlinePlus style={{ marginLeft: '0.25rem' }} />
                                </button>
                            </div>

                            <div className='row gy-2 col-md-12'>
                                {contactInfo.map((item, index) => {
                                    return (
                                        <div key={index} className={'d-flex justify-content-between col-md-6'}>
                                            <span className='col-md-4'>{item.label}</span>
                                            <span className='col-md-8'>
                                                {item.link.length > 0 ?
                                                    <a href={item.link} target="_blank" rel="noreferrer">{item.value}</a>
                                                    :
                                                    item.value
                                                }
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ flex: 1, minHeight: 0, overflowY: 'scroll' }}>
                            <div className="separator">Basic Info</div>

                            <div className='d-flex justify-content-end'>
                                <button
                                    className='btn btn-primary d-flex align-items-center justify-content-between mb-2'
                                    onClick={() => setShowBasicInfoModal(true)}
                                >
                                    <span>Add Item</span>
                                    <AiOutlinePlus style={{ marginLeft: '0.25rem' }} />
                                </button>
                            </div>

                            <div className='row gy-2 col-md-12'>
                                {basicInfo.map((item, index) => {
                                    return (
                                        <div key={index} className={'d-flex justify-content-between col-md-6'}>
                                            <span className='col-md-4'>{item.label}</span>
                                            <span className='col-md-8'>
                                                {item.link.length > 0 ?
                                                    <a href={item.link} target="_blank" rel="noreferrer">{item.value}</a>
                                                    :
                                                    item.value
                                                }
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WorkDataModal
                draft={workDataDraft}
                onChangeDraft={setWorkDataDraft}
                onClose={() => setShowWorkDataModal(false)}
                show={showWorkDataModal}
                onSubmit={onSubmitWorkModal}
            />

            <InfoModal
                draft={contactInfoDraft}
                onChangeDraft={setContactInfoDraft}
                onClose={() => setShowContactInfoModal(false)}
                show={showContactInfoModal}
                onSubmit={onSubmitContactInfoModal}
            />

            <InfoModal
                draft={basicInfoDraft}
                onChangeDraft={setBasicInfoDraft}
                onClose={() => setShowBasicInfoModal(false)}
                show={showBasicInfoModal}
                onSubmit={onSubmitBasicInfoModal}
            />

            <SMSModal
                draft={SMSMessage}
                onChangeDraft={setSMSMessage}
                onClose={() => setShowSMSModal(false)}
                show={showSMSModal}
                onSubmit={onSubmitSMSModal}
            />

            <EmailModal
                draft={emailDraft}
                onChangeDraft={setEmailDraft}
                onClose={() => setShowEmailModal(false)}
                show={showEmailModal}
                onSubmit={onSubmitEmailModal}
            />

        </div>
    );
}

export default Profile