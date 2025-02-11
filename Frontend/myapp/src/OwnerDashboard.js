import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const formatCurrency = (value) => {
    if (value == null) return "₹0.00";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(value);
};

const OwnerDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("http://localhost:8160/auth/api/owner/dashboard/overview");
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Owner Dashboard Overview</h1>
            <div className="row g-4">
                <div className="col-md-4">
                    <Card className="text-center p-4 border shadow-sm hover-effect bg-white">
                        <Card.Body>
                            <Card.Title className="text-black">Total Hostlers</Card.Title>
                            <Card.Text className="display-4 text-black">{dashboardData?.totalHostlers ?? "N/A"}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="text-center p-4 border shadow-sm hover-effect bg-white">
                        <Card.Body>
                            <Card.Title className="text-black">Total Rooms</Card.Title>
                            <Card.Text className="display-4 text-black">{dashboardData?.totalRooms ?? "N/A"}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="text-center p-4 border shadow-sm hover-effect bg-white">
                        <Card.Body>
                            <Card.Title className="text-success">Available Rooms</Card.Title>
                            <Card.Text className="display-4 text-black">{dashboardData?.availableRooms ?? "N/A"}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="text-center p-4 border shadow-sm hover-effect bg-white">
                        <Card.Body>
                            <Card.Title className="text-danger">Full Rooms</Card.Title>
                            <Card.Text className="display-4 text-black">{dashboardData?.fullRooms ?? "N/A"}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="text-center p-4 border shadow-sm hover-effect bg-white">
                        <Card.Body>
                            <Card.Title className="text-black">Total Revenue</Card.Title>
                            <Card.Text className="display-4 text-black">{formatCurrency(dashboardData?.totalRevenue)}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card className="text-center p-4 border shadow-sm hover-effect bg-white">
                        <Card.Body>
                            <Card.Title className="text-black">Monthly Revenue</Card.Title>
                            <Card.Text className="display-4 text-black">{formatCurrency(dashboardData?.monthlyRevenue)}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;