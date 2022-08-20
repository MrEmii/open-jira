import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry } from '../../../interfaces';
import { EntryModel, EntrySchema } from '../../../models';

type Data =
  | {
      entry: EntrySchema;
    }
  | {
      entries: EntrySchema[];
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return createEntry(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

const getEntries = async (res: NextApiResponse) => {
  await db.connect();
  const entries = await EntryModel.find().sort({ createdAt: 'ascending' });
  await db.disconnect();

  res.status(200).json({ entries });
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;

  const entry = new EntryModel({
    description,
    createdAt: new Date().getTime(),
    status: 'pending',
  });

  try {
    await db.connect();
    await entry.save();
    await db.disconnect();
    return res.status(200).json({ entry });
  } catch (error) {
    return res.status(500).json({ message: error as string });
  }
};
