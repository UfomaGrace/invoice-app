import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import InvoiceListPage from '../pages/InvoiceListPage'
import InvoiceDetailPage from '../pages/InvoiceDetailPage'

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navbar/>}>
                <Route index element={ <InvoiceListPage/>} />
                <Route path="invoice/:id" element={<InvoiceDetailPage />} />
                {/* <Route path="create" element={<InvoiceForm />} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router