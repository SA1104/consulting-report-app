import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, clientKey, clientProvider } = await request.json();

    // 1. Check if the user provided a key via the Vercel Environment Variables
    // VERCEL_GEMINI_API_KEY or VERCEL_OPENAI_API_KEY
    const serverGeminiKey = process.env.GEMINI_API_KEY;
    const serverOpenAIKey = process.env.OPENAI_API_KEY;

    // 2. Decide which key and provider to use (Server env vars take priority)
    let finalKey = '';
    let finalProvider = '';

    if (serverGeminiKey) {
      finalKey = serverGeminiKey;
      finalProvider = 'gemini';
    } else if (serverOpenAIKey) {
      finalKey = serverOpenAIKey;
      finalProvider = 'openai';
    } else if (clientKey) {
      finalKey = clientKey;
      finalProvider = clientProvider;
    } else {
      return NextResponse.json({ error: 'API 키가 서버에도 클라이언트에도 설정되지 않았습니다.' }, { status: 400 });
    }

    let jsonStr = '';

    if (finalProvider === 'gemini') {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${finalKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { response_mime_type: "application/json" }
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      jsonStr = data.candidates[0].content.parts[0].text;
    } else {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${finalKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: "json_object" }
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      jsonStr = data.choices[0].message.content;
    }

    return NextResponse.json({ result: jsonStr });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message || '서버에서 AI 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
