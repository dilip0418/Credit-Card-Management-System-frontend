import React, { useState, useEffect } from 'react';
import CreditCardApplicationsService from '../services/creditCardApplicationsService';
import { Button, Pagination, Table, Modal } from 'react-bootstrap';
import MailCraftingForm from './MailCraftingForm';
import ContactService from '../services/cotactService';
import { toast } from 'react-toastify';
import { ThreeDot } from 'react-loading-indicators';
import '../styles/UserListTab.css'

function UserListTab() {
    const [userCreditCardStatuses, setUserCreditCardStatuses] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMailCraftingForm, setShowMailCraftingForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        const fetchUserCreditCardStatuses = async () => {
            setLoading(true);
            try {
                const response = await CreditCardApplicationsService.getUserCreditCardStatuses(pageNumber, pageSize);
                // console.log(response.data);
                setTotalPages(response.data.totalPages)
                setUserCreditCardStatuses(response.data.book);
                // console.log(response.data.book);
                setTotalRecords(response.totalRecords);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCreditCardStatuses();
    }, [pageNumber, pageSize]);



    const handleMailCraftingFormOpen = (user) => {
        setSelectedUser(user);
        setShowMailCraftingForm(true);
    };

    const handleMailCraftingFormClose = () => {
        setShowMailCraftingForm(false);
    };


    function isEmpty(str) {
        return (!str || str.length === 0);
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    const handleSendMail = async (mail) => {
        try {
            // Validate for emptiness
            if (isEmpty(mail.subject)) {
                toast.error('Subject is empty');
                return;
            }
            if (isEmpty(mail.content)) {
                toast.error('Body is empty');
                return;
            }


            // Call API to send mail to selected user
            const response = await ContactService.sendMailFromAdmin({
                email: selectedUser.email,
                subject: mail.subject,
                content: mail.content,
            });
            if (response.success)
                toast.success(response.message);
            else
                toast.error(response.message)
        } catch (error) {
            toast.error('Error sending mail!');
        }
    };

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPageNumber(1); // Reset page number when page size changes
    };

    return (
        <div>
            {loading ? (
                <ThreeDot />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <select className='mb-3' value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}>
                        <option value="10">10 records per page</option>
                        <option value="20">20 records per page</option>
                        <option value="50">50 records per page</option>
                    </select>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                        <Table className="modern-table" striped hover>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Credit Card Status</th>
                                    <th>Application Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(userCreditCardStatuses != null) ? userCreditCardStatuses.map((status) => (
                                    <tr key={status.userId} className="table-row">
                                        <td>{status.fullName}</td>
                                        <td>
                                            <span className={`status-badge ${(status.status === "HasCreditCard") ? (status.status === "Pending") ? "badge-primary" : "badge-active" : "badge-inactive"}`}>
                                                {status.status}
                                            </span>
                                        </td>
                                        <td>{status.applicationStatus ?? "Not Applied"}</td>
                                        <td>
                                            <Button variant="outline-primary" size="sm" className="send-mail-btn" onClick={() => handleMailCraftingFormOpen(status)}>
                                                Send Mail
                                            </Button>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan="4" className="text-center">No Data Available</td>
                                </tr>}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination className='float-end'>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={totalPages === 1 || pageNumber === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(pageNumber - 1)} disabled={totalPages === 1 || pageNumber === 1} />
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <Pagination.Item key={page} active={page === pageNumber} onClick={() => handlePageChange(page)}>
                                {page}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(pageNumber + 1)} disabled={totalPages === 1 || pageNumber === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={totalPages === 1 || pageNumber === totalPages} />
                    </Pagination>
                    <Modal show={showMailCraftingForm} onHide={handleMailCraftingFormClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Send Mail to {selectedUser?.fullName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MailCraftingForm handleSendMail={handleSendMail} handleClose={handleMailCraftingFormClose} />
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default UserListTab;