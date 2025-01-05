'use client';

import PDFMerger from 'pdf-merger-js';
import { toast } from 'sonner';

let html2pdf: any;

if (typeof window !== 'undefined') {
  import('html2pdf.js').then((module) => {
    html2pdf = module.default;
  });
}

const htmlToPdfBlob = async (element: HTMLElement, options: any): Promise<Blob> => {
  return await html2pdf().set(options).from(element).output('blob');
};

const fileToBlob = async (file: File): Promise<Blob> => {
  return new Blob([await file.arrayBuffer()], { type: file.type });
};

const defaultPdfOptions = {
  margin: [15, 15],
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { 
    scale: 2,
    useCORS: true,
    letterRendering: true,
  },
  jsPDF: { 
    unit: 'mm', 
    format: 'a4', 
    orientation: 'portrait'
  }
};

export const exportToPdf = async (elementId: string) => {
  if (typeof window === 'undefined') return;
  
  const toastId = toast.loading('Preparing your PDF...');
  
  try {
    const letterElement = document.getElementById('letter-content');
    if (!letterElement) {
      throw new Error('Could not find letter content');
    }

    const isEnglish = letterElement.innerHTML.includes('NOTIFICATION OF SCHOOL ABSENCE');
    
    const studentNameMatch = letterElement.innerHTML.match(isEnglish ? 
      /my child <strong>([^<]+)<\/strong>/ : 
      /kepada <strong>([^<]+)<\/strong>/
    );
    const studentName = studentNameMatch ? 
      studentNameMatch[1].replace(/\[|\]/g, '').trim() : 
      'student';

    const dateMatch = letterElement.innerHTML.match(/class="date">([^<]+)</);
    const letterDate = dateMatch ? 
      dateMatch[1].replace(/\s+/g, '_') : 
      new Date().toISOString().split('T')[0];

    const suffix = isEnglish ? 'Absence_Letter' : 'Surat_Tidak_Hadir';
    const sanitizedName = studentName.replace(/\s+/g, '_');
    const filename = `${sanitizedName}_${letterDate}_${suffix}.pdf`;

    const merger = new PDFMerger();

    toast.loading('Converting letter to PDF...', { id: toastId });
    
    const letterPdfBlob = await htmlToPdfBlob(letterElement, defaultPdfOptions);
    await merger.add(letterPdfBlob);

    const fileInput = document.querySelectorAll('input[type="file"]')[0] as HTMLInputElement;
    const attachments = fileInput?.files;
    if (attachments?.length) {
      toast.loading('Processing attachments...', { id: toastId });
      
      for (const file of Array.from(attachments)) {
        if (file.type === 'application/pdf') {
          const pdfBlob = await fileToBlob(file);
          await merger.add(pdfBlob);
        } else if (file.type.startsWith('image/')) {
          const imgContainer = document.createElement('div');
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          img.style.maxWidth = '100%';
          imgContainer.appendChild(img);
          
          const imgPdfBlob = await htmlToPdfBlob(imgContainer, defaultPdfOptions);
          await merger.add(imgPdfBlob);
          URL.revokeObjectURL(img.src);
        }
      }
    }

    toast.loading('Finalizing PDF...', { id: toastId });
    await merger.save(filename);
    toast.success('PDF downloaded successfully!', { id: toastId });

  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to generate PDF', { id: toastId });
  }
} 