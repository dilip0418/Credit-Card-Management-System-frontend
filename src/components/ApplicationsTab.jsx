/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import CreditCardApplicationsService from '../services/creditCardApplicationsService';
import ApplicationsFilter from './ApplicationsFilter';
import ApplicationsTable from './ApplicationsTable';

const ApplicationsTab = () => {
    const [applications, setApplications] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        totalRecords: 0,
    });
    const [loading, setLoading] = useState(false);

    // Main filters and debouncedFilters states
    const [filters, setFilters] = useState({
        emailContains: '',
        phoneNoContains: '',
        applicantFullNameContains: '',
        applicationDateBefore: '',
        applicationDateAfter: '',
        minAnnualIncome: '',
        maxAnnualIncome: '',
        applicationStatusId: 0,
        sortBy: 'ApplicationDate',
        sortDescending: true,
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters); // Separate state for debouncing

    const timeoutRef = useRef(null);

    useEffect(() => {
        // This effect runs whenever `debouncedFilters` or pagination changes
        fetchApplications();
    }, [pagination.currentPage, pagination.pageSize, debouncedFilters]);

    // Sync filters to debouncedFilters with debouncing
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setDebouncedFilters(filters); // Update debounced filters after delay
        }, 500); // 500ms debounce time
        return () => clearTimeout(timeoutRef.current); // Cleanup timeout
    }, [filters]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await CreditCardApplicationsService.getAllApplicationsPaged({
                pageNumber: pagination.currentPage,
                pageSize: pagination.pageSize,
                ...debouncedFilters, // Use debounced filters here
            });

            if (response?.success) {
                setApplications(response.data.book);
                setPagination((prev) => ({
                    ...prev,
                    totalPages: response.data.totalPages,
                    totalRecords: response.data.totalRecords,
                }));
            } else {
                setApplications([]);
                toast.info('No applications found.');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateApplicationStatus = async (id, status, comment = '') => {
        try {
            const response = await CreditCardApplicationsService.updateApplicationStatus(id, status, comment);
            if (response.success) {
                toast.success(`Application ${status === 3 ? 'approved' : 'rejected'} successfully`);
                fetchApplications(); // Refresh the applications list
            } else {
                toast.error(`Failed to ${status === 3 ? 'approve' : 'reject'} the application`);
            }
        } catch (error) {
            toast.error(`Failed to ${status === 3 ? 'approve' : 'reject'} the application`);
        }
    };

    const handleApprove = async (id) => {
        await updateApplicationStatus(id, 3);
    };

    const handleReject = async (id) => {
        const comment = prompt('Enter rejection comment');
        if (comment) {
            await updateApplicationStatus(id, 4, comment);
        }
    };

    const handleFilterChange = useCallback((e) => {
        const { name, value } = e.target;

        // Update the filters state immediately (this will update the UI instantly)
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }, []);

    const handleSortChange = (sortBy) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy,
            sortDescending: prevFilters.sortBy === sortBy ? !prevFilters.sortDescending : true,
        }));
    };

    const handlePageChange = (pageNumber) => {
        setPagination((prev) => ({ ...prev, currentPage: pageNumber }));
    };

    return (
        <div>
            <ApplicationsFilter filters={filters} onFilterChange={handleFilterChange} />
            <ApplicationsTable
                applications={applications}
                loading={loading}
                pagination={pagination}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleSortChange={handleSortChange}
                handlePageChange={handlePageChange}
                filters={filters}
            />
        </div>
    );
};

export default ApplicationsTab;
