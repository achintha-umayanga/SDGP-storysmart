import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Player, { IPlayer } from '@/models/Player';

export interface LeaderboardPlayer extends Omit<IPlayer, '_id'> {
  _id: string;
  rank: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LeaderboardPlayer[] | { error: string }>
) {
  try {
    await dbConnect();

    const players = await Player.find({})
      .sort({ score: -1 })
      .limit(10)
      .lean();

    const rankedPlayers: LeaderboardPlayer[] = players.map((player, index) => ({
      _id: player._id.toString(),
      name: player.name || `Player ${index + 1}`,
      score: player.score,
      badges: player.badges,
      levels: player.levels,
      createdAt: player.createdAt,
      rank: index + 1
    }));

    res.status(200).json(rankedPlayers);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}