/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import TransactionsFilter from './TransactionsFilter';
import TransactionsTable from './TransactionsTable';
import TransactionService from '../services/transactionService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuthContext';

const TransactionsTab = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        totalRecords: 0,
    });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        sortBy: "TransactionDate",
        sortDescending: true,
        amountGreaterThan: '',
        amountLessThan: '',
        dateAfter: '',
        dateBefore: '',
        categoryId: '',
        typeId: '',
        creditCardId: '',
        cardOwnerId: user.id ?? ''
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    const timeoutRef = useRef(null);
    const [filterLoading, setFilterLoading] = useState(false);


    // Sync filters to debouncedFilters with debouncing
    useEffect(() => {
        fetchTransactions();
    }, [pagination.currentPage, pagination.pageSize, debouncedFilters]);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setDebouncedFilters(filters); // Update debounced filters after delay
        }, 500); // 500ms debounce time
        return () => clearTimeout(timeoutRef.current); // Cleanup timeout
    }, [filters]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            // console.log(user);

            const response = await TransactionService.fetchTransactions({
                pageNumber: pagination.currentPage,
                pageSize: pagination.pageSize,
                user: user,
                ...debouncedFilters,
            });

            if (response?.success) {
                // toast.success('Transactions obtained')
                // console.log(response);
                setTransactions(response.data.book);
                setPagination((prev) => ({
                    ...prev,
                    totalPages: response.data.totalPages,
                    totalRecords: response.data.totalRecords,
                }));
            } else {
                setTransactions([]);
                toast.warn('No Transactions yet.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setFilterLoading(false);
        }
    };

    const handlePageChange = (pageNumber) => {
        setPagination((prev) => ({ ...prev, currentPage: pageNumber }));
    };

    const handleSortChange = (sortBy) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy,
            sortDescending: prevFilters.sortBy === sortBy ? !prevFilters.sortDescending : true,
        }));
    };

    const handleFilterChange = useCallback((e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }, []);

    return (
        <div className='my-3'>
            <TransactionsFilter filters={filters} onFilterChange={handleFilterChange} />
            <TransactionsTable
                transactions={transactions}
                loading={loading}
                pagination={pagination}
                handlePageChange={handlePageChange}
                handleSortChange={handleSortChange}
                filters={filters}
            />
        </div>
    );
};

export default TransactionsTab;