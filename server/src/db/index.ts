import { Sequelize, DataTypes, Model } from "sequelize";
import sqlite3 from "sqlite3";

const { verbose } = sqlite3;
const sql = verbose();

const db = new sql.Database("./readme.db", (err) => {
  if (err) {
    console.error("connect db failed", err.message);
    return;
  }
  console.log("==== connect db success ====");
});

const runSql = async (sql: string) => {
  return new Promise((resolve) => {
    db.run(sql, (err: any) => {
      resolve(err);
    });
  });
};

const queryPromise = async (sql: string) => {
  console.log(sql);
  return new Promise((resolve, reject) => {
    db.all(sql, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const sequelizeInit = async () => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "../readme.sqlite",
    });
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    };
    const group = sequelize.define("groups", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    });
    await sequelize.sync();
    return {
      sequelize,
      group,
    };
}



let sequelize: Sequelize;
let group: any;

sequelizeInit().then((res) => {
  sequelize = res.sequelize;
  group = res.group;
});

const getSequelizeData = () => {
  return {
    sequelize,
    group,
  };
};

export default {
  runSql,
  queryPromise,
  getSequelizeData,
};