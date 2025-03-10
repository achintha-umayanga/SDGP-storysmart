import mongoose, { Document } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  score: number;
  badges: number;
  levels: number;
  createdAt: Date;
}

const playerSchema = new mongoose.Schema({
  name: { 
    type: String,
    default: () => `Player ${Math.floor(Math.random() * 1000)}`
  },
  score: { type: Number, required: true },
  badges: { type: Number, default: 0 },
  levels: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Player || mongoose.model<IPlayer>('Player', playerSchema);