/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';

export function useInvoices() {
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      try {
        return JSON.parse(savedInvoices);
      } catch (e) {
        console.error('Failed to parse invoices from localStorage', e);
        return [];
      }
    }
    return []; // Start empty
  });

  // Save to LocalStorage whenever invoices change
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Seed fake data ONLY if there are no invoices (runs once)
  useEffect(() => {
    if (invoices.length === 0) {
      const fakeInvoices = [
        {
          id: 'RT3080',
          createdAt: '19 Aug 2021',
          status: 'paid',
          clientName: 'Jensen Huang',
          clientEmail: 'john@example.com',
          total: 1800.90,
          items: [
            { name: "Banner Design", quantity: 1, price: 1600.90 },
            { name: "Email Design", quantity: 2, price: 200.00 }
          ]
        },
        {
          id: 'XM9141',
          createdAt: '20 Sept 2021',
          status: 'pending',
          clientName: 'Alex Grim',
          clientEmail: 'sarah@example.com',
          total: 556.00,
          items: [
            { name: "Product Design", quantity: 1, price: 556.00 },
          ]
        },
        {
          id: 'RG0314',
          createdAt: '01 Oct 2021',
          status: 'paid',
          clientName: 'John Morrinson',
          clientEmail: 'alex@example.com',
          total: 14002.33,
          items: [
            { name: "Banner Design", quantity: 1, price: 700.00 },
            { name: "Email Design", quantity: 2, price: 300.50 },
            { name: "Email Design", quantity: 2, price: 200.50 },
            { name: "Email Design", quantity: 2, price: 201.33 },
          ]
        },
        {
          id: 'RT2080',
          createdAt: '12 Oct 2021',
          status: 'pending',
          clientName: 'Alysa Werner',
          clientEmail: 'alex@example.com',
          total: 102.40,
          items: [
            { name: "Product Design", quantity: 1, price: 102.40 },
          ]
        },
        {
          id: 'AA1449',
          createdAt: '14 Oct 2021',
          status: 'pending',
          clientName: 'Mellisa Clarke',
          clientEmail: 'alex@example.com',
          total: 4032.33,
          items: [
            { name: "Product Design", quantity: 1, price: 4032.33 },
          ]
        },
        {
          id: 'TY9141',
          createdAt: '31 Oct 2021',
          status: 'pending',
          clientName: 'Thomas Wayne',
          clientEmail: 'alex@example.com',
          total: 6155.91,
          items: [
            { name: "Product Design", quantity: 1, price: 6155.91 },
          ]
        },
        {
          id: 'V2353',
          createdAt: '12 Nov 2021',
          status: 'draft',
          clientName: 'Anita Wainwright',
          clientEmail: 'alex@example.com',
          total: 3102.04,
          items: [
            { name: "Product Design", quantity: 3, price: 3102.04 },
          ]
        },
      ];
      setInvoices(fakeInvoices);
    }
  }, [invoices.length]);   // This is the key change

  const addInvoice = (newInvoice) => {
    const invoiceWithId = {
      ...newInvoice,
      id: 'RT' + String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0'),
    };
    setInvoices((prev) => [invoiceWithId, ...prev]);
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const markAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'paid' } : inv
      )
    );
  };

  return {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid,
  };
}