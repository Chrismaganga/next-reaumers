import React, { useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type InvoiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

type Client = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export default function Invoice() {
  const printRef = useRef<HTMLDivElement>(null);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([{ description: "", quantity: 0, unitPrice: 0, total: 0 }]);
  const [client, setClient] = useState<Client>({ name: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "" });

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  const handleInputChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceItems];
    newItems[index][field] = field === "description" ? String(value) : Number(value);
    newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    setInvoiceItems(newItems);
  };

  return (
    <div className="min-h-screen bg-blue-600 text-white p-8 items-center justify-end">
      <div className="bg-white text-gray-900 shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">INVOICE</h1>
          
          <div className="mb-4">
            <h2 className="text-lg font-bold text-blue-600">Client Information</h2>
            <input type="text" placeholder="Name" className="border p-2 w-full mt-2 text-gray-900" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
            <input type="text" placeholder="Last Name" className="border p-2 w-full mt-2 text-gray-900" value={client.lastName} onChange={(e) => setClient({ ...client, lastName: e.target.value })} />
            <input type="email" placeholder="Email" className="border p-2 w-full mt-2 text-gray-900" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
            <input type="text" placeholder="Phone" className="border p-2 w-full mt-2 text-gray-900" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
          </div>

          <table className="w-full mb-8 border-collapse text-gray-900">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Quantity</th>
                <th className="border p-2 text-right">Unit Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleInputChange(index, "description", e.target.value)}
                      className="w-full border p-1 text-gray-900"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                      className="w-full border p-1 text-right text-gray-900"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleInputChange(index, "unitPrice", e.target.value)}
                      className="w-full border p-1 text-right text-gray-900"
                    />
                  </td>
                  <td className="border p-2 text-right">{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
