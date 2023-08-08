import db from "../db";

export const insertGroup = async (name: string) => {
  const { group: Group } = db.getSequelizeData();
  const newGroup = await Group.create({
    name,
    members: null,
  });

  return newGroup.id;
};

export const getList = async () => {
  const { group: Group } = db.getSequelizeData();
  const groups = await Group.findAll();

  let list = groups.map((g: any) => {
    g.members = g.members && g.members.split(",").map((m: string) => BigInt(m));
    return g;
  });

  return list;
};

export const getGroupById = (id: number) => {
  const { group: Group } = db.getSequelizeData();
  let one = Group.findOne({ where: { id } });
  one.members = one.members && one.members.split(",").map((m: string) => BigInt(m));

  return one;
};

export const updateGroupMembers = (id: number, members_: BigInt[]) => {
  const { group: Group } = db.getSequelizeData();

  let members = members_.join(",");
  return Group.update({ members }, { where: { id } });
};
