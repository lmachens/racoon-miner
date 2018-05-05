import { db } from './_client';

const fetchWorkerStats = async ({ minerId, workerId = 'raccoon' }) => {
  const worker = await db.collection('workers').findOne({
    minerId,
    workerId
  });
  return worker;
};

export { fetchWorkerStats };
