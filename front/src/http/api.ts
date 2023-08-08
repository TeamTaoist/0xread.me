import request from "./request";

export const veridyProof = (proof: string) => {
  return request.get(`/proof/verify?proof=${proof}`);
};

export const createGroup = (name: string) => {
  return request.put(`/group/create`, { name });
};

export const getGroups = () => {
  return request.get(`/group/list`);
};

export const joinGroup = (id: number, msg: string) => {
  return request.post(`/proof/issue`, { group_id: id, sign_msg: msg });
};