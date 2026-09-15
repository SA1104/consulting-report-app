const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// I will find the start of the corrupted section:
// <table className="w-full text-left border-collapse border border-gray-200 text-sm">
// ... down to ...
// {currentStep === 6 && (

const startMarker = '<table className="w-full text-left border-collapse border border-gray-200 text-sm">';
const endMarker = '{/* Step 6: Export */}';

const startIndex = content.lastIndexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Markers not found");
    process.exit(1);
}

const correctBlock = \\
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
                              <textarea className="w-full h-full min-h-[80px] p-3 border-0 focus:ring-2 focus:ring-inset focus:ring-blue-500 resize-y" placeholder="내용을 입력하세요..." />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">경영개선 과제 선정 및 실행방안 (Page 6)</label>
                      <p className="text-xs text-gray-500 mb-2">(각 부문별 핵심 이슈에 대한 개선과제 및 구체적인 개선방안 도출)</p>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[200px] focus:ring-blue-500 focus:border-blue-500" placeholder="내용을 입력하세요..." />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">종합 의견 (Page 6)</label>
                      <p className="text-xs text-gray-500 mb-2">(계속기업으로 존속 가능성, 자구계획 목표 수준, 경영진의 혁신 의지 등을 반영한 컨설턴트의 최종 의견)</p>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[150px] focus:ring-blue-500 focus:border-blue-500" placeholder="내용을 입력하세요..." />
                    </div>
                  </div>
                </div>
              </div>
            )}

            \;

content = content.substring(0, startIndex) + correctBlock + content.substring(endIndex);
fs.writeFileSync('src/app/page.tsx', content, 'utf-8');
console.log("Fixed!");
