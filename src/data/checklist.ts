export type Score = 'V' | 'G' | 'N' | 'B' | 'W' | 'X' | null;

export interface ChecklistItem {
  id: string;
  category: string;
  subcategory: string;
  question: string;
}

export const checklistData: ChecklistItem[] = [
  // --- 전략 부문 (Page 7) ---
  { id: 'S1', category: '전략', subcategory: '경영전략', question: '외부환경 분석을 시행하고 있는가? (시장 성장성, 시장 트렌드 등 환경변화)' },
  { id: 'S2', category: '전략', subcategory: '경영전략', question: '사업전략 수립을 위해 내부역량을 분석하고 있는가?' },
  { id: 'S3', category: '전략', subcategory: '경영전략', question: '사업전략을 수립하고 있으며, 그 내용은 적절한가?' },
  { id: 'S4', category: '전략', subcategory: '경영전략', question: '업계의 경쟁구조를 분석하고 있으며, 경쟁전략을 수립하고 있는가?' },
  
  { id: 'S5', category: '전략', subcategory: '경영계획', question: '경영방침 또는 이념이 정립되어 있으며, 전사적으로 공유하고 있는가?' },
  { id: 'S6', category: '전략', subcategory: '경영계획', question: '경영계획(사업계획)을 수립하고 있으며, 회사 내부 부문별로 그 내용은 적절한가?' },
  { id: 'S7', category: '전략', subcategory: '경영계획', question: '경영계획을 단기/중기/장기로 구분하여 수립하고 있는가?' },
  { id: 'S8', category: '전략', subcategory: '경영계획', question: '사업은 경영계획에 따라 진행되고 있으며, 주기적으로 검토하고 있는가?' },
  
  { id: 'S9', category: '전략', subcategory: '경영진 역량', question: '최고경영자의 통찰력 및 지도력은 어떤가?' },
  { id: 'S10', category: '전략', subcategory: '경영진 역량', question: '최고경영자의 기획력과 실행력은 어떤가?' },
  { id: 'S11', category: '전략', subcategory: '경영진 역량', question: '경영간부의 해당 부문 역량은 어떤가?' },
  { id: 'S12', category: '전략', subcategory: '경영진 역량', question: '경영진 내부의 의사소통, 업무협조, 화합 수준은 어떤가?' },
  
  { id: 'S13', category: '전략', subcategory: '사업성', question: '사업 분야의 시장성은 어떤가? (시장규모, 성장성 등 고려)' },
  { id: 'S14', category: '전략', subcategory: '사업성', question: '기술능력(또는 판매능력, 서비스능력) 향상을 위한 투자 및 노력 수준은 어떤가?' },
  { id: 'S15', category: '전략', subcategory: '사업성', question: '경쟁사와 차별화된 부문이 있는가? (타사와 비교해서 경쟁력 있는 부문)' },
  { id: 'S16', category: '전략', subcategory: '사업성', question: '현재 영위하고 있는 사업의 수익성은 어떤가? (개략적인 판단)' },
  
  { id: 'S17', category: '전략', subcategory: '운영전략', question: '핵심 업무 프로세스는 중복되거나 정체되는 곳 없이 원활하게 운영되고 있는가?' },
  { id: 'S18', category: '전략', subcategory: '운영전략', question: '경영진 보고 및 결재 체계는 적절한가? (결재 중복, 결재단계 길이/시간 등 고려)' },
  { id: 'S19', category: '전략', subcategory: '운영전략', question: '의사결정시 임직원의 의견이 최대한 반영되고 있는가?' },

  // --- 마케팅 부문 (Page 8) ---
  { id: 'M1', category: '마케팅', subcategory: '마케팅 체계', question: '기업 경영이 고객 중심 체제로 되어 있는가?' },
  { id: 'M2', category: '마케팅', subcategory: '마케팅 체계', question: '마케팅전략 수립을 위한 시장조사 및 정보 수집을 시행하고 있는가?' },
  { id: 'M3', category: '마케팅', subcategory: '마케팅 체계', question: '마케팅전략 및 영업 전략을 수립하고 있으며, 그에 따라 활동하고 있는가?' },
  { id: 'M4', category: '마케팅', subcategory: '마케팅 체계', question: '고객관리를 시행하고 있는가? (고객 정보 분석, 고객 만족도 조사 등)' },
  { id: 'M5', category: '마케팅', subcategory: '마케팅 체계', question: '마케팅 및 영업 역량은 어떤가? (인력 규모, 영업 경력 및 노하우 등)' },
  { id: 'M6', category: '마케팅', subcategory: '마케팅 체계', question: '고객서비스 제고를 위한 B/S 및 A/S체계를 갖추고 있는가? (체계의 수준)' },
  
  { id: 'M7', category: '마케팅', subcategory: '제품전략', question: '제품은 고객의 니즈에 적합한가?' },
  { id: 'M8', category: '마케팅', subcategory: '제품전략', question: '타사 대비 제품의 경쟁력 수준은 어떤가?' },
  { id: 'M9', category: '마케팅', subcategory: '제품전략', question: '제품 이미지 관리를 위한 노력을 하고 있는가? (브랜드 관리 등)' },
  
  { id: 'M10', category: '마케팅', subcategory: '가격전략', question: '가격 결정시 원가분석 및 수익분석을 시행하고 있는가?' },
  { id: 'M11', category: '마케팅', subcategory: '가격전략', question: '전략적 목표에 따라 가격을 책정하고 있는가? (이익 지향, 매출 지향, 현상 유지 등)' },
  { id: 'M12', category: '마케팅', subcategory: '가격전략', question: '제품 또는 서비스에 대한 가격경쟁력은 가고 있는가?' },
  { id: 'M13', category: '마케팅', subcategory: '가격전략', question: '제품 또는 서비스에 대한 가격 수준은 고객의 기대와 일치하는가?' },
  
  { id: 'M14', category: '마케팅', subcategory: '유통전략', question: '유통경로는 최종구매자의 접근이 편리하게 설계되어 있는가?' },
  { id: 'M15', category: '마케팅', subcategory: '유통전략', question: '유통경로가 제품 또는 서비스의 특성에 비해 적절한 수준인가?' },
  { id: 'M16', category: '마케팅', subcategory: '유통전략', question: '유통경로 확대 또는 신규 거래처 확대를 위한 활동은 잘 이루어지고 있는가?' },
  
  { id: 'M17', category: '마케팅', subcategory: '판촉전략', question: '타사와 차별화된 판촉활동을 전개하고 있는가?' },
  { id: 'M18', category: '마케팅', subcategory: '판촉전략', question: '판촉활동의 효과를 측정하여 차기 판촉활동에 반영하고 있는가?' },

  // --- 재무 부문 (Page 9) ---
  { id: 'F1', category: '재무', subcategory: '회계 / 세무관리', question: '회계 조직은 경영 규모 및 특성에 적합하가? (회계 역량, 인력 수)' },
  { id: 'F2', category: '재무', subcategory: '회계 / 세무관리', question: '회계 처리는 기업회계 기준에 맞게 처리하고 있는가?' },
  { id: 'F3', category: '재무', subcategory: '회계 / 세무관리', question: '회계 보고 및 검토는 적절하게 이루어지고 있는가?' },
  { id: 'F4', category: '재무', subcategory: '회계 / 세무관리', question: '세무 관련 신고는 실수 또는 누락 없이 이루어지고 있는가?' },
  { id: 'F5', category: '재무', subcategory: '회계 / 세무관리', question: '세금을 줄이기 위해 노력하고 있는가? (세법 검토, 세무 자문 등)' },
  
  { id: 'F6', category: '재무', subcategory: '재무구조', question: '현재의 자본구성은 충분한가? (자기자본비율 40%이상 V, 30% 이상 G, 100% 이상 N, 10% 이상 B)' },
  { id: 'F7', category: '재무', subcategory: '재무구조', question: '유동자산에 비해 유동부채가 과다하지 않는가? (유동비율 200%이상 V, 150% 이상 G, 100% 이상 N, 80% 이상 B)' },
  { id: 'F8', category: '재무', subcategory: '재무구조', question: '매출액 대비 현재의 매출채권은 과다하지 않는가? (동종업계 평균 비율 감안)' },
  
  { id: 'F9', category: '재무', subcategory: '자금운용', question: '자금조달 및 운용계획을 수립하고 있으며, 그에 따라 시행하고 있는가?' },
  { id: 'F10', category: '재무', subcategory: '자금운용', question: '자금계획표(자금흐름표)를 작성하여 관리하고 있는가?' },
  { id: 'F11', category: '재무', subcategory: '자금운용', question: '재고자산과 매출채권 회전율은 적절한가? (동종업계 평균 비율 감안)' },
  { id: 'F12', category: '재무', subcategory: '자금운용', question: '자금의 고정화를 유발하는 유휴자산, 비업무용 자산은 과다하지 않는가?' },
  { id: 'F13', category: '재무', subcategory: '자금운용', question: '매출채권 관리는 체계적으로 이루어지고 있는가? (한도 설정, 회수관리 등)' },
  
  { id: 'F14', category: '재무', subcategory: '이익 / 비용관리', question: '월별 매출액, 원가, 판매관리비 등을 분석하고 있는가?' },
  { id: 'F15', category: '재무', subcategory: '이익 / 비용관리', question: '매출액 및 기업 규모 대비 비용은 적절한 수준인가?' },
  
  { id: 'F16', category: '재무', subcategory: '회계자료 활용', question: '재무 분석을 시행하고 있으며, 경영계획에 반영하고 있는가?(매출액 증가율 등)' },
  { id: 'F17', category: '재무', subcategory: '회계자료 활용', question: '고정비, 변동비를 분해하여 손익분기점을 분석하고 있는가? (월별 또는 분기별)' },

  // --- 인사 부문 (Page 10) ---
  { id: 'H1', category: '인사', subcategory: '인사규정', question: '인사규정(또는 기준)이 제정되어 있는가?' },
  { id: 'H2', category: '인사', subcategory: '인사규정', question: '취업규칙, 근로계약서는 적절하게 작성되어 있는가? (근로기준법 적용 여부)' },
  
  { id: 'H3', category: '인사', subcategory: '인사관리', question: '인사 채용 및 승진 기준은 적절한가?' },
  { id: 'H4', category: '인사', subcategory: '인사관리', question: '직원이 준수해야 할 복무지침은 적절하게 작성되어 있는가?' },
  { id: 'H5', category: '인사', subcategory: '인사관리', question: '급여 관리는 적절하게 이루어지고 있는가? (규정, 급여체계, 성과급, 수당 등 종합)' },
  { id: 'H6', category: '인사', subcategory: '인사관리', question: '근무시간, 주당 휴일, 유급휴가 등 근로조건을 규정하고 있는가?' },
  { id: 'H7', category: '인사', subcategory: '인사관리', question: '직원 고충처리를 위한 방안이나 활동이 있는가?' },
  { id: 'H8', category: '인사', subcategory: '인사관리', question: '직원 복리후생 수준은 적절한가? (기업 규모, 직원 수 고려)' },
  { id: 'H9', category: '인사', subcategory: '인사관리', question: '직원간, 상하간 갈등 발생시 갈등을 원만하게 해소하고 있는가?' },
  { id: 'H10', category: '인사', subcategory: '인사관리', question: '역량 개발을 위한 교육훈련 계획을 수립하고 있으며, 그에 따라 실행하고 있는가?' },
  
  { id: 'H11', category: '인사', subcategory: '조직규정', question: '조직별 업무를 명확하게 규정하고 있는가?' },
  { id: 'H12', category: '인사', subcategory: '조직규정', question: '조직별 업무에 대한 권한과 책임이 명확하게 규정되어 있는가?' },
  
  { id: 'H13', category: '인사', subcategory: '조직관리', question: '조직구성시 사업 특성, 개인 역량을 고려하였는가?' },
  { id: 'H14', category: '인사', subcategory: '조직관리', question: '조직구성 상 운영부문(수익부문)과 지원부문의 밸런스가 적절한가?' },
  { id: 'H15', category: '인사', subcategory: '조직관리', question: '업무협조 및 커뮤니케이션은 원활히 이루어지고 있는가? (상하간, 수평간)' },
  { id: 'H16', category: '인사', subcategory: '조직관리', question: '조직문화 확립을 위한 방안이나 노력이 있는가?' },
  
  { id: 'H17', category: '인사', subcategory: '총무', question: '문서의 작성, 정리 및 보관은 적절하게 이루어지고 있는가?' },
  { id: 'H18', category: '인사', subcategory: '총무', question: '경영관리 양식은 적절하게 작성되어 있으며, 컴퓨터를 활용하고 있는가?' },
  { id: 'H19', category: '인사', subcategory: '총무', question: '비품, 물품 관리는 적절하게 이루어지고 있는가?' },

  // --- 생산관리 부문 (Page 11) ---
  { id: 'P1', category: '생산관리', subcategory: '생산계획', question: '생산계획 수립시 타 부문과의 효율성을 고려하고 있는가?' },
  { id: 'P2', category: '생산관리', subcategory: '생산계획', question: '생산계획 수립시 수요예측 및 판매계획과의 조정은 충분히 이루어지고 있는가? (수주와의 연계)' },
  { id: 'P3', category: '생산관리', subcategory: '생산계획', question: '외주계획은 생산능력에 맞게 수립되고 있으며, 생산 계획과 적절한 조정을 취하고 있는가?' },
  
  { id: 'P4', category: '생산관리', subcategory: '생산관리', question: '장단기 설비계획을 수립하고 있으며, 정기적인 설비 관리를 시행하고 있는가?' },
  { id: 'P5', category: '생산관리', subcategory: '생산관리', question: '설비 활용성이 높은가?(설비 규모, 배치 적절성 등)' },
  { id: 'P6', category: '생산관리', subcategory: '생산관리', question: '공장 레이아웃은 생산방식에 적합하게 설계되어 있는가?' },
  { id: 'P7', category: '생산관리', subcategory: '생산관리', question: '공정 트러블 발생시 조치는 절차에 의해 체계적으로 이루어지고 있는가?' },
  { id: 'P8', category: '생산관리', subcategory: '생산관리', question: '공정관리에 작업표준서(지시서, 절차서 등)를 작성하여 적용하고 있는가?' },
  { id: 'P9', category: '생산관리', subcategory: '생산관리', question: '작업 표준화가 되어 있는가? 그 수준은 어떤가? (작업조건, 시간, 표준시간 등)' },
  { id: 'P10', category: '생산관리', subcategory: '생산관리', question: '작업자는 매일 작업결과를 기록 및 보관하고 있는가?' },
  { id: 'P11', category: '생산관리', subcategory: '생산관리', question: '품질방침이 수립되어 있으며, 전 사원이 숙지하고 실행하고 있는가?' },
  { id: 'P12', category: '생산관리', subcategory: '생산관리', question: '검사기준이 명확하고 그 기준대로 시행되고 있는가?' },
  { id: 'P13', category: '생산관리', subcategory: '생산관리', question: '불량 예방활동, 불량 대책 등 불량률을 줄이기 위한 활동을 시행하고 있는가?' },
  { id: 'P14', category: '생산관리', subcategory: '생산관리', question: '제조 일정관리가 안정적으로 이루어지고 있는가? (일정 가변성, 일정 조정 협의 노력 등)' },
  
  { id: 'P15', category: '생산관리', subcategory: '구매관리', question: '구매계획 수립시 시장조사를 시행하고 있는가?' },
  { id: 'P16', category: '생산관리', subcategory: '구매관리', question: '구매시 주문서(발주서)와 입고서류의 확인 및 수량 파악을 정확히 하고 있는가?' },
  
  { id: 'P17', category: '생산관리', subcategory: '재고관리', question: '정기적인 재고조사를 통한 적정 재고량을 유지하고 있는가?' },
  { id: 'P18', category: '생산관리', subcategory: '재고관리', question: '재고 수불관리가 체계적으로 확입되어 있는가?' },
  
  { id: 'P19', category: '생산관리', subcategory: '생산성 향상', question: '생산성 향상 목표를 설정하여 관리하고 있는가?' },
  { id: 'P20', category: '생산관리', subcategory: '생산성 향상', question: '3정5S 운동을 체계적으로 시행하고 있는가?' },
  { id: 'P21', category: '생산관리', subcategory: '생산성 향상', question: '품질 향상, 생산관리 개선을 위한 방안이나 활동이 있는가? (분임조, 제안활동 등)' },

  // --- 정보화 부문 (Page 12) ---
  { id: 'I1', category: '정보화', subcategory: '정보화 계획', question: '정보화계획(사업계획)을 수립하고 있으며, 회사 내부 부문별로 그 내용은 적절한가?' },
  { id: 'I2', category: '정보화', subcategory: '정보화 계획', question: '정보화계획을 단기/중기/장기로 구분하여 수립하고 있는가?' },
  { id: 'I3', category: '정보화', subcategory: '정보화 계획', question: '정보화시스템 구축방안(자체개발/외부개발/패키지구매)을 수립하고 있으며, 예산 집행은 적절한가?' },
  { id: 'I4', category: '정보화', subcategory: '정보화 계획', question: '사업은 정보화계획에 따라 진행되고 있으며, 주기적으로 검토하고 있는가?' },
  { id: 'I5', category: '정보화', subcategory: '정보화 계획', question: '정보화시스템 운영에 따라 발생하는 보안 문제에 대해 대비하고 있는가?' },
  
  { id: 'I6', category: '정보화', subcategory: '임직원 역량', question: '최고경영자의 정보화시스템 필요성에 대한 인식은 어떤가?' },
  { id: 'I7', category: '정보화', subcategory: '임직원 역량', question: '경영진 내부의 의사소통, 업무협조, 화합 수준은 어떤가?' },
  { id: 'I8', category: '정보화', subcategory: '임직원 역량', question: '업무별 담당자가 명확히 구분되어 있는가?' },
  { id: 'I9', category: '정보화', subcategory: '임직원 역량', question: '부문별 정보화시스템 담당자의 역량은 어떤가?' },
  
  { id: 'I10', category: '정보화', subcategory: '시스템 활용', question: '기업규모대비 정보화시스템 수준은 적정한가?' },
  { id: 'I11', category: '정보화', subcategory: '시스템 활용', question: '주요 업무와 정보화시스템 연동이 적절하게 이루어져 있는가?' },
  { id: 'I12', category: '정보화', subcategory: '시스템 활용', question: '사용자 매뉴얼을 작성하여 적용하고 있는가?' },
  { id: 'I13', category: '정보화', subcategory: '시스템 활용', question: '정보화시스템 도입에 따른 효과를 측정하여 관리하고 있는가?' },
  { id: 'I14', category: '정보화', subcategory: '시스템 활용', question: '핵심 업무 프로세스는 중복되거나 정체되는 곳 없이 원활하게 운영되고 있는가?' },
  { id: 'I15', category: '정보화', subcategory: '시스템 활용', question: '주기적인 유지보수를 통해 시스템을 체계적으로 관리하고 있는가?' }
];
