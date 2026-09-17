"use client";

import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { LayoutDashboard, FileText, Settings, Download, ChevronRight, User, Sparkles, Printer, Loader2 } from 'lucide-react';
import { checklistData, Score } from '@/data/checklist';
import { PrintReport } from '@/components/PrintReport';

const steps = [
  { id: 'cover', title: '표지 (기본 정보)' },
  { id: 'overview', title: '기업 현황 및 재무' },
  { id: 'environment', title: '환경 분석' },
  { id: 'capabilities', title: '내부역량 및 사업성' },
  { id: 'checklist', title: '경영진단 체크리스트' },
  { id: 'results', title: '진단 결과 (AI)' },
  { id: 'guide', title: '안내문 (13~15p)' },
  { id: 'export', title: '문서 내보내기' },
];

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [checklistCategory, setChecklistCategory] = useState('전략'); // For checklist sub-tabs
  const contentAreaRef = useRef<HTMLDivElement>(null);
  
  // AI Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiConfig, setApiConfig] = useState({ key: '', provider: 'gemini' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  useEffect(() => {
    const savedKey = localStorage.getItem('consulting_api_key');
    const savedProvider = localStorage.getItem('consulting_api_provider');
    if (savedKey) setApiConfig(prev => ({ ...prev, key: savedKey }));
    if (savedProvider) setApiConfig(prev => ({ ...prev, provider: savedProvider }));
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    date: { year: '2024', month: '10', day: '25' },
    company: '엘림컴퍼니',
    ceo: '홍길동',
    consultant: '김컨설턴트',
    // Overview Data
    address: '서울시 강남구 테헤란로 123',
    industry: '제조업',
    products: '소프트웨어, 하드웨어',
    established: '2015-01-01',
    employees: '50명',
    relatedCompanies: '없음',
    history: '- 2015.01 회사 설립\n- 2018.05 벤처기업 인증',
    // Financial Data
    financials: [
      { year: '2021', assets: 10000, liabilities: 5000, equity: 5000, sales: 8000, opIncome: 1500, netIncome: 1000 },
      { year: '2022', assets: 12000, liabilities: 6000, equity: 6000, sales: 9000, opIncome: 1800, netIncome: 1200 },
      { year: '2023', assets: 15000, liabilities: 7000, equity: 8000, sales: 11000, opIncome: 2200, netIncome: 1500 }
    ],
    // Ratio Data
    ratios: [
      { year: '2021', equityRatio: 50, preTaxMargin: 15, valueAdded: 30, salesGrowth: 10 },
      { year: '2022', equityRatio: 50, preTaxMargin: 16, valueAdded: 32, salesGrowth: 12.5 },
      { year: '2023', equityRatio: 53.3, preTaxMargin: 17, valueAdded: 35, salesGrowth: 22.2 }
    ],
    // Analysis
    failCause: '',
    failImprovement: '',
    marketTrend: '',
    fiveForce: '',
    productCapability: '',
    techCapability: '',
    ceoCapability: '',
    hrCapability: '',
    businessFeasibility: '',
    // Checklist
    checklistScores: {} as Record<string, string>,
    // AI Results (Step 5)
    aiInsights: {} as Record<string, string>,
    aiTasks: '',
    aiOpinion: '',
  });

  // Auto-save to localStorage
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('consulting_form_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
    const listStr = localStorage.getItem('consulting_saved_list') || '[]';
    try {
      setSavedCompanies(JSON.parse(listStr));
    } catch(e) {}
  }, []);

  const loadCompany = (companyName: string) => {
    if (!companyName) return;
    const saved = localStorage.getItem(`consulting_report_${companyName}`);
    if (saved) {
      setFormData(JSON.parse(saved));
      alert(`${companyName} 데이터를 불러왔습니다.`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('consulting_form_data', JSON.stringify(formData));
      
      if (formData.company && formData.company.trim() !== '') {
        const companyKey = `consulting_report_${formData.company}`;
        localStorage.setItem(companyKey, JSON.stringify(formData));
        
        const listStr = localStorage.getItem('consulting_saved_list') || '[]';
        try {
          let list = JSON.parse(listStr);
          if (!list.includes(formData.company)) {
            list.push(formData.company);
            localStorage.setItem('consulting_saved_list', JSON.stringify(list));
            setSavedCompanies(list);
          }
        } catch(e) {}
      }

      setLastSaved(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleFinancialChange = (index: number, field: string, value: string) => {
    const updatedFinancials = [...formData.financials];
    updatedFinancials[index] = { ...updatedFinancials[index], [field]: Number(value) || 0 };
    setFormData({ ...formData, financials: updatedFinancials });
  };

  const handleRatioChange = (index: number, field: string, value: string) => {
    const updatedRatios = [...formData.ratios];
    if (field === 'year') {
      updatedRatios[index] = { ...updatedRatios[index], [field]: value };
    } else {
      updatedRatios[index] = { ...updatedRatios[index], [field]: Number(value) || 0 };
    }
    setFormData({ ...formData, ratios: updatedRatios });
  };

  const handleScoreChange = (id: string, score: Score) => {
    setFormData({
      ...formData,
      checklistScores: { ...formData.checklistScores, [id]: score }
    });
  };

  // Group checklist by categories for tabs
  const categories = Array.from(new Set(checklistData.map(c => c.category)));
  const currentChecklistItems = checklistData.filter(c => c.category === checklistCategory);

  // Validation logic
  const isChecklistComplete = currentChecklistItems.every(item => formData.checklistScores[item.id] !== undefined);

  // Calculate scores
  const calculateResults = () => {
    return categories.map(cat => {
      const items = checklistData.filter(c => c.category === cat);
      let sum = 0;
      let count = 0;
      
      items.forEach(item => {
        const score = formData.checklistScores[item.id];
        if (score === 'V') { sum += 5; count++; }
        else if (score === 'G') { sum += 4; count++; }
        else if (score === 'N') { sum += 3; count++; }
        else if (score === 'B') { sum += 2; count++; }
        else if (score === 'W') { sum += 1; count++; }
      });
      
      const rawScore = count > 0 ? (sum / (5 * count)) * 100 : 0;
      const roundedScore = Math.round(rawScore * 10) / 10;
      
      let grade = 'D';
      if (roundedScore >= 90) grade = 'S';
      else if (roundedScore >= 80) grade = 'A';
      else if (roundedScore >= 70) grade = 'B';
      else if (roundedScore >= 60) grade = 'C';
      
      return { category: cat, score: roundedScore, grade };
    });
  };

  const results = calculateResults();
  
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  const handleDownloadPDF = () => {
    setIsPreparingPrint(true);
    // Give React time to render PrintReport on screen (covered by the loading screen)
    setTimeout(() => {
      window.print();
      // The print dialog blocks JS execution. When it closes, we reset the state.
      setTimeout(() => {
        setIsPreparingPrint(false);
      }, 500);
    }, 1000);
  };

  const handleDownloadWord = async () => {
    try {
      const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, HeadingLevel } = await import('docx');
      
      const borderStyle = { style: BorderStyle.SINGLE, size: 1, color: '999999' };
      const cellBorders = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

      // Helper: create a simple table cell
      const cell = (text: string, opts?: { bold?: boolean; width?: number; shading?: string }) => 
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text, bold: opts?.bold, size: 20, font: '맑은 고딕' })] })],
          width: opts?.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
          shading: opts?.shading ? { fill: opts.shading } : undefined,
          borders: cellBorders,
        });

      // Section 1: Cover
      const coverSection = [
        new Paragraph({ children: [], spacing: { after: 600 } }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '재창업·재도전지원', size: 36, font: '맑은 고딕', bold: true })], spacing: { after: 200 } }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '컨설팅 보고서', bold: true, size: 56, font: '맑은 고딕' })], spacing: { after: 1200 } }),
        new Table({
          width: { size: 70, type: WidthType.PERCENTAGE },
          alignment: AlignmentType.CENTER,
          rows: [
            new TableRow({
              children: [
                cell('수진기업명', { bold: true, shading: 'F2F2F2', width: 40 }),
                cell(formData.company || ' ', { width: 60 })
              ]
            }),
            new TableRow({
              children: [
                cell('대 표 자 명', { bold: true, shading: 'F2F2F2', width: 40 }),
                cell(formData.ceo || ' ', { width: 60 })
              ]
            })
          ]
        }),
        new Paragraph({ children: [], spacing: { after: 1200 } }),
        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `컨 설 턴 트 : ${formData.consultant} (서명)`, bold: true, size: 24, font: '맑은 고딕' })], spacing: { after: 200 } }),
        new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `${formData.date.year}년 ${formData.date.month}월 ${formData.date.day}일`, bold: true, size: 24, font: '맑은 고딕' })] }),
      ];

      // Section 2: Financials Table
      const financialRows = [
        new TableRow({ children: [cell('구 분', { bold: true, shading: 'F2F2F2' }), cell('계정과목', { bold: true, shading: 'F2F2F2' }), ...formData.financials.map(f => cell(`${f.year}년`, { bold: true, shading: 'F2F2F2' }))] }),
        new TableRow({ children: [cell('대차대조표', { bold: true }), cell('자산총계'), ...formData.financials.map(f => cell(f.assets?.toLocaleString() || '0'))] }),
        new TableRow({ children: [cell(''), cell('부채총계'), ...formData.financials.map(f => cell(f.liabilities?.toLocaleString() || '0'))] }),
        new TableRow({ children: [cell(''), cell('자본총계'), ...formData.financials.map(f => cell(f.equity?.toLocaleString() || '0'))] }),
        new TableRow({ children: [cell('손익계산서', { bold: true }), cell('매출액'), ...formData.financials.map(f => cell(f.sales?.toLocaleString() || '0'))] }),
        new TableRow({ children: [cell(''), cell('영업이익'), ...formData.financials.map(f => cell(f.opIncome?.toLocaleString() || '0'))] }),
        new TableRow({ children: [cell(''), cell('당기순이익'), ...formData.financials.map(f => cell(f.netIncome?.toLocaleString() || '0'))] }),
      ];

      // Section 3: Ratios Table
      const ratioRows = [
        new TableRow({ children: [cell('구 분', { bold: true, shading: 'F2F2F2' }), ...formData.ratios.map(r => cell(`${r.year}년`, { bold: true, shading: 'F2F2F2' }))] }),
        new TableRow({ children: [cell('자기자본비율 (%)'), ...formData.ratios.map(r => cell(String(r.equityRatio)))] }),
        new TableRow({ children: [cell('매출액순이익률 (%)'), ...formData.ratios.map(r => cell(String(r.preTaxMargin)))] }),
        new TableRow({ children: [cell('부가가치율 (%)'), ...formData.ratios.map(r => cell(String(r.valueAdded)))] }),
        new TableRow({ children: [cell('차입금 평균 이자율 (%)'), ...formData.ratios.map(r => cell(String(r.salesGrowth)))] }),
      ];

      // Section 4: Checklist Results
      const resultRows = [
        new TableRow({ children: [cell('부문', { bold: true, shading: 'F2F2F2' }), cell('점수', { bold: true, shading: 'F2F2F2' }), cell('등급', { bold: true, shading: 'F2F2F2' })] }),
        ...results.map(r => new TableRow({ children: [cell(r.category, { bold: true }), cell(String(r.score)), cell(r.grade)] })),
      ];

      // Section 5: AI Insights
      const insightRows = [
        new TableRow({ children: [cell('부 문', { bold: true, shading: 'F2F2F2', width: 25 }), cell('진단결과 및 핵심 이슈 도출(시사점)', { bold: true, shading: 'F2F2F2', width: 75 })] }),
        ...results.map(r => new TableRow({ children: [cell(`${r.category} 부문`, { bold: true }), cell(formData.aiInsights?.[r.category] || '내용 없음')] })),
      ];

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            ...coverSection,
            // Page 2: Financials
            new Paragraph({ children: [], pageBreakBefore: true }),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '1. 기업 현황', bold: true, size: 28, font: '맑은 고딕' })] }),
            new Paragraph({ children: [new TextRun({ text: '■ 주요 재무현황', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 300, after: 200 } }),
            new Table({ rows: financialRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
            new Paragraph({ children: [new TextRun({ text: '(단위: 백만원)', size: 16, font: '맑은 고딕', color: '666666' })], alignment: AlignmentType.RIGHT, spacing: { before: 100 } }),
            new Paragraph({ children: [new TextRun({ text: '■ 주요 재무비율', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 300, after: 200 } }),
            new Table({ rows: ratioRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
            new Paragraph({ children: [new TextRun({ text: '(단위: %)', size: 16, font: '맑은 고딕', color: '666666' })], alignment: AlignmentType.RIGHT, spacing: { before: 100 } }),
            // Page 3: Analysis
            new Paragraph({ children: [], pageBreakBefore: true }),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '2. 경영환경 및 내부역량 분석', bold: true, size: 28, font: '맑은 고딕' })] }),
            new Paragraph({ children: [new TextRun({ text: '■ 실패원인 분석', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 300, after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: formData.failCause || '내용 없음', size: 20, font: '맑은 고딕' })], spacing: { after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: '■ 개선방안', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 200, after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: formData.failImprovement || '내용 없음', size: 20, font: '맑은 고딕' })], spacing: { after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: '■ 시장동향 분석', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 200, after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: formData.marketTrend || '내용 없음', size: 20, font: '맑은 고딕' })], spacing: { after: 200 } }),
            // Page 4: Results
            new Paragraph({ children: [], pageBreakBefore: true }),
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '3. 경영진단 결과', bold: true, size: 28, font: '맑은 고딕' })] }),
            new Paragraph({ children: [new TextRun({ text: '■ 부문별 진단결과', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 300, after: 200 } }),
            new Table({ rows: resultRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
            new Paragraph({ children: [new TextRun({ text: '■ 핵심 이슈 도출(시사점)', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 400, after: 200 } }),
            new Table({ rows: insightRows, width: { size: 100, type: WidthType.PERCENTAGE } }),
            // Page 5: Opinions
            new Paragraph({ children: [], pageBreakBefore: true }),
            new Paragraph({ children: [new TextRun({ text: '■ 경영개선 과제 선정 및 실행방안', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 200, after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: formData.aiTasks || '내용 없음', size: 20, font: '맑은 고딕' })], spacing: { after: 400 } }),
            new Paragraph({ children: [new TextRun({ text: '■ 종합 의견', bold: true, size: 24, font: '맑은 고딕', color: '1e40af' })], spacing: { before: 200, after: 200 } }),
            new Paragraph({ children: [new TextRun({ text: formData.aiOpinion || '내용 없음', size: 20, font: '맑은 고딕' })], spacing: { after: 200 } }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.company}_컨설팅보고서.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Word 다운로드 실패", e);
      alert("Word 다운로드 중 오류가 발생했습니다.");
    }
  };

  const handleAIGeneration = async () => {
    setIsGenerating(true);
    try {
      const prompt = `다음은 어느 기업의 경영진단 체크리스트 결과 점수(100점 만점)입니다.
${results.map(r => `[${r.category} 부문]: ${r.score}점 (${r.grade}등급)`).join('\n')}

이 진단 결과를 바탕으로 다음 세 가지 항목을 작성해주세요. 
출력은 반드시 유효한 JSON 형식이어야 합니다. Markdown 백틱이나 다른 설명 없이 JSON만 반환하세요.
{
  "insights": {
    "전략": "(전략 부문 진단결과 및 핵심 이슈 도출 시사점 1~2문장)",
    "마케팅": "(마케팅 부문 진단결과 및 시사점 1~2문장)",
    "재무": "(재무 부문 진단결과 및 시사점 1~2문장)",
    "인사": "(인사 부문 진단결과 및 시사점 1~2문장)",
    "생산관리": "(생산관리 부문 진단결과 및 시사점 1~2문장)",
    "정보화": "(정보화 부문 진단결과 및 시사점 1~2문장)"
  },
  "tasks": "(각 부문별 핵심 이슈에 대한 개선과제 및 구체적인 실행방안)",
  "opinion": "(계속기업으로 존속 가능성, 경영진의 혁신 의지 등을 종합적으로 반영한 컨설턴트 최종 의견)"
}`;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          clientKey: apiConfig.key,
          clientProvider: apiConfig.provider
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 400) {
          alert('API 키가 설정되지 않았습니다. 상단의 API 설정 메뉴에서 키를 입력하거나 관리자에게 문의하세요.');
          setIsSettingsOpen(true);
        } else {
          throw new Error(data.error || '알 수 없는 오류');
        }
        return;
      }

      const parsed = JSON.parse(data.result);
      setFormData(prev => ({
        ...prev,
        aiInsights: parsed.insights || {},
        aiTasks: parsed.tasks || '',
        aiOpinion: parsed.opinion || ''
      }));
      
    } catch (e) {
      console.error(e);
      alert('AI 생성 중 오류가 발생했습니다. API 키나 네트워크 상태를 확인해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className={`flex flex-col md:flex-row h-screen bg-gray-50 font-sans text-gray-900 print:hidden ${isPreparingPrint ? 'hidden' : ''}`}>
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-200 shadow-sm flex flex-col shrink-0">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            컨설팅 보고서
          </h1>
          <p className="text-sm text-gray-500 mt-1 md:mt-2">재창업·재도전지원</p>
        </div>
        <div className="overflow-x-auto md:overflow-y-auto py-2 md:py-4 flex-none md:flex-1 custom-scrollbar">
          <ul className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-1 px-3 w-max md:w-auto">
            {steps.map((step, idx) => (
              <li key={step.id} className="shrink-0">
                <button
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-left rounded-lg transition-colors whitespace-nowrap ${
                    currentStep === idx 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className={`flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full text-xs shrink-0 ${
                    currentStep === idx ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm md:text-base">{step.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden print:overflow-visible print:block">
        {/* Header */}
        <header className="h-auto md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 py-3 md:py-0 shadow-sm z-10 print:hidden gap-3 md:gap-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {steps[currentStep].title}
            </h2>
            {lastSaved && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                자동 저장됨 ({lastSaved})
              </span>
            )}
          </div>
          <div className="flex items-center flex-wrap gap-2 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
            {savedCompanies.length > 0 && (
              <select 
                onChange={(e) => loadCompany(e.target.value)} 
                className="text-xs border border-gray-300 rounded px-2 py-1 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                defaultValue=""
              >
                <option value="" disabled>과거 내역 불러오기...</option>
                {savedCompanies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
            <button onClick={() => setIsPreviewOpen(true)} className="text-gray-500 hover:text-blue-600 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium transition-colors">
              <Printer className="w-4 h-4" /> 인쇄 미리보기
            </button>
            <button onClick={() => setIsSettingsOpen(true)} className="text-gray-500 hover:text-gray-700 flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium">
              <Settings className="w-4 h-4" /> API 설정
            </button>
            <button onClick={() => setCurrentStep(7)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5 md:gap-2 shadow-sm ml-auto md:ml-0">
              <Download className="w-4 h-4" /> 저장 및 내보내기
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main ref={contentAreaRef} className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth print:hidden">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Step 0: Cover (Skipped here for brevity, assuming same as before) */}
            {currentStep === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-500" />
                    기본 정보 입력
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">작성 일자</label>
                    <div className="flex gap-2 items-center">
                      <input type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={formData.date.year} onChange={e => setFormData({...formData, date: {...formData.date, year: e.target.value}})} /> 년
                      <input type="text" className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={formData.date.month} onChange={e => setFormData({...formData, date: {...formData.date, month: e.target.value}})} /> 월
                      <input type="text" className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" value={formData.date.day} onChange={e => setFormData({...formData, date: {...formData.date, day: e.target.value}})} /> 일
                    </div>
                  </div>
                  <div className="col-span-2 border-t border-gray-100 pt-6 mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">수진기업 (기업명)</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">대표자명</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.ceo} onChange={e => setFormData({...formData, ceo: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">담당컨설턴트</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.consultant} onChange={e => setFormData({...formData, consultant: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Overview & Financials */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* 0. 기업 개요 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-800">기업 개요</h3>
                  </div>
                  <div className="p-6">
                    <table className="w-full text-left border-collapse border border-gray-300 text-sm">
                      <tbody>
                        <tr>
                          <th className="border border-gray-300 bg-gray-50 p-3 w-1/4 text-center font-medium">회 사 명</th>
                          <td className="border border-gray-300 p-2 w-1/4">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                          </td>
                          <th className="border border-gray-300 bg-gray-50 p-3 w-1/4 text-center font-medium">대 표 자 명</th>
                          <td className="border border-gray-300 p-2 w-1/4">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.ceo} onChange={(e) => setFormData({...formData, ceo: e.target.value})} />
                          </td>
                        </tr>
                        <tr>
                          <th className="border border-gray-300 bg-gray-50 p-3 text-center font-medium">본 점 소 재 지</th>
                          <td colSpan={3} className="border border-gray-300 p-2">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                          </td>
                        </tr>
                        <tr>
                          <th className="border border-gray-300 bg-gray-50 p-3 text-center font-medium">업 종</th>
                          <td className="border border-gray-300 p-2">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
                          </td>
                          <th className="border border-gray-300 bg-gray-50 p-3 text-center font-medium">주 요 품 목</th>
                          <td className="border border-gray-300 p-2">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.products} onChange={(e) => setFormData({...formData, products: e.target.value})} />
                          </td>
                        </tr>
                        <tr>
                          <th className="border border-gray-300 bg-gray-50 p-3 text-center font-medium">설 립 일 자</th>
                          <td className="border border-gray-300 p-2">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.established} onChange={(e) => setFormData({...formData, established: e.target.value})} />
                          </td>
                          <th className="border border-gray-300 bg-gray-50 p-3 text-center font-medium">종 업 원 수</th>
                          <td className="border border-gray-300 p-2">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.employees} onChange={(e) => setFormData({...formData, employees: e.target.value})} />
                          </td>
                        </tr>
                        <tr>
                          <th className="border border-gray-300 bg-gray-50 p-3 text-center font-medium">관 계 기 업</th>
                          <td colSpan={3} className="border border-gray-300 p-2">
                            <input type="text" className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded" value={formData.relatedCompanies} onChange={(e) => setFormData({...formData, relatedCompanies: e.target.value})} />
                          </td>
                        </tr>
                        <tr>
                          <th className="border border-gray-300 bg-gray-50 p-3 text-center font-medium align-top">연 혁</th>
                          <td colSpan={3} className="border border-gray-300 p-2">
                            <textarea className="w-full px-2 py-1 border-0 focus:ring-1 focus:ring-blue-500 rounded min-h-[100px] resize-y" value={formData.history} onChange={(e) => setFormData({...formData, history: e.target.value})} placeholder="- 20XX.XX 내용 입력" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 1. 재무현황 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                   <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-800">주요 재무현황 (단위: 백만원)</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {/* Financial Inputs */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm border-collapse border border-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300">구분</th>
                              <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300">계정과목</th>
                              {formData.financials.map((f, i) => (
                                <th key={i} className="px-3 py-3 text-center border border-gray-300">
                                  <input type="text" className="w-16 font-semibold bg-transparent border-b border-gray-400 focus:border-blue-500 outline-none text-center" defaultValue={f.year} />년
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-3 py-4 font-medium text-gray-900 border border-gray-300 text-center" rowSpan={3}>대차대조표</td>
                              <td className="px-3 py-4 text-gray-700 border border-gray-300 text-center">자산총계</td>
                              {formData.financials.map((f, i) => (
                                <td key={`assets-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={f.assets} onChange={(e) => handleFinancialChange(i, 'assets', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 text-gray-700 border border-gray-300 text-center">부채총계</td>
                              {formData.financials.map((f, i) => (
                                <td key={`liab-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={f.liabilities} onChange={(e) => handleFinancialChange(i, 'liabilities', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 text-gray-700 border border-gray-300 text-center">자본총계</td>
                              {formData.financials.map((f, i) => (
                                <td key={`eq-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={f.equity} onChange={(e) => handleFinancialChange(i, 'equity', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 font-medium text-gray-900 border border-gray-300 text-center" rowSpan={3}>손익계산서</td>
                              <td className="px-3 py-4 text-gray-700 border border-gray-300 text-center">매출액</td>
                              {formData.financials.map((f, i) => (
                                <td key={`sales-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={f.sales} onChange={(e) => handleFinancialChange(i, 'sales', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 text-gray-700 border border-gray-300 text-center">영업이익</td>
                              {formData.financials.map((f, i) => (
                                <td key={`op-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={f.opIncome} onChange={(e) => handleFinancialChange(i, 'opIncome', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 text-gray-700 border border-gray-300 text-center">당기순이익</td>
                              {formData.financials.map((f, i) => (
                                <td key={`ni-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={f.netIncome} onChange={(e) => handleFinancialChange(i, 'netIncome', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Financial Chart */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col">
                        <h4 className="text-sm font-medium text-gray-600 mb-4 text-center">재무 추이</h4>
                        <div className="flex-1 min-h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={formData.financials} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} width={45} />
                              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                              <Line type="monotone" dataKey="assets" name="자산총계" stroke="#3b82f6" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                              <Line type="monotone" dataKey="liabilities" name="부채총계" stroke="#ef4444" strokeWidth={2} />
                              <Line type="monotone" dataKey="equity" name="자본총계" stroke="#8b5cf6" strokeWidth={2} />
                              <Line type="monotone" dataKey="sales" name="매출액" stroke="#10b981" strokeWidth={2} />
                              <Line type="monotone" dataKey="opIncome" name="영업이익" stroke="#06b6d4" strokeWidth={2} />
                              <Line type="monotone" dataKey="netIncome" name="당기순이익" stroke="#f59e0b" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 주요 재무비율 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                   <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-800">주요 재무비율 (단위: %)</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {/* Ratios Inputs */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm border-collapse border border-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300">비율명</th>
                              {formData.ratios.map((r, i) => (
                                <th key={i} className="px-3 py-3 text-center font-medium text-gray-700 border border-gray-300">
                                  <div className="flex items-center justify-center gap-1">
                                    <input type="text" value={r.year} onChange={(e) => handleRatioChange(i, 'year', e.target.value)} className="w-16 font-semibold bg-transparent border-b border-gray-400 focus:border-blue-500 outline-none text-center" />
                                    <span>년</span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-3 py-4 text-gray-700 text-center font-medium border border-gray-300">자기자본비율</td>
                              {formData.ratios.map((r, i) => (
                                <td key={`eqr-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={r.equityRatio} onChange={(e) => handleRatioChange(i, 'equityRatio', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 text-gray-700 text-center font-medium border border-gray-300">재고 자산 회전율</td>
                              {formData.ratios.map((r, i) => (
                                <td key={`ptm-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={r.preTaxMargin} onChange={(e) => handleRatioChange(i, 'preTaxMargin', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 text-gray-700 text-center font-medium border border-gray-300">부가가치율</td>
                              {formData.ratios.map((r, i) => (
                                <td key={`va-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={r.valueAdded} onChange={(e) => handleRatioChange(i, 'valueAdded', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-3 py-4 text-gray-700 text-center font-medium border border-gray-300">차입금 평균 이자율</td>
                              {formData.ratios.map((r, i) => (
                                <td key={`sg-${i}`} className="px-3 py-2 border border-gray-300">
                                  <input type="number" value={r.salesGrowth} onChange={(e) => handleRatioChange(i, 'salesGrowth', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-right" />
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Ratios Chart */}
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col">
                        <h4 className="text-sm font-medium text-gray-600 mb-4 text-center">주요 재무비율 추이</h4>
                        <div className="flex-1 min-h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={formData.ratios} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} width={45} />
                              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                              <Line type="monotone" dataKey="equityRatio" name="자기자본비율" stroke="#3b82f6" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                              <Line type="monotone" dataKey="preTaxMargin" name="재고 자산 회전율" stroke="#f59e0b" strokeWidth={2} />
                              <Line type="monotone" dataKey="valueAdded" name="부가가치율" stroke="#8b5cf6" strokeWidth={2} />
                              <Line type="monotone" dataKey="salesGrowth" name="차입금 평균 이자율" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Environment Analysis */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4"><h3 className="text-lg font-medium text-gray-800">실패원인 진단 및 개선방향 도출</h3></div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 실패원인 분석 &gt;</label>
                      <p className="text-xs text-gray-500 mb-2">(실패시점 당시의 내외부 환경 분석을 통한 주요 실패원인 진단)</p>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[150px] focus:ring-blue-500 focus:border-blue-500" value={formData.failCause} onChange={e => setFormData({...formData, failCause: e.target.value})} />
                    </div>
                    <hr className="border-gray-100" />
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 개선방향 제시 &gt;</label>
                      <p className="text-xs text-gray-500 mb-2">(실패원인 진단내용을 기반으로 경영 정상화 및 채무정리 노력도를 분석하고 실패 재발 방지를 위한 개선방향 도출)</p>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[150px] focus:ring-blue-500 focus:border-blue-500" value={formData.failImprovement} onChange={e => setFormData({...formData, failImprovement: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4"><h3 className="text-lg font-medium text-gray-800">영업 환경 분석</h3></div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 시장 트렌드 &gt;</label>
                      <p className="text-xs text-gray-500 mb-2">(기술 발전 변화, 고객 트렌드, 생활양식 변화, 제품(서비스) 발전 방향 등 시장동향 분석)</p>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[150px] focus:ring-blue-500 focus:border-blue-500" value={formData.marketTrend} onChange={e => setFormData({...formData, marketTrend: e.target.value})} />
                    </div>
                    <hr className="border-gray-100" />
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 5-Force 분석 &gt;</label>
                      <p className="text-xs text-gray-500 mb-2">(기존 기업간 경쟁 정도, 잠재적 경쟁자의 진입장벽, 대체재로부터의 위협, 공급자의 교섭력, 수요자의 교섭력으로 분석)</p>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[150px] focus:ring-blue-500 focus:border-blue-500" value={formData.fiveForce} onChange={e => setFormData({...formData, fiveForce: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Internal Capabilities */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4"><h3 className="text-lg font-medium text-gray-800">내부역량 분석</h3></div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 제품(품질 및 가격) 측면 &gt;</label>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[120px] focus:ring-blue-500 focus:border-blue-500" value={formData.productCapability} onChange={e => setFormData({...formData, productCapability: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 기술력 측면 &gt;</label>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[120px] focus:ring-blue-500 focus:border-blue-500" value={formData.techCapability} onChange={e => setFormData({...formData, techCapability: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 대표자 경영능력 측면 &gt;</label>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[120px] focus:ring-blue-500 focus:border-blue-500" value={formData.ceoCapability} onChange={e => setFormData({...formData, ceoCapability: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 인적자원 측면 &gt;</label>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[120px] focus:ring-blue-500 focus:border-blue-500" value={formData.hrCapability} onChange={e => setFormData({...formData, hrCapability: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4"><h3 className="text-lg font-medium text-gray-800">사업성 분석</h3></div>
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2">(외부환경 및 내부역량 분석 결과를 토대로 수진기업의 영업 계획 실현 가능성 등 사업성 분석)</p>
                    <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[200px] focus:ring-blue-500 focus:border-blue-500" value={formData.businessFeasibility} onChange={e => setFormData({...formData, businessFeasibility: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Checklist */}
            {currentStep === 5 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[600px]">
                {/* Category Tabs */}
                <div className="flex border-b border-gray-200 bg-gray-50 px-4 pt-4 gap-2 overflow-x-auto">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setChecklistCategory(cat)}
                      className={`px-4 py-2 font-medium rounded-t-lg transition-colors border border-b-0 ${
                        checklistCategory === cat 
                          ? 'bg-white text-blue-700 border-gray-200 border-b-white z-10' 
                          : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200'
                      }`}
                      style={{ marginBottom: checklistCategory === cat ? '-1px' : '0' }}
                    >
                      {cat} 부문
                      {/* Check if category is completed */}
                      {checklistData.filter(c => c.category === cat).every(item => formData.checklistScores[item.id] !== undefined) && (
                        <span className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Table Area */}
                <div className="p-6 flex-1 overflow-x-auto">
                   <table className="w-full text-left border-collapse border border-gray-200 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-3 w-[15%]">진단항목</th>
                        <th className="border border-gray-200 p-3 w-[55%]">진단 체크리스트</th>
                        <th className="border border-gray-200 p-3 w-[5%] text-center">V (5)</th>
                        <th className="border border-gray-200 p-3 w-[5%] text-center">G (4)</th>
                        <th className="border border-gray-200 p-3 w-[5%] text-center">N (3)</th>
                        <th className="border border-gray-200 p-3 w-[5%] text-center">B (2)</th>
                        <th className="border border-gray-200 p-3 w-[5%] text-center">W (1)</th>
                        <th className="border border-gray-200 p-3 w-[5%] text-center">제외</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentChecklistItems.map((item, idx) => {
                        const showSubcategory = idx === 0 || currentChecklistItems[idx - 1].subcategory !== item.subcategory;
                        const rowSpan = currentChecklistItems.filter(c => c.subcategory === item.subcategory).length;
                        
                        return (
                          <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                            {showSubcategory && (
                              <td rowSpan={rowSpan} className="border border-gray-200 p-3 font-medium text-gray-700 align-middle text-center bg-gray-50/50">
                                {item.subcategory}
                              </td>
                            )}
                            <td className="border border-gray-200 p-3 text-gray-700">{item.question}</td>
                            
                            {(['V', 'G', 'N', 'B', 'W', 'X'] as const).map(val => (
                              <td key={val} className="border border-gray-200 p-3 text-center align-middle cursor-pointer" onClick={() => handleScoreChange(item.id, val)}>
                                <div className="flex items-center justify-center w-full h-full">
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                    formData.checklistScores[item.id] === val 
                                      ? 'border-blue-600 bg-blue-600' 
                                      : 'border-gray-300 hover:border-blue-400'
                                  }`}>
                                    {formData.checklistScores[item.id] === val && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  
                  {!isChecklistComplete && (
                    <p className="text-red-500 text-sm font-medium mt-4 text-center">
                      해당 부문의 모든 체크리스트를 선택해주세요. ({currentChecklistItems.filter(item => formData.checklistScores[item.id] === undefined).length}개 미완료)
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Results */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4"><h3 className="text-lg font-medium text-gray-800">부문별 경영진단 결과</h3></div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Score Table */}
                    <div>
                      <table className="w-full text-center border-collapse border border-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 p-2">부 문</th>
                            <th className="border border-gray-200 p-2">평 점</th>
                            <th className="border border-gray-200 p-2">등 급</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((r, i) => (
                            <tr key={i}>
                              <td className="border border-gray-200 p-2 font-medium">{r.category}</td>
                              <td className="border border-gray-200 p-2">{r.score > 0 ? r.score : '-'}</td>
                              <td className="border border-gray-200 p-2 font-bold text-blue-700">{r.score > 0 ? r.grade : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Radar Chart */}
                    <div className="bg-gray-50 rounded-lg flex items-center justify-center min-h-[300px]">
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={results}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="category" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="진단 점수" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">핵심 이슈 도출(시사점) 및 경영 개선 방안</h3>
                    <button onClick={handleAIGeneration} disabled={isGenerating} className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
                      {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {isGenerating ? 'AI가 작성 중...' : 'AI 자동 초안 작성'}
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    <table className="w-full text-left border-collapse border border-gray-200 text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-3 w-1/4">부 문</th>
                          <th className="border border-gray-200 p-3 w-3/4">진단결과 및 핵심 이슈 도출(시사점)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(cat => (
                          <tr key={cat}>
                            <td className="border border-gray-200 p-3 font-medium text-center align-middle">{cat} 부문</td>
                            <td className="border border-gray-200 p-0">
                              <textarea 
                                className="w-full h-full min-h-[80px] p-3 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-500 resize-y" 
                                placeholder="내용을 입력하세요..." 
                                value={formData.aiInsights[cat] || ''}
                                onChange={e => setFormData({...formData, aiInsights: {...formData.aiInsights, [cat]: e.target.value}})}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">경영개선 과제 선정 및 실행방안 (Page 6)</label>
                      <p className="text-xs text-gray-500 mb-2">(각 부문별 핵심 이슈에 대한 개선과제 및 구체적인 개선방안 도출)</p>
                      <textarea 
                        className="w-full p-4 border border-gray-300 rounded-md min-h-[200px] focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="내용을 입력하세요..." 
                        value={formData.aiTasks}
                        onChange={e => setFormData({...formData, aiTasks: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">종합 의견 (Page 6)</label>
                      <p className="text-xs text-gray-500 mb-2">(계속기업으로 존속 가능성, 자구계획 목표 수준, 경영진의 혁신 의지 등을 반영한 컨설턴트의 최종 의견)</p>
                      <textarea 
                        className="w-full p-4 border border-gray-300 rounded-md min-h-[150px] focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="내용을 입력하세요..." 
                        value={formData.aiOpinion}
                        onChange={e => setFormData({...formData, aiOpinion: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Guide Pages (13~15p) */}
            {currentStep === 999 && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-3">재창업패키지 지원사업 안내</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-blue-800 mb-3">1. 사업 개요</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-sm leading-relaxed">
                        <p>• <strong>사업 목적:</strong> 사업실패 경험이 있는 (예비)재창업자의 재기를 지원하여 재도전 문화 확산 및 경제 활력 제고</p>
                        <p>• <strong>지원 대상:</strong> 사업실패 경험이 있는 (예비)재창업자 또는 재창업 기업 (업력 7년 이내)</p>
                        <p>• <strong>지원 규모:</strong> 재창업사업화 자금 최대 1억원 (업력 3년 이상 최대 2억원)</p>
                        <p>• <strong>지원 기간:</strong> 협약일로부터 12개월 이내 (최대 18개월까지 연장 가능)</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-blue-800 mb-3">2. 지원 내용</h3>
                      <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-sm leading-relaxed">
                        <p>• <strong>재창업사업화:</strong> 시제품 제작, 지식재산권 취득, 마케팅 활동 등 재창업 사업화에 소요되는 자금 지원</p>
                        <p>• <strong>재기교육:</strong> 실패원인 분석, 재창업 역량 강화를 위한 맞춤형 교육 프로그램 제공</p>
                        <p>• <strong>멘토링:</strong> 분야별 전문가 매칭을 통한 1:1 밀착 멘토링 제공</p>
                        <p>• <strong>컨설팅:</strong> 경영, 기술, 법률, 회계 등 재창업 전 과정에 필요한 전문 컨설팅 지원</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-blue-800 mb-3">3. 컨설팅 진행 절차</h3>
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-6">
                        {['수요조사\n및 접수', '컨설턴트\n매칭', '현장방문\n진단', '보고서\n작성', '결과\n피드백'].map((step, i) => (
                          <React.Fragment key={i}>
                            <div className="flex flex-col items-center gap-2">
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                                i <= 3 ? 'bg-blue-600' : 'bg-gray-400'
                              }`}>{i + 1}</div>
                              <span className="text-xs text-center font-medium whitespace-pre-line">{step}</span>
                            </div>
                            {i < 4 && <ChevronRight className="w-6 h-6 text-gray-300" />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-blue-800 mb-3">4. 유의사항</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 space-y-3 text-sm leading-relaxed">
                        <p>• 본 컨설팅 보고서는 「중소벤처기업부 재창업패키지 지원사업」의 일환으로 작성되었습니다.</p>
                        <p>• 보고서 내용은 수진기업이 제공한 자료 및 현장 인터뷰를 기반으로 작성되며, 제공된 자료의 진위여부에 대한 책임은 수진기업에 있습니다.</p>
                        <p>• 경영진단 결과는 참고 목적이며, 최종 의사결정은 경영자의 판단에 따릅니다.</p>
                        <p>• 본 보고서의 무단 복제 및 배포를 금합니다.</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-blue-800 mb-3">5. 문의처</h3>
                      <div className="bg-gray-50 rounded-lg p-6 text-sm leading-relaxed">
                        <p>• <strong>중소벤처기업부 재도전종합지원센터:</strong> 1357 (중소기업 통합콜센터)</p>
                        <p>• <strong>재창업패키지 전담기관:</strong> 중소벤처기업진흥공단</p>
                        <p>• <strong>홈페이지:</strong> www.k-startup.go.kr</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Export */}
            {currentStep === 6 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">모든 작성이 완료되었습니다!</h3>
                <p className="text-gray-500 max-w-lg mx-auto">
                  입력하신 데이터를 바탕으로 컨설팅 보고서가 준비되었습니다.<br/>원하시는 포맷을 선택하여 문서를 다운로드하세요.
                </p>
                
                <div className="flex justify-center gap-6 pt-6">
                  <button onClick={handleDownloadPDF} className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-gray-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all w-56 group bg-white shadow-sm hover:shadow-md">
                    <FileText className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block font-bold text-gray-800 text-lg">PDF 다운로드</span>
                      <span className="block text-sm text-gray-500 mt-1">인쇄 및 최종 보고용</span>
                    </div>
                  </button>
                  <button onClick={handleDownloadWord} className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all w-56 group bg-white shadow-sm hover:shadow-md">
                    <FileText className="w-12 h-12 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block font-bold text-gray-800 text-lg">Word 다운로드</span>
                      <span className="block text-sm text-gray-500 mt-1">추가 편집 및 수정용</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                이전 단계
              </button>
              <button 
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2"
              >
                다음 단계 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* API Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[500px] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-600" />
                AI API 설정
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API 제공자</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="provider" value="gemini" checked={apiConfig.provider === 'gemini'} onChange={(e) => setApiConfig({...apiConfig, provider: e.target.value})} className="text-blue-600 focus:ring-blue-500" />
                    <span>Google Gemini</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="provider" value="openai" checked={apiConfig.provider === 'openai'} onChange={(e) => setApiConfig({...apiConfig, provider: e.target.value})} className="text-blue-600 focus:ring-blue-500" />
                    <span>OpenAI (ChatGPT)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API 키 (API Key)</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                  placeholder={apiConfig.provider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                  value={apiConfig.key}
                  onChange={(e) => setApiConfig({...apiConfig, key: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-2">
                  * 입력하신 API 키는 브라우저 내부에만 안전하게 저장되며 외부 서버로 전송되지 않습니다.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                취소
              </button>
              <button 
                onClick={() => {
                  localStorage.setItem('consulting_api_key', apiConfig.key);
                  localStorage.setItem('consulting_api_provider', apiConfig.provider);
                  setIsSettingsOpen(false);
                  alert('API 설정이 저장되었습니다.');
                }} 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

        {/* SCREEN ONLY Print Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex flex-col z-[100] print:hidden">
            <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm shrink-0">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-600" />
                인쇄 미리보기 (Print Preview)
              </h2>
              <div className="flex gap-4">
                <button onClick={() => window.print()} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Printer className="w-4 h-4" /> 인쇄 / PDF 저장
                </button>
                <button onClick={() => setIsPreviewOpen(false)} className="text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors">
                  닫기
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-gray-500">
              {/* Only shown on screen, NOT during actual print */}
              <PrintReport formData={formData} results={results} />
            </div>
          </div>
        )}
      </div>

      {isPreparingPrint && (
        <>
          {/* VISIBLE Loading Screen - Hides PrintReport from user's eyes on screen, but is hidden during actual print */}
          <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center print:hidden">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">인쇄 화면 준비 중...</h2>
            <p className="text-gray-500 mt-2">고해상도 차트를 렌더링하고 있습니다.</p>
          </div>

          {/* Actual Print Layout - Rendered normally on screen (behind loading) and printed */}
          <div className="w-full min-w-[210mm] bg-white m-0 p-0">
            <PrintReport formData={formData} results={results} />
          </div>
        </>
      )}
    </>
  );
}
