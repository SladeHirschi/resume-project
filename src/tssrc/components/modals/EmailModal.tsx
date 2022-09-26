import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type EmailModalProps = {
    draft: {body: string, sender: string}
    onChangeDraft: Dispatch<SetStateAction<{body: string, sender: string}>>
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const EmailModal = ({ draft, onChangeDraft, onSubmit, onClose, show }: EmailModalProps) => {

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Send Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='mb-3'>
                    <label htmlFor="body" className="form-label"></label>
                    <textarea
                        className="form-control"
                        id="body"
                        rows={3}
                        placeholder='Hunting unicorns is legal in Michigan'
                        onChange={(e) => onChangeDraft({...draft, body: e.target.value})}
                    />
                </div>

                <div className='col-md-6'>
                    <label htmlFor="email" className="form-label">Sender Email</label>
                    <input
                        className="form-control"
                        id="email"
                        placeholder='bezos.jeff@amazon.com'
                        onChange={(e) => onChangeDraft({ ...draft, sender: e.target.value })}
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

export default EmailModal