import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type SMSModalProps = {
    draft: string
    onChangeDraft: Dispatch<SetStateAction<string>>
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const SMSModal = ({ draft, onChangeDraft, onSubmit, onClose, show }: SMSModalProps) => {

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Send Text</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mb-3'>
                    <label htmlFor="message" className="form-label">SMS Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        rows={3}
                        placeholder='The Unicorn is the national animal of Scotland'
                        onChange={(e) => onChangeDraft(e.target.value)}
                    />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={onSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SMSModal