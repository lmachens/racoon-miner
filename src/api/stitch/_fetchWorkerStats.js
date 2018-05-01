import { db } from './_client';

const fetchWorkerStats = async ({ minerId, workerId }) => {
  const worker = await db.collection('workers').findOne({
    minerId,
    workerId
  });
  console.log(worker);
  return worker;
};

export { fetchWorkerStats };
