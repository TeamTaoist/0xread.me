import { group } from "console";
import db from "../db";

export const insertGroup = async (name: string) => {
  const { group: Group } = db.getSequelizeData();
  const newGroup = await Group.create({
    name,
    members: [],
  });

  console.log("newGroup:", newGroup);
  return newGroup.id;
};

export const getList = async () => {
  const { group: Group } = db.getSequelizeData();
  const groups = await Group.findAll();

  console.log("groups:", groups);
  return groups;
};

export const getGroupById = (id: number) => {
  const { group: Group } = db.getSequelizeData();
  return Group.findOne({ where: { id } });
};

export const updateGroupMembers = (id: number, members: BigInt[]) => {
  const { group: Group } = db.getSequelizeData();
  return Group.update({ members }, { where: { id } });
};
