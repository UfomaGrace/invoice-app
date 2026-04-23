import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

export default function InvoiceForm({
  isOpen,
  onClose,
  invoiceToEdit = null,
  onSave,
}) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    receiverAddress: { street: '', city: '', postCode: '', country: '' },
    
    invoiceDate: new Date().toISOString().split("T")[0],
    paymentTerms: "30",
    projectDescription: "",
    items: [{ name: "", quantity: 1, price: 0 }],
  });

  // Pre-fill form when editing

  // Pre-fill form when editing

useEffect(() => {
  if (invoiceToEdit) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      clientName: invoiceToEdit.clientName || '',
      clientEmail: invoiceToEdit.clientEmail || invoiceToEdit.receiverEmail || '',
      
      senderAddress: invoiceToEdit.senderAddress || { street: '', city: '', postCode: '', country: '' },
      receiverAddress: invoiceToEdit.receiverAddress || { street: '', city: '', postCode: '', country: '' },

      invoiceDate: invoiceToEdit.createdAt || new Date().toISOString().split('T')[0],
      paymentTerms: '30',
      projectDescription: invoiceToEdit.projectDescription || 'Graphic Design Service',
      items: invoiceToEdit.items || [{ name: '', quantity: 1, price: 0 }]
    });
  } else {
    // Reset for new invoice
    setFormData({
      clientName: '',
      clientEmail: '',
      senderAddress: { street: '', city: '', postCode: '', country: '' },
      receiverAddress: { street: '', city: '', postCode: '', country: '' },
      invoiceDate: new Date().toISOString().split('T')[0],
      paymentTerms: '30',
      projectDescription: '',
      items: [{ name: '', quantity: 1, price: 0 }]
    });
  }
}, [invoiceToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] =
      field === "quantity" || field === "price" ? Number(value) || 0 : value;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addNewItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    return formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
  };

  const handleSubmit = (isDraft = false) => {
    const newInvoice = {
      id: invoiceToEdit
        ? invoiceToEdit.id
        : "RT" + Math.floor(1000 + Math.random() * 9000),
      ...formData,
      status: isDraft ? "draft" : "pending",
      total: calculateTotal(),
      createdAt: formData.invoiceDate,
    };

    onSave(newInvoice, invoiceToEdit?.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-start z-40 mx-20 max-w-150 rounded-2xl">
      <div className="bg-white dark:bg-[#1e1b4b] rounded-3xl w-full max-h-full overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8">
          <h2 className="text-3xl font-bold dark:text-white">
            {invoiceToEdit ? "Edit Invoice" : "New Invoice"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-8 space-y-10">
          {/* Bill From */}
          <div>
            <h3 className="text-violet-600 dark:text-violet-400 font-medium mb-4">
              BILL FROM
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">
                  Street Address
                  <input
                  type="text"
                  name="streetAddress"
                  autoComplete
                  value={formData.senderAddress.street}
                  onChange={(e) => {
                    setFormData(prev => ({
                        ...prev,
                        senderAddress: {
                            ...prev.senderAddress,
                            street: e.target.value
                        }
                    }));
                }}
                  className="w-full mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                </label>  
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    City
                    <input
                    type="text"
                    name="city"
                    value={formData.senderAddress.city}
                    onChange={(e) => {
                        setFormData(prev => ({
                            ...prev,
                            senderAddress:{
                                ...prev.senderAddress,
                                city: e.target.value
                            }
                        }))
                    }}
                    className="w-full mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  </label>
                  
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Post Code
                    <input
                    type="text"
                    name="postCode"
                    value={formData.senderAddress.postCode}
                    onChange={(e) =>{
                        setFormData(prev =>({
                            ...prev,
                            senderAddress:{
                                ...prev.senderAddress,
                                postCode:e.target.value
                            }
                        }))
                    }}
                    className="w-full mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  </label>
                  
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Country
                    <input
                    type="text"
                    name="country"
                    value={formData.senderAddress.country}
                    onChange={(e) =>{
                        setFormData(prev =>({
                            ...prev,
                            senderAddress:{
                                ...prev.senderAddress,
                                country:e.target.value
                            }
                        }))
                    }}
                    className="w-full mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  
                  </label>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <h3 className="text-violet-600 dark:text-violet-400 font-medium mb-4">
              BILL TO
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">
                  Client's Name
                  <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                </label>
                
              </div>

              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">
                  Client's Email
                  <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                </label>
                
              </div>

                <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Street Address
                    <input 
                  type="text" 
                  name="streetAddress" 
                  value={formData.receiverAddress.street} 
                  onChange={(e) => {
                    setFormData(prev => ({
                        ...prev,
                        receiverAddress:{
                            ...prev.receiverAddress,
                            street:e.target.value
                        }
                    }))
                  }}
                  className="w-full mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500" 
                />
                </label>
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400">
                        City
                        <input 
                            type="text" 
                            name="city" 
                            value={formData.receiverAddress.city} 
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    receiverAddress:{
                                        ...prev.receiverAddress,
                                        city:e.target.value
                                    }
                                }))
                            }}
                            className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500" 
                        />
                    </label>
                  
                </div>
                <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400">
                        Post Code
                        <input 
                            type="text" 
                            name="postCode" 
                            value={formData.receiverAddress.postCode} 
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    receiverAddress:{
                                        ...prev.receiverAddress,
                                        postCode:e.target.value
                                    }
                                }))
                            }}
                            className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500" 
                        />
                    </label>
                    
                </div>
                <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400">
                        Country
                        <input 
                            type="text" 
                            name="country" 
                            value={formData.receiverAddress.country} 
                            onChange={(e) => {
                                setFormData(prev => ({
                                    ...prev,
                                    receiverAddress:{
                                        ...prev.receiverAddress,
                                        country:e.target.value
                                    }
                                }))
                            }}
                            className="w-full mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500" 
                        />
                    </label>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Date & Payment Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-500">
                Invoice Date
                <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              </label>
              
            </div>
            <div>
                <label className="block text-sm text-gray-500">
                    Payment Terms
                    <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange}
                className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="30">Net 30 Days</option>
                <option value="60">Net 60 Days</option>
              </select>
                </label>
              
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm text-gray-500">
              Project Description
              <input
              type="text"
              name="projectDescription"
              placeholder="e.g. Graphic Design Service"
              value={formData.projectDescription}
              onChange={handleChange}
              className="w-full p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            </label>
            
          </div>

          {/* Item List */}
          <div>
            <h3 className="text-violet-600 dark:text-violet-400 font-medium mb-4">
              Item List
            </h3>

            {formData.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 mb-4 items-end"
              >
                <div className="col-span-12 md:col-span-5">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="col-span-5 md:col-span-3">
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-600 p-4"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addNewItem}
              className="w-full py-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-500 hover:text-violet-600 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add New Item
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-8 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 text-gray-600 dark:text-gray-400 font-medium"
          >
            Discard
          </button>
          <button
            onClick={() => handleSubmit(true)}
            className="px-8 py-3 bg-gray-200 dark:bg-gray-700 rounded-2xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="px-8 py-3 bg-[#7C5DFA] hover:bg-[#8b6dff] text-white rounded-2xl font-medium"
          >
            Save & Send
          </button>
        </div>
      </div>
    </div>
  );
}
