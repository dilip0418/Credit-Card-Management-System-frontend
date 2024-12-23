/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const MailCraftingForm = ({ handleSendMail, handleClose }) => {
    const [mail, setMail] = useState({
        subject: '',
        content: '',
    });

    const handleChange = (e) => {
        setMail({ ...mail, [e.target.name]: e.target.value });
    };

    const handleSendMailClick = () => {
        handleSendMail(mail);
        handleClose();
    };

    const textareaStyle = {
        resize: 'none',
        overflowY: 'scroll',
        width: '100%',
        height: '200px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
    };

    return (
        <div>
            <label>Subject:</label>
            <input type="text" name="subject" value={mail.subject} onChange={handleChange} />
            <br />
            <label>Mail Content:</label>
            <textarea name="content" style={textareaStyle} className="w-100 ms-1" value={mail.content} onChange={handleChange} />
            <br />
            <Button variant="primary" onClick={handleSendMailClick}>
                Send Mail
            </Button>
        </div>
    );


}

export default MailCraftingForm
