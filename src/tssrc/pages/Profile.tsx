import { useEffect, useState, FC } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { MdLocationOn, MdTextsms, MdOutlineEmail } from 'react-icons/md';
import { TbBrandGithub } from 'react-icons/tb';
import { HiPencil, HiTrash } from 'react-icons/hi';
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
    id: null | number
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
    const [basicInfoDraft, setBasicInfoDraft] = useState<Info>({ id: null, label: '', value: '', link: '' });
    const [contactInfoDraft, setContactInfoDraft] = useState<Info>({ id: null, label: '', value: '', link: '' });

    const [showSMSModal, setShowSMSModal] = useState<boolean>(false);
    const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
    const [showWorkDataModal, setShowWorkDataModal] = useState<boolean>(false);
    const [showBasicInfoModal, setShowBasicInfoModal] = useState<boolean>(false);
    const [showContactInfoModal, setShowContactInfoModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
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

        await getWorkData();
        await getBasicInfo();
        await getContactInfo();
        await setLoading(false);
    }

    async function onSubmitWorkModal() {
        if (workDataDraft.id) {
            await editWorkData();
        } else {
            await createWorkData()
        }
        setLoading(true);
        setWorkDataDraft(EmptyWorkData);
        setShowWorkDataModal(false);
        await getData();
    }

    async function createWorkData() {
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
    }

    async function editWorkData() {
        var body: string = 'occupation=' + encodeURIComponent(workDataDraft.occupation);
        body += '&company=' + encodeURIComponent(workDataDraft.company);
        body += '&description=' + encodeURIComponent(workDataDraft.description);
        body += '&startDate=' + encodeURIComponent(workDataDraft.startDate);
        body += '&endDate=' + encodeURIComponent(workDataDraft.endDate ?? '');
        body += '&isCurrent=' + encodeURIComponent(workDataDraft.isCurrent ? 1 : 0);
        body += '&type=' + encodeURIComponent(workDataDraft.type);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/workData/' + workDataDraft.id + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
        NotificationManager.success("Work Data updated successfully.", "Success", 3000);
    }

    async function onSubmitContactInfoModal() {
        setLoading(true);
        if (contactInfoDraft.id) {
            await editContactInfo();
        } else {
            await createContactInfo();
        }
        setContactInfoDraft({ id: null, label: '', value: '', link: '' });
        setShowContactInfoModal(false);
        await getData();
    }

    async function createContactInfo() {
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
        NotificationManager.success("Contact Info Added successfully.", "Success", 3000);
    }

    async function editContactInfo() {
        var body: string = 'label=' + encodeURIComponent(contactInfoDraft.label);
        body += '&value=' + encodeURIComponent(contactInfoDraft.value);
        body += '&hyperlink=' + encodeURIComponent(contactInfoDraft.link);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/contactInfo/' + contactInfoDraft.id + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
        NotificationManager.success("Contact Info updated successfully.", "Success", 3000);
    }

    async function onSubmitBasicInfoModal() {
        setLoading(true);
        if (basicInfoDraft.id) {
            await editBasicInfo();
        } else {
            await createBasicInfo();
        }
        setBasicInfoDraft({ id: null, label: '', value: '', link: '' });
        setShowBasicInfoModal(false);
        await getData();
    }

    async function createBasicInfo() {
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
        NotificationManager.success("Basic Info Added successfully.", "Success", 3000);
    }

    async function editBasicInfo() {
        var body: string = 'label=' + encodeURIComponent(basicInfoDraft.label);
        body += '&value=' + encodeURIComponent(basicInfoDraft.value);
        body += '&hyperlink=' + encodeURIComponent(basicInfoDraft.link);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/basicInfo/' + basicInfoDraft.id + '?userId=' + parseJWT(sessionStorage.jwt).userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
        NotificationManager.success("Basic Info updated successfully.", "Success", 3000);
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

    async function deleteBasicInfo(basicInfoId: number) {
        setLoading(true);
        try {
            const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/basicInfo/' + basicInfoId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            await getData();
            NotificationManager.success("Basic Info deleted successfully", "Success", 3000);
        } catch (e) {
            alert(e);
        }
    }

    async function deleteContactInfo(contactInfoId: number) {
        setLoading(true);
        try {
            const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/contactInfo/' + contactInfoId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            await getData();
            NotificationManager.success("Contact Info deleted successfully", "Success", 3000);
        } catch (e) {
            alert(e);
        }
    }

    async function deleteWorkData(workDataId: number) {
        setLoading(true);
        try {
            const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/workData/' + workDataId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            await getData();
            NotificationManager.success("Work Data deleted successfully", "Success", 3000);
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
                        <img src={require('../../assets/slade.jpeg')} width='85%' height='85%' alt="Me" style={{borderRadius: 2}} />
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
                                    <div className="ms-2 d-flex">
                                        <HiPencil size={25} onClick={() => { setShowWorkDataModal(true); setWorkDataDraft(data) }} className='header-home' style={{ marginLeft: '0.25rem' }} />
                                        <HiTrash size={25} onClick={() => deleteWorkData(data.id!)} className='header-home' style={{ marginLeft: '0.25rem' }} />
                                    </div>
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
                                <h3>{
                                    parseJWT(sessionStorage.jwt).firstName != undefined ?
                                        parseJWT(sessionStorage.jwt).firstName + " " + parseJWT(sessionStorage.jwt).lastName
                                        :
                                        parseJWT(sessionStorage.jwt).name
                                }
                                </h3>
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
                                            <div className="d-flex flex-fill align-items-center">
                                                <span className='col-md-8'>
                                                    {item.link?.length > 0 ?
                                                        <a href={item.link} target="_blank" rel="noreferrer">{item.value}</a>
                                                        :
                                                        item.value
                                                    }
                                                </span>
                                                <div className="ms-2 d-flex">
                                                    <HiPencil size={20} onClick={() => { setShowContactInfoModal(true); setContactInfoDraft(item) }} className='header-home' style={{ marginLeft: '0.25rem' }} />
                                                    <HiTrash size={20} onClick={() => deleteContactInfo(item.id!)} className='header-home' style={{ marginLeft: '0.25rem' }} />
                                                </div>
                                            </div>
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
                                            <div className="d-flex flex-fill align-items-center">
                                                <span className='col-md-8'>
                                                    {item.link?.length > 0 ?
                                                        <a href={item.link} target="_blank" rel="noreferrer">{item.value}</a>
                                                        :
                                                        item.value
                                                    }
                                                </span>
                                                <div className="ms-2 d-flex">
                                                    <HiPencil size={20} onClick={() => { setShowBasicInfoModal(true); setBasicInfoDraft(item) }} className='header-home' style={{ marginLeft: '0.25rem' }} />
                                                    <HiTrash size={20} onClick={() => deleteBasicInfo(item.id!)} className='header-home' style={{ marginLeft: '0.25rem' }} />
                                                </div>
                                            </div>
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
                onClose={() => { setShowContactInfoModal(false); setContactInfoDraft({ id: null, label: '', value: '', link: '' }) }}
                show={showContactInfoModal}
                onSubmit={onSubmitContactInfoModal}
            />

            <InfoModal
                draft={basicInfoDraft}
                onChangeDraft={setBasicInfoDraft}
                onClose={() => { setShowBasicInfoModal(false); setBasicInfoDraft({ id: null, label: '', value: '', link: '' }) }}
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