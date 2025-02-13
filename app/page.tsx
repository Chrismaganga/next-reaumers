"use client"

import CvForm from "./components/cvgenerator/Cv";
// import Cv from "./components/cvgenerator/Cv";
import Invoice from "./components/invoice/invoice";
// import { PDFViewer } from '@react-pdf/renderer';

const Home = () => (

  <div className='flex gap-20'>
    <div className=" w-1/2">
   
      <Invoice />
       
    </div>
    <div className="w-1/2 pt-20">
   
      <CvForm />
       
    </div>
   
  </div>

);

export default Home;