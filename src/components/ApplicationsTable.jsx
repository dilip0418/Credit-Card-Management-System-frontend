/* eslint-disable react/prop-types */
import React from 'react';
import { Table, Pagination, Button, Spinner } from 'react-bootstrap';
import { Mosaic } from 'react-loading-indicators';

const ApplicationsTable = (
    {
        applications,
        loading,
        pagination,
        handleApprove,
        handleReject,
        handleSortChange,
        handlePageChange,
        filters

    }) => {

    const statusColors = {
        Accepted: "bg-success text-white",
        Applied: "bg-primary text-white",
        Rejected: "bg-danger text-white"
    };

    return (
        <div>
            {loading ? (
                <div className="text-center">
                    <Mosaic />
                </div>
            ) : (
                <div>
                    <div className="overflow-auto">
                        <table className="custom-table custom-table table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSortChange('ApplicationDate')}>
                                        Application Date {filters.sortBy === 'ApplicationDate' ? (filters.sortDescending ? '↓' : '↑') : ''}
                                    </th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Income</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => (
                                    <tr key={application.id}>
                                        <td>{application.applicationDate}</td>
                                        <td>{application.fullName}</td>
                                        <td>{application.email}</td>
                                        <td>{application.phoneNo}</td>
                                        <td>{application.annualIncome}</td>
                                        <td>
                                            <span className={`badge me-1 ${statusColors[application.applicationStatus]}`}>
                                                {application.applicationStatus}
                                            </span>
                                        </td>
                                        <td>
                                            {application.applicationStatusId === 2 ? (
                                                <>
                                                    <Button variant="success" onClick={() => handleApprove(application.id)}>
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            const comment = prompt('Enter rejection comment');
                                                            if (comment) handleReject(application.id, comment);
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            ) : (
                                                <span>{application.rejectionComment || 'No comments'}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination className='float-end'>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.currentPage === pagination.totalPages}
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
                </div>
            )}
        </div>
    );
};

export default React.memo(ApplicationsTable);
