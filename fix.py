import re
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

bad_pattern = r'\{currentStep === 3 && \([\s\S]*?\{currentStep === 4 && \('
correct_block = '''{currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4"><h3 className="text-lg font-medium text-gray-800">내부역량 분석</h3></div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 제품(품질) 및 가격 측면 &gt;</label>
                        <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[120px] focus:ring-blue-500 focus:border-blue-500" value={formData.productCapability} onChange={e => setFormData({...formData, productCapability: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 기술력 측면 &gt;</label>
                        <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[120px] focus:ring-blue-500 focus:border-blue-500" value={formData.techCapability} onChange={e => setFormData({...formData, techCapability: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-blue-700 mb-2">&lt; 경영자 경영능력 측면 &gt;</label>
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
                      <p className="text-xs text-gray-500 mb-2">(환경 분석 및 내부역량 분석 결과를 종합하여 수진기업의 사업 계획 실현 가능성 및 사업성 분석)</p>
                      <textarea className="w-full p-4 border border-gray-300 rounded-md min-h-[200px] focus:ring-blue-500 focus:border-blue-500" value={formData.businessFeasibility} onChange={e => setFormData({...formData, businessFeasibility: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Checklist */}
              {currentStep === 4 && ('''

new_content = re.sub(bad_pattern, correct_block, content)
with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
