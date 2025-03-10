import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Player from '@/models/Player';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    await Player.deleteMany({});

    const testPlayers = Array.from({ length: 10 }, (_, index) => ({
      score: Math.floor(Math.random() * 3000) + 1000,
      badges: Math.floor(Math.random() * 10),
      levels: Math.floor(Math.random() * 10) + 1
    }));

    const result = await Player.insertMany(testPlayers);
    
    res.status(200).json({
      success: true,
      message: `Inserted ${result.length} players`,
      players: result
    });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to seed database',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}