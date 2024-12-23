/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";
import TransactionService from "../services/transactionService";
import "../styles/SpendAnalysis.css"; // Assuming consistent styles
import { getTooltipStyles, colorPalette } from "../constants/chartTooltipConfig";

const SpendingByTime = ({ userId }) => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hasSufficientData, setHasSufficientData] = useState(false);

    // Generate random colors for categories dynamically
    // Define your color palette


    // Function to generate a color from the palette based on the category name
    const generateColor = (seed) => {
        const index = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0) % colorPalette.length;
        return colorPalette[index];
    };

    const sampleData = [
        { timePeriod: "Jan 2024", Dining: 150, Entertainment: 80, Groceries: 200, Travel: 120 },
        { timePeriod: "Feb 2024", Dining: 180, Entertainment: 100, Groceries: 220, Travel: 140 },
        { timePeriod: "Mar 2024", Dining: 200, Entertainment: 150, Groceries: 250, Travel: 160 },
        { timePeriod: "Apr 2024", Dining: 190, Entertainment: 130, Groceries: 230, Travel: 180 },
    ];

    // Fetch the data from the API
    useEffect(() => {
        const fetchData = async () => {
            const response = await TransactionService.getSummary(userId);
            if (response.success) {
                const formattedData = response.data.map((item) => ({
                    timePeriod: `${item.month.slice(0, 3)} ${item.year}`,
                    [item.categoryName]: item.totalSpend,
                    // Add year and month for sorting
                    year: item.year,
                    month: item.month,
                }));

                // Sort the data by year and month
                formattedData.sort((a, b) => {
                    if (a.year === b.year) {
                        // Month is in string format, so we need to convert it to a number for comparison
                        const monthA = new Date(a.month + ' 1').getMonth();
                        const monthB = new Date(b.month + ' 1').getMonth();
                        return monthA - monthB;
                    } else {
                        return a.year - b.year;
                    }
                });

                // Group data by time period and merge category spend
                const groupedData = Object.values(
                    formattedData.reduce((acc, curr) => {
                        const existing = acc[curr.timePeriod] || { timePeriod: curr.timePeriod };
                        Object.keys(curr).forEach((key) => {
                            if (key !== "timePeriod" && key !== "year" && key !== "month") {
                                existing[key] = (existing[key] || 0) + curr[key];
                            }
                        });
                        acc[curr.timePeriod] = existing;
                        return acc;
                    }, {})
                );
                // console.log(groupedData);


                // Extract unique categories dynamically
                const uniqueCategories = Array.from(
                    new Set(response.data.map((item) => item.categoryName))
                );

                // Use sample data if actual data is insufficient
                if (groupedData.length < 2) {
                    setData(sampleData);
                    setCategories(Object.keys(sampleData[0]).filter((key) => key !== "timePeriod"));
                    setHasSufficientData(false); // Indicating fallback
                } else {
                    setData(groupedData);
                    setCategories(uniqueCategories);
                    setHasSufficientData(true); // Indicating actual data used
                }
            } else {
                // Handle insufficient data case by using sample data
                setData(sampleData);
                setCategories(Object.keys(sampleData[0]).filter((key) => key !== "timePeriod"));
                setHasSufficientData(false);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className="stat-card">
            <h5 className="stat-title">
                Spending Over Time{" "}
                {!hasSufficientData && (
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                        (Showing sample data due to insufficient records)
                    </span>
                )}
            </h5>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <defs>
                        {categories.map((category) => (
                            <linearGradient
                                key={category}
                                id={`color${category}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={generateColor(category)}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={generateColor(category)}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timePeriod" />
                    <YAxis />
                    <Tooltip {...getTooltipStyles()} />
                    <Legend />
                    {categories.map((category) => (
                        <Area
                            key={category}
                            type="monotone"
                            dataKey={category}
                            stroke={generateColor(category)}
                            fill={`url(#color${category})`}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingByTime;
