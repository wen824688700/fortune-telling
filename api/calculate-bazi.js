// api/calculate-bazi.js
export default async function handler(req, res) {
  // 设置CORS头，允许前端调用
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { year, month, day, hour, gender, name } = req.body;

    // 临时的模拟数据，后面会替换为真实的MCP调用
    const mockResult = {
      name: name || '用户',
      birthDate: `${year}年${month}月${day}日${hour}时`,
      bazi: {
        year: '甲子',
        month: '乙丑', 
        day: '丙寅',
        hour: '丁卯'
      },
      wuxing: {
        gold: 2,
        wood: 1,
        water: 2,
        fire: 1,
        earth: 2
      },
      fortune: '整体运势较好，需要注意健康方面的问题。事业上会有新的机遇出现。',
      suggestion: '建议多参与社交活动，有利于事业发展。注意劳逸结合。',
      luckyNumbers: [3, 7, 9],
      luckyColors: ['红色', '金色'],
      compatibility: '与属龙、属猴的人合作运势佳'
    };

    res.status(200).json({
      success: true,
      data: mockResult
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      error: '服务器内部错误' 
    });
  }
}
