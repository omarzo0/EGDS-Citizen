import React, { useState, useEffect } from "react";
import { CardContent } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";

function Digitalwallet() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authState = useSelector((state) => state.auth);
  const citizenId = authState?.citizenId || localStorage.getItem("citizenId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/citizen/payment-citizen/${citizenId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setPayments(data.data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [citizenId, token]);

  const getPaymentStatus = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <span className="badge badge-success">Paid</span>;
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "failed":
        return <span className="badge badge-error">Failed</span>;
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    return moment(new Date(dateString)).format("DD MMM YYYY");
  };

  if (loading) {
    return (
      <CardContent>
        <div className="text-center">Loading payment history...</div>
      </CardContent>
    );
  }

  if (payments.length === 0) {
    return (
      <CardContent>
        <div className="text-center py-8">
          <div className="text-xl font-medium text-gray-500 mb-2">
            No payments found
          </div>
          <p className="text-gray-400">
            You haven't made any payments yet. Your payment history will appear
            here.
          </p>
        </div>
      </CardContent>
    );
  }

  return (
    <CardContent>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Payment Date</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>
                  {payment.invoice_number ||
                    `#${Math.floor(Math.random() * 10000)}`}
                </td>
                <td>{formatDate(payment.payment_date)}</td>
                <td>{payment.service?.name || "Unknown Service"}</td>
                <td>
                  {payment.amount
                    ? `${payment.amount} ${payment.currency || "EGP"}`
                    : "N/A"}
                </td>
                <td>{getPaymentStatus(payment.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  );
}

export default Digitalwallet;
