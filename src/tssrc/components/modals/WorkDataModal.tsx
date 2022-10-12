import { Dispatch, SetStateAction } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { WorkDataType } from '../../helpers/types/workDataType';
import moment from 'moment';

type WorkDataProps = {
    draft: WorkDataType
    onChangeDraft: Dispatch<SetStateAction<WorkDataType>>
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const WorkDataModal = ({ draft, onChangeDraft, onSubmit, onClose, show }: WorkDataProps) => {

    function changeType(type: 'work' | 'school'): void {
        onChangeDraft({ ...draft, type: type })
    }

    function makeCurrent(e: any): void {
        if (e.target.checked) {
            onChangeDraft({ ...draft, isCurrent: true })
        } else {
            onChangeDraft({ ...draft, isCurrent: false })
        }
    }

    return (
        <Modal show={show} onHide={onClose} dialogClassName="medium-modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>New Work Entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 row">
                    <div className='col-md-6'>
                        <label htmlFor="occupation" className="form-label">Occupation</label>
                        <input
                            className="form-control"
                            id="occupation"
                            placeholder='Software Engineer'
                            onChange={(e) => onChangeDraft({ ...draft, occupation: e.target.value })}
                            value={draft.occupation}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="company" className="form-label">Company</label>
                        <input
                            className="form-control"
                            id="company"
                            placeholder='Amazon'
                            onChange={(e) => onChangeDraft({ ...draft, company: e.target.value })}
                            value={draft.company}
                        />
                    </div>
                </div>

                <hr />

                <div className='mb-3'>
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows={3}
                        placeholder='Made the coolest app in the world...'
                        onChange={(e) => onChangeDraft({ ...draft, description: e.target.value })}
                        value={draft.description}
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="d-flex align-items-center">
                            <span className='text-nowrap me-3'>Start Date</span>
                            <DatePicker
                                selected={draft.startDate.length > 0 ? new Date(draft.startDate) : new Date()}
                                onChange={(date: Date) => onChangeDraft({ ...draft, startDate: moment(date).format('YYYY/MM/DD') })}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex align-items-center">
                            <span className='text-nowrap me-3'>End Date</span>
                            <DatePicker
                                selected={draft.endDate && draft.endDate.length > 0 ? new Date(draft.endDate) : new Date()}
                                onChange={(date: Date) => onChangeDraft({ ...draft, endDate: moment(date).format('YYYY/MM/DD') })}
                            />
                        </div>
                    </div>
                </div>

                <div className='mb-3 d-flex'>
                    <div className='btn-group'> 
                        <button
                            className={"btn btn-primary" + (draft.type === 'work' ? ' active' : '')}
                            onClick={() => changeType('work')}
                        >Work</button>

                        <button
                            className={"btn btn-primary" + (draft.type === 'school' ? ' active' : '')}
                            onClick={() => changeType('school')}
                        >School</button>
                    </div>
                </div>

                <div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={draft.isCurrent === true}
                            id="current"
                            onChange={(e) => makeCurrent(e)}
                        />
                        <label className="form-check-label" htmlFor="current">
                            Current Job
                        </label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={onSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WorkDataModal