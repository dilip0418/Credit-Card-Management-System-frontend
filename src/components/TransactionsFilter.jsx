/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { TRANSACTION_TYPES, CATEGORIES } from '../constants/TransactionConstants.js';

const TransactionsFilter = ({ filters, onFilterChange }) => {

    return (
        <Form className="mb-3">
            <Row>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Transaction Date From</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateAfter"
                            value={filters.dateAfter}
                            onChange={onFilterChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Transaction Date To</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateBefore"
                            value={filters.dateBefore}
                            onChange={onFilterChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Transaction Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="typeId"
                            value={filters.typeId}
                            onChange={onFilterChange}
                        >
                            <option value={0}>All</option>
                            {TRANSACTION_TYPES.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            name="categoryId"
                            value={filters.categoryId}
                            onChange={onFilterChange}
                        >
                            <option value="">All</option>
                            {CATEGORIES.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Minimum Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amountGreaterThan"
                            value={filters.amountGreaterThan}
                            onChange={onFilterChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Maximum Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amountLessThan"
                            value={filters.amountLessThan}
                            onChange={onFilterChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default React.memo(TransactionsFilter);