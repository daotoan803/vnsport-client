export default async (axiosPromise) => {
  let res = null;
  try {
    res = await axiosPromise;
  } catch (e) {
    if (!e.response) throw e;
    res = e.response;
  }
  return res;
};
