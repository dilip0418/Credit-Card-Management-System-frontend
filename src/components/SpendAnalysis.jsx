import React, { useState } from "react";
import SpendingByCategory from "./SpendingByCategory"; // Component for 'Spending by Category' chart
import SpendingByMonth from "./SpendingByMonth";
import "../styles/SpendAnalysis.css"; // Optional custom styles
import SpendingByTime from "./SpendingByTime";
import { useAuth } from "../context/useAuthContext";

const SpendAnalysis = () => {
  // State for global filters (month/year)
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const { user } = useAuth();

  // Handle filter changes
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  return (
    <div className="card spend-analysis my-3 px-3 pb-3">
      {/* Header */}
      <div className="header text-center mb-4">
        <h2 className="text-primary">Spend Analysis</h2>
        <p className="text-muted">
          Visualize and analyze your spending habits over time.
        </p>
      </div>

      {/* Filters */}
      <div className="filters d-flex justify-content-center mb-4">
        <div className="form-group m-1">
          <label htmlFor="monthSelect">Month</label>
          <select
            id="monthSelect"
            className="form-control"
            value={month || ""}
            onChange={handleMonthChange}
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group m-1">
          <label htmlFor="yearSelect">Year</label>
          <select
            id="yearSelect"
            className="form-control"
            value={year}
            onChange={handleYearChange}
          >
            {Array.from({ length: 15 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visualization Grid */}
      <div className="row">
        {/* Spending by Category */}
        <div className="col-md-6 mb-4">
          <div className="card uniform-card">
            <div className="card-header bg-secondary text-white">
              Spending by Category
            </div>
            <div className="card-body">
              {/* Embedding the 'Spending by Category' component */}
              <SpendingByCategory month={month} year={year} />
              {/* Spending by Category */}
            </div>
          </div>
        </div>

        {/* Monthly Spending Trends */}
        <div className="col-md-6 mb-4">
          <div className="card uniform-card">
            <div className="card-header bg-secondary text-white">
              Monthly Spending Trends
            </div>
            <div className="card-body">
              {/* Embedding the 'Spending Trends' component */}
              <SpendingByMonth year={year} />
            </div>
          </div>
        </div>
      </div>

      {/* Add more sections as needed */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-secondary text-white">
              Additional Stats (e.g., Total Spending, Savings)
            </div>
            <div className="card-body">
              <SpendingByTime userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendAnalysis;
