/*jslint node:true*/

const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');
const jwt = require('jsonwebtoken');

const connAttrs = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString
}

const list = async () => {
  try {
    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute("SELECT * FROM MAESTRO_CLIENTES", {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    });
    return sqlResult.rows.map(item => {
      return {
        idNumber: item.NUMERO_IDENTIFICACION,
        name: item.NOMBRE,
        surname: item.PRIMER_APELLIDO,
        secondSurname: item.SEGUNDO_APELLIDO
      }
    });
  }
  catch (err) {
    throw err;
  }
}


const getClient = async (idNumber) => {
  try {
    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute("SELECT * FROM MAESTRO_CLIENTES where numero_identificacion="+idNumber, {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    });
    return sqlResult.rows.map(item => {
      return {
        idNumber: item.NUMERO_IDENTIFICACION,
        name: item.NOMBRE,
        surname: item.PRIMER_APELLIDO,
        secondSurname: item.SEGUNDO_APELLIDO
      }
    });
  }
  catch (err) {
    throw err;
  }
}

const create = async (client) => {
  try {
    const sql =
      `BEGIN
      sp_gestionar_maestro_clientes (
        :pv_numero_identificacion ,
        :pv_nombre ,
        :pv_primer_apellido,
        :pv_segundo_apellido,
        :pv_accion);
    END ;`;

    const parameters = {
      pv_numero_identificacion: client.idNumber,
      pv_nombre: client.name,
      pv_primer_apellido: client.surname,
      pv_segundo_apellido: client.secondSurname,
      pv_accion: 'I'
    }

    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute(sql, parameters, { autoCommit: true });
    console.log(`Rows inserted: ${sqlResult.rowsAffected}`);  // 1
    return;
  }
  catch (err) {
    throw err;
  }
}

const update = async (client) => {
  try {
    const sql =
      `BEGIN
      sp_gestionar_maestro_clientes (
        :pv_numero_identificacion ,
        :pv_nombre ,
        :pv_primer_apellido,
        :pv_segundo_apellido,
        :pv_accion);
    END ;`;

    const parameters = {
      pv_numero_identificacion: client.idNumber,
      pv_nombre: client.name,
      pv_primer_apellido: client.surname,
      pv_segundo_apellido: client.secondSurname,
      pv_accion: 'U'
    }

    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute(sql, parameters, { autoCommit: true });
    console.log(`Rows inserted: ${sqlResult.rowsAffected}`);  // 1
    return;
  }
  catch (err) {
    throw err;
  }
}

const deleteClient = async (idNumber) => {
  try {
    const sql =
      `BEGIN
      sp_gestionar_maestro_clientes (
        :pv_numero_identificacion ,
        :pv_nombre ,
        :pv_primer_apellido,
        :pv_segundo_apellido,
        :pv_accion);
    END ;`;

    const parameters = {
      pv_numero_identificacion: idNumber,
      pv_nombre: '',
      pv_primer_apellido: '',
      pv_segundo_apellido: '',
      pv_accion: 'D'
    }

    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute(sql, parameters, { autoCommit: true });
    console.log(`Rows deleted: ${sqlResult.rowsAffected}`);  // 1
    return;
  }
  catch (err) {
    throw err;
    console.log(err);
  }
}


module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteClient;
module.exports.getClient=getClient;