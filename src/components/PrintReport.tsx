import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, LabelList } from 'recharts';
import { checklistData } from '../data/checklist';

export const PrintReport = ({ formData, results }: { formData: any, results: any }) => {
  return (
    <div id="print-report" className="bg-white text-black p-8 max-w-[210mm] mx-auto shadow-lg border border-gray-200" style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}>
      
      {/* Page 1: Cover */}
      <div className="flex flex-col items-center justify-center min-h-[270mm] border-4 border-double border-gray-800 p-8 box-border">
        <h1 className="text-4xl font-extrabold mb-24 tracking-widest text-center mt-20">재창업·재도전지원<br/><br/>컨설팅 보고서</h1>
        
        <table className="w-3/4 border-collapse border-2 border-gray-800 text-lg mb-20 mt-20">
          <tbody>
            <tr>
              <th className="border border-gray-800 bg-gray-100 p-4 text-center w-1/3">수진기업명</th>
              <td className="border border-gray-800 p-4 text-center">{formData.company || ' '}</td>
            </tr>
            <tr>
              <th className="border border-gray-800 bg-gray-100 p-4 text-center">대 표 자 명</th>
              <td className="border border-gray-800 p-4 text-center">{formData.ceo || ' '}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="flex-1"></div>
        
        <div className="text-right w-full text-xl font-bold mb-10">
          <p className="mb-4">컨 설 턴 트 : {formData.consultant || ' '} (서명)</p>
          <p>{formData.date?.year || '2024'} 년 {formData.date?.month || '10'} 월 {formData.date?.day || '25'} 일</p>
        </div>
      </div>

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:border-none print:my-0" />

      {/* Page 2: Overview */}
      <div className="min-h-[270mm] print-page-container print:h-auto p-2 box-border">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6">1. 기업 개요 및 재무현황</h2>
        
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          기업 개요
        </h3>
        <table className="w-full border-collapse border-2 border-gray-800 text-sm mb-10">
          <tbody>
            <tr>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold w-[20%]">업 체 명</th>
              <td className="border border-gray-400 p-3 w-[30%]">{formData.company}</td>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold w-[20%]">대 표 자</th>
              <td className="border border-gray-400 p-3 w-[30%]">{formData.ceo}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold">소 재 지</th>
              <td colSpan={3} className="border border-gray-400 p-3">{formData.address}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold">업 종</th>
              <td className="border border-gray-400 p-3">{formData.industry}</td>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold">주 요 품 목</th>
              <td className="border border-gray-400 p-3">{formData.products}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold">설 립 일 자</th>
              <td className="border border-gray-400 p-3">{formData.established}</td>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold">종 업 원 수</th>
              <td className="border border-gray-400 p-3">{formData.employees}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold">관 계 기 업</th>
              <td colSpan={3} className="border border-gray-400 p-3">{formData.relatedCompanies}</td>
            </tr>
            <tr>
              <th className="border border-gray-400 bg-gray-100 p-3 text-center font-bold align-top">연 혁</th>
              <td colSpan={3} className="border border-gray-400 p-3 whitespace-pre-wrap leading-relaxed">{formData.history}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          주요 재무현황
        </h3>
        <div className="flex flex-col mb-10">
          <table className="w-full text-center border-collapse border-2 border-gray-800 text-sm">
            <thead className="bg-gray-100 font-bold border-b-2 border-gray-800">
              <tr>
                <th className="p-2 border border-gray-400">구 분</th>
                <th className="p-2 border border-gray-400">계정과목</th>
                {formData.financials?.map((f: any, i: number) => (
                  <th key={i} className="p-2 border border-gray-400">{f.year}년</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50" rowSpan={3}>대차대조표</td>
                <td className="p-2 border border-gray-400 bg-gray-50">자산총계</td>
                {formData.financials?.map((f: any, i: number) => <td key={i} className="p-2 border border-gray-400 text-right">{f.assets?.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 bg-gray-50">부채총계</td>
                {formData.financials?.map((f: any, i: number) => <td key={i} className="p-2 border border-gray-400 text-right">{f.liabilities?.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 bg-gray-50">자본총계</td>
                {formData.financials?.map((f: any, i: number) => <td key={i} className="p-2 border border-gray-400 text-right">{f.equity?.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-bold bg-gray-50" rowSpan={3}>손익계산서</td>
                <td className="p-2 border border-gray-400 bg-gray-50">매출액</td>
                {formData.financials?.map((f: any, i: number) => <td key={i} className="p-2 border border-gray-400 text-right">{f.sales?.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 bg-gray-50">영업이익</td>
                {formData.financials?.map((f: any, i: number) => <td key={i} className="p-2 border border-gray-400 text-right">{f.opIncome?.toLocaleString()}</td>)}
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 bg-gray-50">당기순이익</td>
                {formData.financials?.map((f: any, i: number) => <td key={i} className="p-2 border border-gray-400 text-right">{f.netIncome?.toLocaleString()}</td>)}
              </tr>
            </tbody>
          </table>
          <p className="text-right text-xs text-gray-600 mt-1 mb-4">(단위: 백만원)</p>

          <div className="flex gap-4 h-[180px] print:break-inside-avoid">
            {/* Balance Sheet Chart */}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-center font-bold text-xs mb-1 text-gray-700">대차대조표 (자산/부채/자본)</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formData.financials} margin={{ top: 20, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#000', fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 9, fontWeight: 'bold', paddingLeft: 50 }} />
                  <Line name="자산" type="monotone" dataKey="assets" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                    <LabelList dataKey="assets" position="top" formatter={(val: number) => val?.toLocaleString()} fontSize={12} fill="#64748b" />
                  </Line>
                  <Line name="부채" type="monotone" dataKey="liabilities" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                    <LabelList dataKey="liabilities" position="top" formatter={(val: number) => val?.toLocaleString()} fontSize={12} fill="#ef4444" />
                  </Line>
                  <Line name="자본" type="monotone" dataKey="equity" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                    <LabelList dataKey="equity" position="top" formatter={(val: number) => val?.toLocaleString()} fontSize={12} fill="#22c55e" />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Income Statement Chart */}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-center font-bold text-xs mb-1 text-gray-700">손익계산서 (매출/이익)</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formData.financials} margin={{ top: 20, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#000', fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 9, fontWeight: 'bold', paddingLeft: 50 }} />
                  <Line name="매출액" type="monotone" dataKey="sales" stroke="#1e40af" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                    <LabelList dataKey="sales" position="top" formatter={(val: number) => val?.toLocaleString()} fontSize={12} fill="#1e40af" />
                  </Line>
                  <Line name="영업이익" type="monotone" dataKey="opIncome" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                    <LabelList dataKey="opIncome" position="top" formatter={(val: number) => val?.toLocaleString()} fontSize={12} fill="#f59e0b" />
                  </Line>
                  <Line name="당기순이익" type="monotone" dataKey="netIncome" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                    <LabelList dataKey="netIncome" position="top" formatter={(val: number) => val?.toLocaleString()} fontSize={12} fill="#06b6d4" />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:border-none print:my-0" />

      {/* Page 3: Ratios & Environment */}
      <div className="min-h-[270mm] print-page-container print:h-auto p-2 box-border">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          주요 재무비율
        </h3>
        <div className="flex gap-6 mb-10 items-stretch h-[220px]">
          
          {/* Left: Table */}
          <div className="w-[50%] flex flex-col">
            <table className="w-full text-center border-collapse border-2 border-gray-800 text-sm h-full">
              <thead className="bg-gray-100 font-bold border-b-2 border-gray-800">
                <tr>
                  <th className="p-2 border border-gray-400">구 분</th>
                  {formData.ratios?.map((r: any, i: number) => (
                    <th key={i} className="p-2 border border-gray-400">{r.year}년</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-400 font-bold bg-gray-50">자기자본비율 (%)</td>
                  {formData.ratios?.map((r: any, i: number) => <td key={i} className="p-2 border border-gray-400">{r.equityRatio}</td>)}
                </tr>
                <tr>
                  <td className="p-2 border border-gray-400 font-bold bg-gray-50">매출액순이익률 (%)</td>
                  {formData.ratios?.map((r: any, i: number) => <td key={i} className="p-2 border border-gray-400">{r.preTaxMargin}</td>)}
                </tr>
                <tr>
                  <td className="p-2 border border-gray-400 font-bold bg-gray-50">부가가치율 (%)</td>
                  {formData.ratios?.map((r: any, i: number) => <td key={i} className="p-2 border border-gray-400">{r.valueAdded}</td>)}
                </tr>
                <tr>
                  <td className="p-2 border border-gray-400 font-bold bg-gray-50">매출액증가율 (%)</td>
                  {formData.ratios?.map((r: any, i: number) => <td key={i} className="p-2 border border-gray-400">{r.salesGrowth}</td>)}
                </tr>
              </tbody>
            </table>
            <p className="text-right text-xs text-gray-600 mt-1">(단위: %)</p>
          </div>

          {/* Right: Chart */}
          <div className="w-[50%] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formData.ratios} margin={{ top: 20, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#000', fontWeight: 'bold' }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 9, fontWeight: 'bold', paddingLeft: 50 }} />
                <Line name="자기자본비율" type="monotone" dataKey="equityRatio" stroke="#1e40af" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                  <LabelList dataKey="equityRatio" position="top" fontSize={12} fill="#1e40af" />
                </Line>
                <Line name="매출액순이익률" type="monotone" dataKey="preTaxMargin" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                  <LabelList dataKey="preTaxMargin" position="top" fontSize={12} fill="#3b82f6" />
                </Line>
                <Line name="부가가치율" type="monotone" dataKey="valueAdded" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                  <LabelList dataKey="valueAdded" position="top" fontSize={12} fill="#f59e0b" />
                </Line>
                <Line name="매출액증가율" type="monotone" dataKey="salesGrowth" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false}>
                  <LabelList dataKey="salesGrowth" position="top" fontSize={12} fill="#10b981" />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6 mt-10">2. 경영환경 및 내부역량 분석</h2>
        
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          영업 환경 분석 (외부 환경)
        </h3>
        
        <div className="mb-6 border-2 border-gray-800 rounded-sm">
          <div className="bg-gray-100 border-b-2 border-gray-800 p-3 font-bold text-center">시장 트렌드</div>
          <div className="p-4 whitespace-pre-wrap min-h-[150px]">{formData.marketTrend || '내용 없음'}</div>
        </div>
        
        <div className="mb-10 border-2 border-gray-800 rounded-sm">
          <div className="bg-gray-100 border-b-2 border-gray-800 p-3 font-bold text-center">5-Force 분석</div>
          <div className="p-4 whitespace-pre-wrap min-h-[150px]">{formData.fiveForce || '내용 없음'}</div>
        </div>
      </div>
      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:border-none print:my-0" />

      {/* Page 4: Internal Capabilities */}
      <div className="min-h-[270mm] print-page-container print:h-auto p-2 box-border">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2 mt-4">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          내부역량 분석
        </h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="border-2 border-gray-800 rounded-sm">
            <div className="bg-gray-100 border-b-2 border-gray-800 p-3 font-bold text-center">제품(품질 및 가격) 측면</div>
            <div className="p-4 whitespace-pre-wrap min-h-[120px]">{formData.productCapability || '내용 없음'}</div>
          </div>
          
          <div className="border-2 border-gray-800 rounded-sm">
            <div className="bg-gray-100 border-b-2 border-gray-800 p-3 font-bold text-center">기술력 측면</div>
            <div className="p-4 whitespace-pre-wrap min-h-[120px]">{formData.techCapability || '내용 없음'}</div>
          </div>
          
          <div className="border-2 border-gray-800 rounded-sm">
            <div className="bg-gray-100 border-b-2 border-gray-800 p-3 font-bold text-center">대표자 경영능력 측면</div>
            <div className="p-4 whitespace-pre-wrap min-h-[120px]">{formData.ceoCapability || '내용 없음'}</div>
          </div>
        </div>
      </div>

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:border-none print:my-0" />

      {/* Page 5: Checklist Results */}
      <div className="min-h-[270mm] print-page-container print:h-auto p-2 box-border">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6">3. 경영진단 결과 및 개선방안</h2>
        
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          부문별 경영진단 결과
        </h3>
        
        <div className="flex gap-8 mb-10 h-[350px] print:break-inside-avoid">
          <div className="flex-1 flex flex-col justify-center">
            <table className="w-full text-center border-collapse border-2 border-gray-800 text-sm">
              <thead className="bg-gray-100 border-b-2 border-gray-800">
                <tr>
                  <th className="border border-gray-400 p-3">부 문</th>
                  <th className="border border-gray-400 p-3">평 점</th>
                  <th className="border border-gray-400 p-3">등 급</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((r: any, i: number) => (
                  <tr key={i}>
                    <td className="border border-gray-400 p-3 font-bold bg-gray-50">{r.category}</td>
                    <td className="border border-gray-400 p-3">{r.score > 0 ? r.score : '-'}</td>
                    <td className="border border-gray-400 p-3 font-bold text-blue-800">{r.score > 0 ? r.grade : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-gray-800 rounded-sm bg-white p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={results || []}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" tick={{ fill: '#000', fontSize: 12, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="진단 점수" dataKey="score" stroke="#1e40af" fill="#1e40af" fillOpacity={0.5} isAnimationActive={false} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          핵심 이슈 도출(시사점) 및 경영 개선 방안
        </h3>
        
        <table className="w-full text-left border-collapse border-2 border-gray-800 text-sm mb-6">
          <thead className="bg-gray-100 border-b-2 border-gray-800">
            <tr>
              <th className="border border-gray-400 p-3 w-[20%] text-center">부 문</th>
              <th className="border border-gray-400 p-3 text-center">진단결과 및 핵심 이슈 도출(시사점)</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((r: any) => (
              <tr key={r.category}>
                <td className="border border-gray-400 p-3 font-bold text-center bg-gray-50">{r.category} 부문</td>
                <td className="border border-gray-400 p-3 whitespace-pre-wrap min-h-[60px]">
                  {formData.aiInsights?.[r.category] || '내용 없음'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:border-none print:my-0" />

      {/* Page 6: Final Opinions */}
      <div className="min-h-[270mm] print-page-container print:h-auto p-2 box-border">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2 mt-4">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          경영개선 과제 선정 및 실행방안
        </h3>
        <div className="mb-10 border-2 border-gray-800 rounded-sm">
          <div className="p-6 whitespace-pre-wrap min-h-[250px] leading-relaxed">{formData.aiTasks || '내용 없음'}</div>
        </div>

        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          종합 의견
        </h3>
        <div className="border-2 border-gray-800 rounded-sm">
          <div className="p-6 whitespace-pre-wrap min-h-[250px] leading-relaxed">{formData.aiOpinion || '내용 없음'}</div>
        </div>
      </div>

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:border-none print:my-0" />

      {/* Pages 7-12: Checklists */}
      {['전략', '마케팅', '재무', '인사', '생산관리', '정보화'].map((cat, catIdx) => {
        const catItems = checklistData.filter(c => c.category === cat);
        return (
          <React.Fragment key={cat}>
            <div className="min-h-[270mm] print-page-container print:h-auto p-2 box-border">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6">
                부문별 진단 체크리스트 - {cat}
              </h2>
              <table className="w-full text-sm border-collapse border-2 border-gray-800 text-center">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-800 print:break-inside-avoid">
                    <th className="border border-gray-400 p-3 w-[15%]">진단항목</th>
                    <th className="border border-gray-400 p-3 w-[55%]">진단 체크리스트</th>
                    <th className="border border-gray-400 p-2 w-[5%] text-xs">V</th>
                    <th className="border border-gray-400 p-2 w-[5%] text-xs">G</th>
                    <th className="border border-gray-400 p-2 w-[5%] text-xs">N</th>
                    <th className="border border-gray-400 p-2 w-[5%] text-xs">B</th>
                    <th className="border border-gray-400 p-2 w-[5%] text-xs">W</th>
                    <th className="border border-gray-400 p-2 w-[5%] text-xs">제외</th>
                  </tr>
                </thead>
                <tbody>
                {catItems.map((item, idx) => {
                  const showSubcategory = idx === 0 || catItems[idx - 1].subcategory !== item.subcategory;
                  return (
                    <React.Fragment key={item.id}>
                      {showSubcategory && (
                        <tr className="bg-gray-50 border-b border-gray-400 print:break-inside-avoid">
                          <td colSpan={8} className="p-2 font-bold text-left text-gray-800">
                            ■ {item.subcategory}
                          </td>
                        </tr>
                      )}
                      <tr className="border-b border-gray-400 print:break-inside-avoid text-left">
                        <td className="border border-gray-400 p-3 text-center font-medium">{item.id}</td>
                        <td className="border border-gray-400 p-3">{item.question}</td>
                        {(['V', 'G', 'N', 'B', 'W', 'X'] as const).map((val, vIdx) => (
                          <td key={val} className="border border-gray-400 p-2 text-center font-bold text-blue-800">
                            {formData.checklistScores?.[item.id] === val ? 'O' : ''}
                          </td>
                        ))}
                      </tr>
                    </React.Fragment>
                  );
                })}
                </tbody>
              </table>
            </div>
            <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:border-none print:my-0" />
          </React.Fragment>
        );
      })}

      {/* Page 13: Guide Page */}
      <div className="min-h-[270mm] print-page-container print:h-auto p-2 box-border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-900 pb-2">재창업패키지 지원사업 안내</h2>
        
        <div className="space-y-8">
          <div className="print:break-inside-avoid">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-800 inline-block"></span>
              1. 사업 개요
            </h3>
            <div className="bg-gray-50 border border-gray-300 rounded-sm p-5 space-y-2 text-sm leading-relaxed">
              <p>• <strong>사업 목적:</strong> 사업실패 경험이 있는 (예비)재창업자의 재기를 지원하여 재도전 문화 확산 및 경제 활력 제고</p>
              <p>• <strong>지원 대상:</strong> 사업실패 경험이 있는 (예비)재창업자 또는 재창업 기업 (업력 7년 이내)</p>
              <p>• <strong>지원 규모:</strong> 재창업사업화 자금 최대 1억원 (업력 3년 이상 최대 2억원)</p>
              <p>• <strong>지원 기간:</strong> 협약일로부터 12개월 이내 (최대 18개월까지 연장 가능)</p>
            </div>
          </div>

          <div className="print:break-inside-avoid">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-800 inline-block"></span>
              2. 지원 내용
            </h3>
            <div className="bg-gray-50 border border-gray-300 rounded-sm p-5 space-y-2 text-sm leading-relaxed">
              <p>• <strong>재창업사업화:</strong> 시제품 제작, 지식재산권 취득, 마케팅 활동 등 재창업 사업화에 소요되는 자금 지원</p>
              <p>• <strong>재기교육:</strong> 실패원인 분석, 재창업 역량 강화를 위한 맞춤형 교육 프로그램 제공</p>
              <p>• <strong>멘토링:</strong> 분야별 전문가 매칭을 통한 1:1 밀착 멘토링 제공</p>
              <p>• <strong>컨설팅:</strong> 경영, 기술, 법률, 회계 등 재창업 전 과정에 필요한 전문 컨설팅 지원</p>
            </div>
          </div>

          <div className="print:break-inside-avoid">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-800 inline-block"></span>
              3. 컨설팅 진행 절차
            </h3>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-sm p-6">
              {['수요조사\n및 접수', '컨설턴트\n매칭', '현장방문\n진단', '보고서\n작성', '결과\n피드백'].map((step, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      i <= 3 ? 'bg-blue-600' : 'bg-gray-400'
                    }`}>{i + 1}</div>
                    <span className="text-xs text-center font-bold whitespace-pre-line">{step}</span>
                  </div>
                  {i < 4 && <span className="text-2xl text-gray-400">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="print:break-inside-avoid">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-800 inline-block"></span>
              4. 유의사항
            </h3>
            <div className="border-2 border-gray-800 rounded-sm p-5 space-y-2 text-sm leading-relaxed font-bold">
              <p>• 본 컨설팅 보고서는 「중소벤처기업부 재창업패키지 지원사업」의 일환으로 작성되었습니다.</p>
              <p>• 보고서 내용은 수진기업이 제공한 자료 및 현장 인터뷰를 기반으로 작성되며, 제공된 자료의 진위여부에 대한 책임은 수진기업에 있습니다.</p>
              <p>• 경영진단 결과는 참고 목적이며, 최종 의사결정은 경영자의 판단에 따릅니다.</p>
              <p>• 본 보고서의 무단 복제 및 배포를 금합니다.</p>
            </div>
          </div>

          <div className="print:break-inside-avoid">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-800 inline-block"></span>
              5. 문의처
            </h3>
            <div className="bg-gray-50 border border-gray-300 rounded-sm p-5 space-y-1 text-sm leading-relaxed">
              <p>• <strong>중소벤처기업부 재도전종합지원센터:</strong> 1357 (중소기업 통합콜센터)</p>
              <p>• <strong>재창업패키지 전담기관:</strong> 중소벤처기업진흥공단</p>
              <p>• <strong>홈페이지:</strong> www.k-startup.go.kr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
