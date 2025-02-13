"use client";

import { useRef, useState } from "react";

import html2canvas from "html2canvas"; // For capturing content as an image
import { jsPDF } from "jspdf"; // For generating the PDF

interface User {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  language: string;
  birthdate: string;
  nationality: string;
  id_number: string;
  passport_number: string;
  city: string;
  state: string;
  zip: string;
  residence: string;
  profession: string;
  skills: string[];
  projects: string[];
  education: string[];
  experience: string[];
}

const CvForm = () => {
  const [user, setUser] = useState<User>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    language: "",
    birthdate: "",
    nationality: "",
    id_number: "",
    passport_number: "",
    city: "",
    state: "",
    zip: "",
    residence: "",
    profession: "",
    skills: [],
    projects: [],
    education: [],
    experience: [],
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    const element = printRef.current;
    if (!element) return;

    // Use html2canvas to render the element into a canvas
    const canvas = await html2canvas(element, { scale: 1.5 });
    const data = canvas.toDataURL("image/png");

    // Create a PDF document using jsPDF
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    // Add the image to the PDF, reducing the size by adjusting dimensions
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save the generated PDF file
    pdf.save("cv.pdf");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      skills: value.split(",").map((skill) => skill.trim()), // Assumes skills are separated by commas
    }));
  };

  return (
    <div ref={printRef}>
      <form className="bg-white grid grid-cols-1 gap-4 max-w-lg mx-auto p-1" onSubmit={handleDownloadPdf}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          placeholder="First Name"
          className="w-full p-2 border border-gray-300 rounded-md text-md"
        />
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="w-90 p-2 border border-gray-300 rounded-md text-md"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md text-md"
        />
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="w-full p-2 border border-gray-300 rounded-md text-md"
        />
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded-md text"
        />
        <input
          type="text"
          name="city"
          value={user.city}
          onChange={handleInputChange}
          placeholder="City"
          className="w-full p-2 border border-gray-300 rounded-md text-md"
        />
        <input
          type="text"
          name="state"
          value={user.state}
          onChange={handleInputChange}
          placeholder="State"
          className="w-full p-2 border border- rounded-md text-md"
        />
        <input
          type="text"
          name="zip"
          value={user.zip}
          onChange={handleInputChange}
          placeholder="Zip Code"
          className="w-full p-2 border border-gray-300 rounded-md text-md "
        />
        <input
          type="text"
          name="profession"
          value={user.profession}
          onChange={handleInputChange}
          placeholder="Profession"
          className="w-full p-2 border-none border-gray-300 rounded-md text-md"
        />
        <input
          type="text"
          name="skills"
          value={user.skills.join(", ")} // Join array to display as comma-separated text
          onChange={handleSkillsChange}
          placeholder="Skills (comma separated)"
          className="w-full p-2 border border-gray-300 rounded-md text-md"
        />
        {/* Submit button for generating PDF */}
        <div className="mt-3 flex justify-center">
          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default CvForm;
