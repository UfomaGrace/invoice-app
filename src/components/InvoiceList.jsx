import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useInvoices } from "../hooks/useInvoices";
import StatusBadge from "./StatusBadge";
import FilterDropdown from "./FilterDropdown";
import { Link } from "react-router-dom";
import InvoiceForm from "./InvoiceForm";

export default function InvoiceList() {
  const { invoices } = useInvoices();
  const [filter, setFilter] = useState("all"); // 'all', 'draft', 'pending', 'paid'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState(null);
  const { addInvoice, updateInvoice } = useInvoices();

  //Filter logic
  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    return invoice.status === filter;
  });

  // Open form for creating new invoice
  const handleNewInvoice = () => {
    setInvoiceToEdit(null);
    setIsFormOpen(true);
  };

  

  // Handle save from the form
  const handleSaveInvoice = (newInvoiceData, editId) => {
    if (editId) {
      // Update existing invoice
      updateInvoice({newInvoiceData });
    } else {
      // Create new invoice
      addInvoice(newInvoiceData);
    }
  };

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

            <button 
            onClick={handleNewInvoice}
            className="flex items-center gap-3 bg-[#7C5DFA] hover:bg-[#8b6dff] text-white px-4 py-2 text-sm rounded-full font-medium transition-colors">
              
              <div className="rounded-full p-2 text-sm bg-white text-[#7C5DFA]">
                <Plus size={20} />
              </div>
              New Invoice
            </button>
          </div>
        </div>

        {/* Invoice Rows */}
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <Link
              to={`/invoice/${invoice.id}`} 
              key={invoice.id}
              className="bg-white h-18 dark:bg-[#48549F1A] dark:hover:bg-[#48549F1A] hover:bg-gray-50 dark:hover:border-[#7C5DFA] hover:border-[#7C5DFA] hover:shadow-md dark:hover:shadow-xl dark:border border border-transparent hover:border py-2 px-6 rounded-lg shadow flex items-center gap-8 cursor-pointer transition-all duration-300 ease-out"
            >
              <div className="w-28 font-mono font-bold">#{invoice.id}</div>
              <div className="w-40 text-gray-400">Due {invoice.createdAt}</div>
              <div className="flex-1 font-medium whitespace-nowrap w-40">{invoice.clientName}</div>
              <div className="w-40 font-bold">
                £ {invoice.total.toFixed(2)}
              </div>
              <StatusBadge status={invoice.status} className=""/>
              <div className="text-gray-400">→</div>
            </Link>
          ))}
        </div>
      </div>
      {/* The Modal Form */}
      <InvoiceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        invoiceToEdit={invoiceToEdit}
        onSave={handleSaveInvoice}
      />
    </div>
  );
}
