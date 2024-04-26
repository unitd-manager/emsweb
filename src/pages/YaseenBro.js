import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const YaseenBro = () => {
  const pdfRef = useRef(null);

  const handleGeneratePdf = () => {
    const input = pdfRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ems.pdf');
      });
    }
  };

  return (
    <div>
      
      <button onClick={handleGeneratePdf}>Generate PDF</button>

      {/* Content to be included in the PDF */}
      <div ref={pdfRef}>
        <img src="imag1.jpg" alt="Image 1" />
        <img src="imag2.jpg" alt="Image 2" />
        <img src="imag3.jpg" alt="Image 3" />
        <img src="img2.png" alt="Image 4" />
      </div>
    </div>
  );
};

export default YaseenBro;
