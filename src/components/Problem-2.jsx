import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ContactModal = ({ showModal, closeModal, modalTitle, contacts, handleContactClick, closeOtherModal }) => {
    const [onlyEven, setOnlyEven] = useState(false);

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    contacts?.map((contact, idx) => (
                        <div className='border text-center  mb-2 p-3' key={idx} onClick={() => handleContactClick(contact)}>
                            <h5>Phone: {contact?.phone}</h5>
                        </div>
                    ))
                }
                <div className='text-center mt-8'>
                    <Button variant=" btn  btn-primary" onClick={() => {closeOtherModal(); closeModal();}} >
                        All Contacts
                    </Button>
                    <Button variant="btn btn-secondary" className='mx-3' onClick={() => {closeOtherModal(); closeModal();}}>
                        US Contacts
                    </Button>
                    <Button variant="danger" onClick={closeModal}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Form.Check
                    type="checkbox"
                    id="onlyEvenCheckbox"
                    label="Only even"
                    checked={onlyEven}
                    onChange={(e) => setOnlyEven(e.target.checked)}
                />
            </Modal.Footer>
        </Modal>
    );
};

const ContactModalC = ({ showModal, closeModal, modalTitle, contacts, handleContactClick }) => {

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-4 border border-5 "  >
                {
                    contacts?.map((contact, idx) => (
                        <div className='text-center p-2 mb-1' key={idx} onClick={() => handleContactClick(contact)}>

                            <h5>id: {contact?.id}</h5>
                            <h5>Phone: {contact?.phone}</h5>

                        </div>
                    ))
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


const Problem2 = () => {

    const [allContacts, setAllContacts] = useState([]);
    const [usContacts, setUsContacts] = useState([]);
    const [modalBVisible, setModalBVisible] = useState(false);
    const [modalCVisible, setModalCVisible] = useState(false);
    const [modalAVisible, setModalAVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const fetchAllContacts = async () => {
        try {
            const response = await fetch('https://contact.mediusware.com/api/contacts/');
            const data = await response.json();
            setAllContacts(data.results);
            const country = allContacts.filter(contact => contact.country.id === 2)
            setUsContacts(country);
        } catch (error) {
            console.error('Error fetching all contacts:', error);
        }
    };

    const loadMoreContacts = async () => {
        //toDo
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setModalCVisible(true);
    };
    useEffect(() => {
        fetchAllContacts();
    }, []);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                <div className="d-flex justify-content-center gap-5">

                    <button className="btn btn-lg  btn-outline-primary" type="button" onClick={() => setModalAVisible(true)}>
                        All Contacts
                    </button>

                    <button className="btn btn-lg  btn-outline-primary" type="button" onClick={() => setModalBVisible(true)}>
                        US Contacts
                    </button>
                </div>

                <ContactModal
                    showModal={modalAVisible}
                    closeModal={() => setModalAVisible(false)}
                    closeOtherModal={() => setModalBVisible(true)}
                    modalTitle="All Contacts"
                    contacts={allContacts}
                    otherContacts={usContacts}
                    handleContactClick={handleContactClick}
                />

                <ContactModal
                    showModal={modalBVisible}
                    closeModal={() => setModalBVisible(false)}
                    closeOtherModal={() => setModalAVisible(true)}
                    modalTitle="US Contacts"
                    contacts={usContacts}
                    otherContacts={allContacts}
                    handleContactClick={handleContactClick}
                />

                <ContactModalC
                    showModal={modalCVisible}
                    closeModal={() => setModalCVisible(false)}
                    modalTitle="Contact Details"
                    contacts={[selectedContact]}
                    handleContactClick={() => { }}
                />
            </div>

        </div>
    );
};

export default Problem2;