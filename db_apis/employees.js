const database = require("../services/database.js");
const oracledb = require("oracledb");

const baseQuery = `select empno "id",
    ename "name",
    job "job",
    mgr "mgr",
    hiredate "hiredate",
    sal "sal",
    deptno "deptno"
  from emp`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.empno = context.id;

    query += `\nwhere empno = :empno`;
  }

  if (context.skip) {
    binds.row_offset = context.skip;

    query += "\noffset :row_offset rows";
  }

  const limit = context.limit > 0 ? context.limit : 30;

  binds.row_limit = limit;

  query += "\nfetch next :row_limit rows only";

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql = `insert into emp (
    ename,
    job,
    mgr,
    hiredate,
    sal,
    deptno
  ) values (
    :ename,
    :job,
    :mgr,
    :hiredate,
    :sal,
    :deptno
  ) returning empno
  into :empno`;

async function create(emp) {
  const employee = Object.assign({}, emp);

  employee.empno = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  };

  const result = await database.simpleExecute(createSql, employee);

  employee.empno = result.outBinds.empno[0];

  return employee;
}

module.exports.create = create;

const updateSql = `update emp
  set ename = :ename,
    job = :job,
    mgr = :mgr,
    hiredate = :hiredate,
    sal = :sal,
    deptno = :deptno
  where empno = :empno`;

async function update(emp) {
  const employee = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, employee);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return employee;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql = `begin
 
    delete from emp
    where empno = :empno;
 
    :rowcount := sql%rowcount;
 
  end;`;

async function del(id) {
  const binds = {
    empno: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  };
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
