import React, { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
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
                const response = await fetch("http://localhost:8080/api/owner/dashboard/overview");
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
                    <div className="card text-center p-3">
                        <h5>Total Hostlers</h5>
                        <h3>{dashboardData?.totalHostlers ?? "N/A"}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center p-3">
                        <h5>Total Rooms</h5>
                        <h3>{dashboardData?.totalRooms ?? "N/A"}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center p-3 text-success">
                        <h5>Available Rooms</h5>
                        <h3>{dashboardData?.availableRooms ?? "N/A"}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center p-3 text-danger">
                        <h5>Full Rooms</h5>
                        <h3>{dashboardData?.fullRooms ?? "N/A"}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center p-3">
                        <h5>Total Revenue</h5>
                        <h3>{formatCurrency(dashboardData?.totalRevenue)}</h3>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center p-3">
                        <h5>Monthly Revenue</h5>
                        <h3>{formatCurrency(dashboardData?.monthlyRevenue)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;