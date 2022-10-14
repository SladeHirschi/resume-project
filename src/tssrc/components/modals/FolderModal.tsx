import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsFolderFill } from 'react-icons/bs'

interface folder {
    id: null | number
    name: string
}

type FolderProps = {
    name: string
    onChangeName: Dispatch<SetStateAction<string>>
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const FolderModal = ({ name, onChangeName, onSubmit, onClose, show }: FolderProps) => {

    return (
        <Modal show={show} onHide={() => onClose()}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className='row d-flex justify-content-center'>
                    <div style={{width: 'fit-content'}} className='mb-3'>
                        <div 
                            style={{backgroundColor: '#d1d1d1', borderRadius: '50%', width: '150%', height: '150%'}}
                            className='d-flex justify-content-center align-items-center'
                        >
                            <div>
                                <BsFolderFill size={35}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className='col'>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            className="form-control"
                            id="name"
                            placeholder='Software Skills'
                            onChange={(e) => onChangeName(e.target.value)}
                            value={name}
                            autoFocus
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                <Button variant="primary" onClick={() => onSubmit()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FolderModal