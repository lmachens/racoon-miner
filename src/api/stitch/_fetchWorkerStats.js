import { db } from './_client';

const fetchWorkerStats = async ({ minerId, workerId }) => {
  const worker = await db.collection('workers').findOne({
    minerId,
    workerId
  });
  return worker;
};

export { fetchWorkerStats };
