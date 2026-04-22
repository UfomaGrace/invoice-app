import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useInvoices } from "../hooks/useInvoices";
import StatusBadge from "./StatusBadge";
import FilterDropdown from "./FilterDropdown";

export default function InvoiceList() {
  const { invoices } = useInvoices();
  const [filter, setFilter] = useState("all"); // 'all', 'draft', 'pending', 'paid'

  //Filter logic
  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    return invoice.status === filter;
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-6 mb-10">
          <div className="">
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p className="text-gray-400 mt-1 text-sm capitalize">
              There are {filteredInvoices.length} {filter === 'all' ? 'total' : filter} invoices
            </p>
          </div>

          {/* Filter + New Invoice Button */}
          <div className="flex items-center gap-6">
            
            {/* Filter Dropdown */}
            <FilterDropdown filter={filter} setFilter={setFilter} />

            <button className="flex items-center gap-3 bg-[#7C5DFA] hover:bg-[#8b6dff] px-6 py-3 rounded-2xl font-medium transition-colors">
              <Plus size={20} />
              New Invoice
            </button>
          </div>
        </div>

        {/* Invoice Rows */}
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <div 
              key={invoice.id}
              className="bg-white dark:bg-[#1e1b4b] hover:bg-gray-50 dark:hover:bg-[#25224f] hover:shadow-md dark:hover:shadow-xl dark:border-transparent border-2 border-transparent hover:border-2 hover:border-[#25224f] py-2 px-4 rounded-md shadow flex items-center gap-8 cursor-pointer transition-all duration-300 ease-out"
            >
              <div className="w-28 font-mono font-bold">#{invoice.id}</div>
              <div className="w-40 text-gray-400">Due {invoice.createdAt}</div>
              <div className="flex-1 font-medium whitespace-nowrap w-40">{invoice.clientName}</div>
              <div className="w-40 font-bold">
                £ {invoice.total.toFixed(2)}
              </div>
              <StatusBadge status={invoice.status} className=""/>
              <div className="text-gray-400">→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
