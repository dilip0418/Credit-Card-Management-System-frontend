/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { FaSortUp, FaSortDown } from 'react-icons/fa'; // For sorting arrows
import '../styles/TransactionsTable.css'
import { OrbitProgress } from 'react-loading-indicators';

const TransactionsTable = ({
    transactions,
    loading,
    pagination,
    handlePageChange,
    handleSortChange,
    filters,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    const handleShowModal = (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="transactions-table-container">
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden"><OrbitProgress /> </span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="overflow-auto">
                        <table className="custom-table custom-table table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th
                                        onClick={() => handleSortChange('TransactionDate')}
                                        className="sortable-column"
                                    >
                                        Transaction Date{' '}
                                        {filters.sortBy === 'TransactionDate' &&
                                            (filters.sortDescending ? (
                                                <FaSortDown />
                                            ) : (
                                                <FaSortUp />
                                            ))}
                                    </th>
                                    <th>Category</th>
                                    <th
                                        onClick={() => handleSortChange('Amount')}
                                        className="sortable-column"
                                    >
                                        Amount{' '}
                                        {filters.sortBy === 'Amount' &&
                                            (filters.sortDescending ? (
                                                <FaSortDown />
                                            ) : (
                                                <FaSortUp />
                                            ))}
                                    </th>
                                    <th>Description</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.transactionId}>
                                        <td>{transaction.transactionDate}</td>
                                        <td>{transaction.categoryName}</td>
                                        <td
                                            className={
                                                transaction.ttid === 1
                                                    ? 'text-danger'
                                                    : transaction.ttid === 2
                                                        ? 'text-success'
                                                        : ''
                                            }
                                        >
                                            ₹{transaction.amount}
                                        </td>
                                        <td>{transaction.descritption}</td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => handleShowModal(transaction)}
                                            >
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <Pagination className="float-end">
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                        />
                        {[...Array(pagination.totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === pagination.currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(pagination.totalPages)}
                            disabled={pagination.currentPage === pagination.totalPages}
                        />
                    </Pagination>

                    {/* Modal for Transaction Details */}
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Transaction Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Transaction ID:</strong> {selectedTransaction.transactionId}</p>
                            <p><strong>Transaction Date:</strong> {selectedTransaction.transactionDate}</p>
                            <p><strong>Transaction Type:</strong> {selectedTransaction.ttName}</p>
                            <p><strong>Category:</strong> {selectedTransaction.categoryName}</p>
                            <p>
                                <strong>Amount:</strong>
                                <span
                                    className={
                                        selectedTransaction.ttid === 1
                                            ? 'text-danger'
                                            : selectedTransaction.ttid === 2
                                                ? 'text-success'
                                                : ''
                                    }
                                >
                                    ₹{selectedTransaction.amount}
                                </span>
                            </p>
                            <p><strong>Description:</strong> {selectedTransaction.descritption}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default React.memo(TransactionsTable);
