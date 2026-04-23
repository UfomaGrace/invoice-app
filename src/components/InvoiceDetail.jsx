import { useParams, useNavigate } from "react-router-dom";
import { useInvoices } from "../hooks/useInvoices";
import StatusBadge from "../components/StatusBadge.jsx";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useState } from "react";
import InvoiceForm from "./InvoiceForm.jsx";
import DeleteModal from "./DeleteModal.jsx";

export default function InvoiceDetail() {
  const { id } = useParams(); // Gets the id from URL
  const navigate = useNavigate(); // For "Go Back" button
  const { invoices, markAsPaid, deleteInvoice } = useInvoices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState(null);
  const { addInvoice, updateInvoice } = useInvoices();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Find the invoice with the matching ID
  const invoice = invoices.find((inv) => inv.id === id);

  // If invoice not found
  if (!invoice) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Invoice Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-violet-400 hover:underline"
        >
          ← Go back to invoices
        </button>
      </div>
    );
  }

  // Calculate total from items (for future-proofing)
  const calculatedTotal = invoice.items
    ? invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    : invoice.total;

  // Open form for editing existing invoice
  const handleEdit = () => {
    setInvoiceToEdit(invoice);
    setIsFormOpen(true);
  };

  // Handle save from the form
  const handleSaveInvoice = (newInvoiceData, editId) => {
    if (editId) {
      updateInvoice(newInvoiceData);
    } else {
      addInvoice(newInvoiceData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-bold text-[15px] group"
        >
          <MdOutlineArrowBackIos className="text-[#7C5DFA] group-hover:text-[#7E88C3]" />
          <span className="text-black dark:text-white group-hover:text-[#7E88C3] transition-colors duration-300">
            Go back
          </span>
        </button>
      </div>

      {/* Top Bar */}
      <div className="mb-8 rounded-2xl bg-white dark:bg-[#1E2139] shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-medium text-[13px] text-[#858BB2]">
              Status
            </span>
            <div>
              <StatusBadge status={invoice.status} />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="px-6 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Edit
            </button>

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-6 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-colors"
            >
              Delete
            </button>
            {invoice.status === "pending" && (
              <button
                onClick={() => markAsPaid(invoice.id)}
                className="px-6 py-2 text-sm font-medium bg-[#7C5DFA] text-white rounded-xl hover:bg-[#8b6dff]"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Invoice Card */}
      <div className="bg-white dark:bg-[#1E2139] rounded-3xl shadow-lg overflow-hidden">
        {/* Invoice Header */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start">
          <div>
            <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
              #{invoice.id}
            </p>
            <h2 className="text-2xl font-bold mt-1 dark:text-white">
              {invoice.projectDescription || "Graphic Design"}
            </h2>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {invoice.senderAddress?.street}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.senderAddress?.city}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.senderAddress?.postCode}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.senderAddress?.country}
            </p>
          </div>
        </div>
        <div></div>

        {/* Invoice Details Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            {/* Invoice Date */}
            <div className="mb-8">
              <p className="text-xs tracking-widest text-gray-500 dark:text-gray-400 mb-0.5">
                Invoice Date
              </p>
              <p className="font-medium dark:text-white">{invoice.createdAt}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-500 dark:text-gray-400 mb-0.5">
                Payment due
              </p>
              <p className="font-medium dark:text-white">{invoice.createdAt}</p>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              Bill To
            </p>
            <p className="font-medium dark:text-white">
              {invoice.receiverName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {invoice.receiverAddress?.street}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.receiverAddress?.city}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.receiverAddress?.postCode}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.receiverAddress?.country}
            </p>
          </div>

          {/* Sent To */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
              Sent To
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.receiverEmail}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mx-12">
          <div className="bg-[#F9FAFE] dark:bg-[#252945] rounded-2xl shadow mb-20 ">
            <div className="p-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 text-gray-500 font-normal">
                      Item Name
                    </th>
                    <th className="text-right py-4 text-gray-500 font-normal">
                      QTY.
                    </th>
                    <th className="text-right py-4 text-gray-500 font-normal">
                      Price
                    </th>
                    <th className="text-right py-4 text-gray-500 font-normal">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {invoice.items &&
                    invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-5 font-medium dark:text-white">
                          {item.name}
                        </td>
                        <td className="py-5 text-right text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="py-5 text-right text-gray-500">
                          £ {item.price.toFixed(2)}
                        </td>
                        <td className="py-5 text-right font-medium dark:text-white">
                          £ {(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Amount Due Bar */}
            <div className="bg-[#1e1b4b] text-white dark:bg-[#0C0E16] p-8 flex justify-between items-center rounded-b-2xl">
              <span className="text-lg font-medium">Amount Due</span>
              <span className="text-3xl font-bold">
                £ {calculatedTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* The Modal Form */}
      <InvoiceForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setInvoiceToEdit(null);
        }}
        invoiceToEdit={invoiceToEdit}
        onSave={handleSaveInvoice}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deleteInvoice(invoice.id);
          setIsDeleteModalOpen(false);
          navigate("/"); // Go back to list after deletion
        }}
        invoiceId={invoice.id}
      />
    </div>
  );
}
