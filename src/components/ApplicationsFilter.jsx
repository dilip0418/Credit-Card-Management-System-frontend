/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ApplicationsFilter = ({ filters, onFilterChange }) => {
    return (
        <Form className="mb-3">
            <Row>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Email Contains</Form.Label>
                        <Form.Control
                            type="text"
                            name="emailContains"
                            value={filters.emailContains}
                            onChange={onFilterChange}
                            placeholder="Search by email"
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Applicant Name Contains</Form.Label>
                        <Form.Control
                            type="text"
                            name="applicantFullNameContains"
                            value={filters.applicantFullNameContains}
                            onChange={onFilterChange}
                            placeholder="Search by name"
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Application Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="applicationStatusId"
                            value={filters.applicationStatusId}
                            onChange={onFilterChange}
                        >
                            <option value={0}>All</option>
                            <option value={2}>Applied</option>
                            <option value={3}>Approved</option>
                            <option value={4}>Rejected</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Min Annual Income</Form.Label>
                        <Form.Control
                            type="number"
                            name="minAnnualIncome"
                            value={filters.minAnnualIncome}
                            onChange={onFilterChange}
                            placeholder="Minimum income"
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Max Annual Income</Form.Label>
                        <Form.Control
                            type="number"
                            name="maxAnnualIncome"
                            value={filters.maxAnnualIncome}
                            onChange={onFilterChange}
                            placeholder="Maximum income"
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Date After</Form.Label>
                        <Form.Control
                            type="date"
                            name="applicationDateAfter"
                            value={filters.applicationDateAfter}
                            onChange={onFilterChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Date Before</Form.Label>
                        <Form.Control
                            type="date"
                            name="applicationDateBefore"
                            value={filters.applicationDateBefore}
                            onChange={onFilterChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

export default React.memo(ApplicationsFilter);
