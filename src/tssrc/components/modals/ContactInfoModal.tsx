import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type Info = {
    label: string
    value: string
    link: string
}

type ContactInfoProps = {
    draft: Info
    onChangeDraft: Dispatch<SetStateAction<Info>>
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const ContactInfoModal = ({ draft, onChangeDraft, onSubmit, onClose, show }: ContactInfoProps) => {

    const [showHyperLink, setShowHyperLink] = useState<boolean>(false);

    useEffect(() => {console.log(showHyperLink)}, [showHyperLink])

    return (
        <Modal show={show} onHide={() => {onClose(); setShowHyperLink(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Contact Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 row">
                    <div className='col-md-6'>
                        <label htmlFor="label" className="form-label">Label</label>
                        <input
                            className="form-control"
                            id="label"
                            placeholder='Phone'
                            onChange={(e) => onChangeDraft({ ...draft, label: e.target.value })}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="value" className="form-label">Value</label>
                        <input
                            className="form-control"
                            id="value"
                            placeholder='(123) 456-7890'
                            onChange={(e) => onChangeDraft({ ...draft, value: e.target.value })}
                        />
                    </div>
                </div>


                <div className="row align-items-center">
                    <div className='col-md-6'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="addHyperlink" onChange={(e) => setShowHyperLink(e.target.checked)} />
                            <label className="form-check-label" htmlFor="addHyperlink">Add Hyperlink</label>
                        </div>
                    </div>
                    {showHyperLink && 
                        <div className='col-md-6'>
                            <input
                                className="form-control"
                                id="value"
                                placeholder='https://example.com'
                                onChange={(e) => onChangeDraft({ ...draft, link: e.target.value })}
                            />
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {onClose(); setShowHyperLink(false)}}>Close</Button>
                <Button variant="primary" onClick={() => {onSubmit(); setShowHyperLink(false)}}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ContactInfoModal