const fs = require('fs');

const code = \import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

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

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:hidden" />

      {/* Page 2: Overview */}
      <div className="min-h-[270mm] p-2 box-border">
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
        <table className="w-full text-center border-collapse border-2 border-gray-800 text-sm mb-4">
          <thead className="bg-gray-100 font-bold border-b-2 border-gray-800">
            <tr>
              <th className="p-3 border border-gray-400">구 분</th>
              <th className="p-3 border border-gray-400">계정과목</th>
              {formData.financials?.map((f: any, i: number) => (
                <th key={i} className="p-3 border border-gray-400">{f.year}년</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-400 font-bold bg-gray-50" rowSpan={3}>대차대조표</td>
              <td className="p-3 border border-gray-400 bg-gray-50">자산총계</td>
              {formData.financials?.map((f: any, i: number) => <td key={i} className="p-3 border border-gray-400 text-right">{f.assets?.toLocaleString()}</td>)}
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">부채총계</td>
              {formData.financials?.map((f: any, i: number) => <td key={i} className="p-3 border border-gray-400 text-right">{f.liabilities?.toLocaleString()}</td>)}
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">자본총계</td>
              {formData.financials?.map((f: any, i: number) => <td key={i} className="p-3 border border-gray-400 text-right">{f.equity?.toLocaleString()}</td>)}
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 font-bold bg-gray-50" rowSpan={3}>손익계산서</td>
              <td className="p-3 border border-gray-400 bg-gray-50">매출액</td>
              {formData.financials?.map((f: any, i: number) => <td key={i} className="p-3 border border-gray-400 text-right">{f.sales?.toLocaleString()}</td>)}
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">영업이익</td>
              {formData.financials?.map((f: any, i: number) => <td key={i} className="p-3 border border-gray-400 text-right">{f.opIncome?.toLocaleString()}</td>)}
            </tr>
            <tr>
              <td className="p-3 border border-gray-400 bg-gray-50">당기순이익</td>
              {formData.financials?.map((f: any, i: number) => <td key={i} className="p-3 border border-gray-400 text-right">{f.netIncome?.toLocaleString()}</td>)}
            </tr>
          </tbody>
        </table>
        <p className="text-right text-sm text-gray-600 mb-10">(단위: 백만원)</p>
      </div>

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:hidden" />

      {/* Page 3: Environment */}
      <div className="min-h-[270mm] p-2 box-border">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6">2. 경영환경 및 내부역량 분석</h2>
        
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

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:hidden" />

      {/* Page 4: Internal Capabilities */}
      <div className="min-h-[270mm] p-2 box-border">
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

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:hidden" />

      {/* Page 5: Checklist Results */}
      <div className="min-h-[270mm] p-2 box-border">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6">3. 경영진단 결과 및 개선방안</h2>
        
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-800 inline-block"></span>
          부문별 경영진단 결과
        </h3>
        
        <div className="flex gap-8 mb-10 h-[350px]">
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
                <Radar name="진단 점수" dataKey="score" stroke="#1e40af" fill="#1e40af" fillOpacity={0.5} />
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

      <div className="page-break my-8 border-b-2 border-dashed border-gray-300 print:hidden" />

      {/* Page 6: Final Opinions */}
      <div className="min-h-[270mm] p-2 box-border">
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

    </div>
  );
}
\;

fs.writeFileSync('src/components/PrintReport.tsx', code, 'utf-8');
console.log('Generated new PrintReport.tsx');
