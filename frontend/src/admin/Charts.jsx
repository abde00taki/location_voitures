import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

const Charts = () => {
    const [cars, setCars] = useState([]);
    const [rents, setRents] = useState([]);
    const [users, setUsers] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [timeRange, setTimeRange] = useState('month');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch cars data
                const carsResponse = await axios.get('http://localhost:8888/cars');
                setCars(carsResponse.data);

                // Fetch rents data
                const rentsResponse = await axios.get('http://localhost:8888/rent');
                setRents(rentsResponse.data);

                // Fetch users data
                const usersResponse = await axios.get('http://localhost:8888/users');
                setUsers(usersResponse.data);

                // Try to fetch ratings data, but don't fail if endpoint doesn't exist
                try {
                    const ratingsResponse = await axios.get('http://localhost:8888/ratings');
                    setRatings(ratingsResponse.data);
                } catch (ratingsError) {
                    console.warn('Ratings endpoint not available, using car.star instead');
                    setRatings([]); // Empty array as fallback
                }
            } catch (error) {
                console.error('Error loading data:', error);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <Typography>Loading data...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Process data for charts
    const carBrands = [...new Set(cars.map(car => car.marque))];
    const carBrandCount = carBrands.map(brand => ({
        brand,
        count: cars.filter(car => car.marque === brand).length
    }));

    const rentStatusCount = [
        { status: 'pending', count: rents.filter(rent => rent.status === 'pending').length },
        { status: 'accepted', count: rents.filter(rent => rent.status === 'accepted').length },
        { status: 'rejected', count: rents.filter(rent => rent.status === 'rejected').length },
        { status: 'cancellation', count: rents.filter(rent => rent.status === 'drop').length }
    ];

    const userRoles = [...new Set(users.map(user => user.role))];
    const userRoleCount = userRoles.map(role => ({
        role,
        count: users.filter(user => user.role === role).length
    }));

    // Use car.star if ratings endpoint isn't available
    const averageRatings = cars.map(car => ({
        marque: car.marque,
        rating: car.star || 0
    }));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Car Rental Analytics
            </Typography>

            <FormControl sx={{ minWidth: 120, mb: 3 }}>
                <InputLabel>Time Range</InputLabel>
                <Select
                    value={timeRange}
                    label="Time Range"
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <MenuItem value="day">Daily</MenuItem>
                    <MenuItem value="week">Weekly</MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                    <MenuItem value="year">Yearly</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 3 }}>
                {/* Car Brands Distribution */}
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Car Brands Distribution
                    </Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: carBrandCount.map(item => item.brand) }]}
                        series={[{ data: carBrandCount.map(item => item.count) }]}
                        height={300}
                    />
                </Paper>

                {/* Rental Status */}
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Rental Status Distribution
                    </Typography>
                    <PieChart
                        series={[
                            {
                                data: rentStatusCount.map((item, index) => ({
                                    id: index,
                                    value: item.count,
                                    label: item.status
                                })),
                                innerRadius: 60,
                            },
                        ]}
                        height={300}
                    >
                        <PieCenterLabel>Total: {rents.length}</PieCenterLabel>
                    </PieChart>
                </Paper>

                {/* User Roles */}
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        User Roles Distribution
                    </Typography>
                    <PieChart
                        series={[
                            {
                                data: userRoleCount.map((item, index) => ({
                                    id: index,
                                    value: item.count,
                                    label: item.role
                                })),
                            },
                        ]}
                        height={300}
                    />
                </Paper>

                {/* Car Ratings */}
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Average Car Ratings
                    </Typography>
                    <LineChart
                        xAxis={[{ scaleType: 'band', data: averageRatings.map(item => item.marque) }]}
                        series={[{ data: averageRatings.map(item => item.rating) }]}
                        height={300}
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default Charts;