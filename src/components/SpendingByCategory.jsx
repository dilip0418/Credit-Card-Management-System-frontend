/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import TransactionService from "../services/transactionService"; // Service for API calls
import '../styles/SpendAnalysis.css';
import { getTooltipStyles } from "../constants/chartTooltipConfig";
import { useAuth } from "../context/useAuthContext";

const SpendingByCategory = ({ month, year }) => {

    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [hasSufficientData, setHasSufficientData] = useState(true); // New flag

    useEffect(() => {
        const fetchData = async () => {
            const response = await TransactionService.getByCategory(user.id, month, year);
            if (response.success) {
                const formattedData = response.data.map((item) => ({
                    category: item.categoryName,
                    totalSpend: parseFloat(item.totalSpend.toFixed(2)),
                }));

                // Check constraints: at least 2 categories and non-trivial spending
                if (formattedData.length < 2 || formattedData.every((item) => item.totalSpend < 10)) {
                    setHasSufficientData(false);
                } else {
                    setData(formattedData);
                    setHasSufficientData(true);
                }
            } else {
                console.error(response.message);
                setHasSufficientData(false);
            }
        };

        fetchData();
    }, [month, year]);


    return (
        <div className="stat-card">
            <h3 className="stat-title">Spending by Category</h3>
            {hasSufficientData ? (
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis
                            dataKey="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 14,
                                fill: "#6c757d",
                            }}
                            angle={-45}
                            textAnchor="end"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 14, fill: "#6c757d" }}
                        />
                        <Tooltip
                            {...getTooltipStyles()}
                        />
                        <Legend
                            align="right"
                            verticalAlign="top"
                            wrapperStyle={{
                                fontSize: "14px",
                                color: "#6c757d",
                                marginBottom: "10px",
                            }}
                        />
                        <Bar
                            dataKey="totalSpend"
                            fill="#8884d8"
                            radius={[5, 5, 0, 0]}
                            animationDuration={1000}
                        />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="stat-fallback">Not enough data to display this stat.</p>
            )}
        </div>
    );
};

export default SpendingByCategory;
