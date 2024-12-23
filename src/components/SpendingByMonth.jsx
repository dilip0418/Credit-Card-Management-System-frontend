/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import TransactionService from "../services/transactionService"; // Service for API calls
import { useAuth } from "../context/useAuthContext";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import "../styles/SpendAnalysis.css"; // Reusable styles
import { getTooltipStyles } from "../constants/chartTooltipConfig";

const SpendingByMonth = ({ year }) => {
    const [data, setData] = useState([]);
    const [hasSufficientData, setHasSufficientData] = useState(true); // Flag for data check
    const { user } = useAuth();

    // Sample data fallback for when API returns insufficient data
    const sampleData = [
        { month: "Jan", monthSpend: 150 },
        { month: "Feb", monthSpend: 200 },
        { month: "Mar", monthSpend: 250 },
        { month: "Apr", monthSpend: 180 },
        { month: "May", monthSpend: 220 },
        { month: "Jun", monthSpend: 210 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const userId = user.id; // Replace with actual user ID
            const response = await TransactionService.getSpendingByMonth(userId, year);

            if (response.success) {
                const formattedData = response.data.map((item) => ({
                    month: item.month.slice(0, 3),
                    monthSpend: parseFloat(item.monthSpend.toFixed(2)),
                }));

                // console.log(formattedData);

                // Check constraints: at least 2 months and non-trivial spending
                if (formattedData.length < 2 || formattedData.every((item) => item.monthSpend < 10)) {
                    // setHasSufficientData(false);
                    setData(sampleData); // Render sample data if not enough data
                } else {
                    setData(formattedData);
                    setHasSufficientData(true);
                }
            } else {
                console.error(response.message);
                setHasSufficientData(false);
                setData(sampleData); // Fallback to sample data if API call fails
            }
        };

        fetchData();
    }, [year]);

    return (
        <div className="stat-card">
            <h3 className="stat-title">Spending by Month</h3>
            {hasSufficientData ? (
                <div style={{ width: "100%", overflowX: "auto" }}>
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                            <XAxis
                                dataKey="month"
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
                            <Area
                                type="monotone"
                                dataKey="monthSpend"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.3}
                                animationDuration={1500} // Animation duration in milliseconds
                                animationEasing="ease-out" // Easing function
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className="stat-fallback">Not enough data to display this stat.</p>
            )
            }
        </div >
    );
};

export default SpendingByMonth;