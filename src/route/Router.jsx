import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import InvoiceListPage from '../pages/InvoiceListPage'

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navbar/>}>
                <Route index element={ <InvoiceListPage/>} />

                {/* <Route path="create" element={<InvoiceForm />} />
                <Route path="invoice/:id" element={<InvoiceDetail />} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router