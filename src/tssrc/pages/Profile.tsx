import { useEffect, useState, FC } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { MdLocationOn, MdTextsms, MdOutlineEmail } from 'react-icons/md';
import { TbBrandGithub } from 'react-icons/tb';
import { NotificationManager } from 'react-notifications';

import { WorkDataType, EmptyWorkData } from "../helpers/types/workDataType";
import WorkDataModal from "../components/modals/WorkDataModal";
import InfoModal from "../components/modals/InfoModal";
import SMSModal from "../components/modals/SMSModal";
import EmailModal from "../components/modals/EmailModal";
import defaultFetch from "../helpers/fetch/defaultFetch";
import parseJWT from "../helpers/fetch/jwt";
import moment from "moment";

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

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, [])

    function getData(): void {
        setLoading(true);
        const getWorkData = async (): Promise<void> => {
            const response: any = await defaultFetch(process.env.REACT_APP_BASE_URL + '/getWorkData?userId=' + parseJWT(sessionStorage.jwt).userId, {
                method: 'GET',
                headers: {
                    'Content-type': 'x-www-form-urlencoded'
                },
            });
            var workDataResponse = await response.json();
            setWorkData(workDataResponse.workData);
        }

        const getBasicInfo = async (): Promise<void> => {
            const response: any = await defaultFetch(process.env.REACT_APP_BASE_URL + '/getBasicInfo?userId=' + parseJWT(sessionStorage.jwt).userId, {
                method: 'GET',
                headers: {
                    'Content-type': 'x-www-form-urlencoded'
                },
            });
            var basicInfoResponse = await response.json();
            setBasicInfo(basicInfoResponse.basicInfo)
        }

        const getContactInfo = async (): Promise<void> => {
            const response: any = await defaultFetch(process.env.REACT_APP_BASE_URL + '/getContactInfo?userId=' + parseJWT(sessionStorage.jwt).userId, {
                method: 'GET',
                headers: {
                    'Content-type': 'x-www-form-urlencoded'
                },
            });
            var contactInfoResponse = await response.json();
            setContactInfo(contactInfoResponse.contactInfo)
        }

        getWorkData();
        getBasicInfo();
        getContactInfo();
        setLoading(false);
    }

    async function onSubmitWorkModal() {
        setLoading(true);
        var body: string = 'occupation=' + encodeURIComponent(workDataDraft.occupation);
        body += '&company=' + encodeURIComponent(workDataDraft.company);
        body += '&description=' + encodeURIComponent(workDataDraft.description);
        body += '&startDate=' + encodeURIComponent(workDataDraft.startDate);
        body += '&endDate=' + encodeURIComponent(workDataDraft.endDate ?? '');
        body += '&isCurrent=' + encodeURIComponent(workDataDraft.isCurrent ? 1 : 0);
        body += '&type=' + encodeURIComponent(workDataDraft.type);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/workData?userId=' + parseJWT(sessionStorage.jwt).userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
        setWorkDataDraft(EmptyWorkData);
        setShowWorkDataModal(false);
        getData();
        NotificationManager.success("Work Info Added successfully.", "Success", 3000);
    }

    async function onSubmitContactInfoModal() {
        setLoading(true);
        var body: string = 'label=' + encodeURIComponent(contactInfoDraft.label);
        body += '&value=' + encodeURIComponent(contactInfoDraft.value);
        body += '&hyperlink=' + encodeURIComponent(contactInfoDraft.link);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/contactInfo?userId=' + parseJWT(sessionStorage.jwt).userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
        setContactInfoDraft({ label: '', value: '', link: '' });
        setShowContactInfoModal(false);
        getData();
        NotificationManager.success("Contact Info Added successfully.", "Success", 3000);
    }

    async function onSubmitBasicInfoModal() {
        setLoading(true);
        var body: string = 'label=' + encodeURIComponent(basicInfoDraft.label);
        body += '&value=' + encodeURIComponent(basicInfoDraft.value);
        body += '&hyperlink=' + encodeURIComponent(basicInfoDraft.link);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/basicInfo?userId=' + parseJWT(sessionStorage.jwt).userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
        setBasicInfoDraft({ label: '', value: '', link: '' });
        setShowBasicInfoModal(false);
        getData();
        NotificationManager.success("Basic Info Added successfully.", "Success", 3000);
    }

    async function onSubmitSMSModal() {
        setLoading(true);
        var body: string = 'message=' + encodeURIComponent(SMSMessage);
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL + '/sendSMS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            });
            setShowSMSModal(false);
            getData();
            NotificationManager.success("Thank you for the text message!", "Success", 3000);
        } catch (e) {
            alert(e);
        }
    }

    async function onSubmitEmailModal() {
        setLoading(true);
        var body: string = 'body=' + encodeURIComponent(emailDraft.body);
        body += '&sender=' + encodeURIComponent(emailDraft.sender);
        try {
            const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            });
            setShowEmailModal(false);
            getData();
            NotificationManager.success("Thank you for the email!", "Success", 3000);

        } catch (e) {
            alert(e);
        }
    }

    if (loading) {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                <div className='spinner'></div>
            </div>
        );
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
                                        {data.isCurrent ? <span className="work-data-card-title-current">Current</span> : null}
                                    </div>
                                    <div className='work-data-card-subtitle'>{data.company}</div>
                                    <div className='work-data-card-date'>
                                        <span>{moment(data.startDate).format('MMMM Do, YYYY') + ' - ' + (!data.isCurrent ? moment(data.endDate).format('MMMM Do, YYYY') : '(current)')}</span>
                                    </div>
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
                                <h3>{parseJWT(sessionStorage.jwt).firstName + " " + parseJWT(sessionStorage.jwt).lastName}</h3>
                                <div style={{ fontSize: '1.25rem', marginLeft: '1rem', display: 'flex' }}>
                                    <MdLocationOn />
                                    <h6 style={{ color: 'gray' }}>Washington, UT</h6>
                                </div>
                            </div>

                            <h5 style={{ color: 'rgb(33, 188, 240)' }}>Software Developer</h5>

                            {parseJWT(sessionStorage.jwt).firstName == 'Slade' && <div className='row gx-3 gy-1 col-md-6 mb-5'>
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
                                    <a
                                        className='btn btn-dark d-flex align-items-center w-100 fit-content-desktop'
                                        href="https://github.com/SladeHirschi"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <TbBrandGithub />
                                        <span style={{ fontSize: '0.85rem' }} className='ms-2'>View GitHub</span>
                                    </a>
                                </div>
                            </div>}
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
                                                {item.link?.length > 0 ?
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
                                                {item.link?.length > 0 ?
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
                onClose={() => { setShowWorkDataModal(false); setWorkDataDraft(EmptyWorkData) }}
                show={showWorkDataModal}
                onSubmit={onSubmitWorkModal}
            />

            <InfoModal
                draft={contactInfoDraft}
                onChangeDraft={setContactInfoDraft}
                onClose={() => { setShowContactInfoModal(false); setContactInfoDraft({ label: '', value: '', link: '' }) }}
                show={showContactInfoModal}
                onSubmit={onSubmitContactInfoModal}
            />

            <InfoModal
                draft={basicInfoDraft}
                onChangeDraft={setBasicInfoDraft}
                onClose={() => { setShowBasicInfoModal(false); setContactInfoDraft({ label: '', value: '', link: '' }) }}
                show={showBasicInfoModal}
                onSubmit={onSubmitBasicInfoModal}
            />

            <SMSModal
                draft={SMSMessage}
                onChangeDraft={setSMSMessage}
                onClose={() => { setShowSMSModal(false); setSMSMessage('') }}
                show={showSMSModal}
                onSubmit={onSubmitSMSModal}
            />

            <EmailModal
                draft={emailDraft}
                onChangeDraft={setEmailDraft}
                onClose={() => { setShowEmailModal(false); setEmailDraft({ body: '', sender: '' }) }}
                show={showEmailModal}
                onSubmit={onSubmitEmailModal}
            />

        </div>
    );
}

export default Profile