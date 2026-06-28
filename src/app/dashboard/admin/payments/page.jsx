// src/app/dashboard/admin/transactions/page.jsx

import TransactionsClient from "./TransactionsClient";

async function getTransactions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function TransactionsPage() {
  const data = await getTransactions();

  return (
    <TransactionsClient
      initialTransactions={data.transactions || []}
      initialRevenue={data.totalRevenue || 0}
    />
  );
}