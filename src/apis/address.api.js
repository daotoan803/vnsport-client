export const getProvince = async () => {
  const res = await fetch('https://provinces.open-api.vn/api/p/');
  const data = await res.json();
  return { status: res.status, data };
};
export const getDistrictByProvinceCode = async (provinceCode) => {
  const res = await fetch(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  );
  const data = await res.json();
  return { status: res.status, data };
};
export const getSubDistrictByDistrictCode = async (districtCode) => {
  const res = await fetch(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  );
  const data = await res.json();
  return { status: res.status, data };
};

export default {
  getProvince,
  getDistrictByProvinceCode,
  getSubDistrictByDistrictCode,
};
