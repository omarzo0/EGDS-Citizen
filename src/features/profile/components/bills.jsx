import React, { useState } from "react";
import { CardContent } from "@mui/material";
import moment from "moment";

function Digitalwallet() {
  const BILLS = [
    {
      invoiceNo: "#4567",
      amount: "23,989",
      description: "National ID renewed",
      status: "Pending",
      generatedOn: moment(new Date())
        .add(-30 * 1, "days")
        .format("DD MMM YYYY"),
      paidOn: "-",
    },

    {
      invoiceNo: "#4523",
      amount: "34,989",
      description: "New Passport ",
      status: "Pending",
      generatedOn: moment(new Date())
        .add(-30 * 2, "days")
        .format("DD MMM YYYY"),
      paidOn: "-",
    },

    {
      invoiceNo: "#4453",
      amount: "39,989",
      description: "Birth certificate",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 3, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 2, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#4359",
      amount: "28,927",
      description: "Driver licenses",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 4, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 3, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#3359",
      amount: "28,927",
      description: "vehicle registration",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 5, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 4, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#3367",
      amount: "28,927",
      description: "Tax filling",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 6, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 5, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#3359",
      amount: "28,927",
      description: "property Title",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 7, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 6, "days")
        .format("DD MMM YYYY"),
    },

    {
      invoiceNo: "#2359",
      amount: "28,927",
      description: "Marriage Certificate",
      status: "Paid",
      generatedOn: moment(new Date())
        .add(-30 * 8, "days")
        .format("DD MMM YYYY"),
      paidOn: moment(new Date())
        .add(-24 * 7, "days")
        .format("DD MMM YYYY"),
    },
  ];
  const [bills, setBills] = useState(BILLS);

  const getPaymentStatus = (status) => {
    if (status === "Paid")
      return <div className="badge badge-success">{status}</div>;
    if (status === "Pending")
      return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };
  return (
    <CardContent>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Invoice Generated On</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Invoice Paid On</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((l, k) => {
              return (
                <tr key={k}>
                  <td>{l.invoiceNo}</td>
                  <td>{l.generatedOn}</td>
                  <td>{l.description}</td>
                  <td>{l.amount} LE</td>
                  <td>{getPaymentStatus(l.status)}</td>
                  <td>{l.paidOn}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardContent>
  );
}

export default Digitalwallet;
