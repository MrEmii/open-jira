import mongoose, { MongooseError } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { EntryModel, EntrySchema } from '../../../models';

type Data =
  | {
      message: string;
    }
  | EntrySchema;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  switch (req.method) {
    case 'GET':
      return getEntry(id as string, res);
    case 'PUT':
      return updateEntry(req, res);
    case 'DELETE':
      return deleteEntry(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await EntryModel.findById(id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    const { description = entry.description, status = entry.status } = req.body;

    await entry.updateOne(
      { description, status },
      {
        runValidators: true,
        new: true,
      }
    );
    const newEntry = await entry.save();

    await db.disconnect();
    return res.status(200).json({ ...newEntry.toJSON(), description, status });
  } catch (error) {
    await db.disconnect();
    return res
      .status(500)
      .json({ message: (error as any).errors.status.message });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await EntryModel.findById(id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await entry.remove();
    await db.disconnect();
    return res.status(200).json({ message: 'Entry deleted' });
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: (error as MongooseError).message });
  }
};

const getEntry = async (id: string, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entry = await EntryModel.findById(id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await db.disconnect();
    return res.status(200).json(entry.toJSON());
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: (error as MongooseError).message });
  }
};
