const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add isGeneratingPDF state
code = code.replace(
  'const results = calculateResults();',
  'const results = calculateResults();\n  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);'
);

// 2. Replace handleDownloadPDF
const oldFunc = 'const handleDownloadPDF = async () => {\n    setIsPreviewOpen(true);\n    setTimeout(() => {\n      window.print();\n    }, 500);\n  };';
const newFunc = \const handleDownloadPDF = async () => {
    setIsPreviewOpen(true);
    setIsGeneratingPDF(true);
    
    try {
      const html2canvas = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const element = document.getElementById('print-report');
      if (!element) { 
        alert('인쇄 영역을 찾을 수 없습니다.'); 
        setIsGeneratingPDF(false);
        return; 
      }

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const totalImgHeightInMm = imgHeight * ratio;
      
      let heightLeft = totalImgHeightInMm;
      let position = 0;
      
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgWidth * ratio);
      heightLeft -= pdfHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - totalImgHeightInMm;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgWidth * ratio);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(\\\컨설팅보고서_\\\.pdf\\\);
    } catch (e) {
      console.error(e);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };\;

code = code.replace(oldFunc, newFunc);

// 3. Update the PDF button in Step 8
const oldButton = '<button onClick={handleDownloadPDF} className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-gray-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all w-56 group bg-white shadow-sm hover:shadow-md">\\n                    <FileText className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform" />\\n                    <div>\\n                      <span className="block font-bold text-gray-800 text-lg">PDF 다운로드</span>';
const newButton = '<button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-gray-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all w-56 group bg-white shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">\\n                    {isGeneratingPDF ? <Loader2 className="w-12 h-12 text-red-500 animate-spin" /> : <FileText className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform" />}\\n                    <div>\\n                      <span className="block font-bold text-gray-800 text-lg">{isGeneratingPDF ? \\'PDF 생성 중...\\' : \\'PDF 다운로드\\'}</span>';

code = code.replace(oldButton, newButton);

fs.writeFileSync('src/app/page.tsx', code);
