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
    const sqlResult = await connection.execute("SELECT * FROM PEDIDO", {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    });
    return sqlResult.rows.map(item => {
      return {
        idNumber: item.NUMERO_IDENTIFICACION,
        idOrder: item.ID_PEDIDO,
        description: item.DESCRIPCION
      }
    });
  }
  catch (err) {
    throw err;
  }
}

const getOrder = async (idOrder) => {
  try {
    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute("SELECT * FROM PEDIDO where id_pedido="+idOrder, {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    });
    return sqlResult.rows.map(item => {
      return {
        idNumber: item.NUMERO_IDENTIFICACION,
        idOrder: item.ID_PEDIDO,
        description: item.DESCRIPCION
      }
    });
  }
  catch (err) {
    throw err;
  }
}

const create = async (order) => {
  try {
    const sql =
      `BEGIN
      gestionar_pedido (
      :pv_numero_identificacion , 
      :pv_id_pedido,
      :pv_descripcion,
      :pv_accion);
          END ;`;

    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var d = date.getDay();
    var m = date.getMonth();
    var y = date.getYear();

    var idOrder = h + "" + m + "" + s + "" + d + "" + "" + m + "" + y;
    const parameters = {
      pv_numero_identificacion: order.idNumber,
      pv_id_pedido: idOrder,
      pv_descripcion: order.description,
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

const update = async (order) => {
  try {
    const sql =
      `BEGIN
      gestionar_pedido (
      :pv_numero_identificacion , 
      :pv_id_pedido,
      :pv_descripcion,
      :pv_accion);
          END ;`;

    const parameters = {
      pv_numero_identificacion: order.idNumber,
      pv_id_pedido: order.idOrder,
      pv_descripcion: order.description,
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

const deleteOrder = async (idOrder) => {
  try {
    const sql =
      `BEGIN
      gestionar_pedido (
      :pv_numero_identificacion , 
      :pv_id_pedido,
      :pv_descripcion,
      :pv_accion);
          END ;`;

    const parameters = {
      pv_numero_identificacion: '',
      pv_id_pedido: idOrder,
      pv_descripcion: '',
      pv_accion: 'D'
    }


    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute(sql, parameters, { autoCommit: true });
    console.log(`Rows deleted: ${sqlResult.rowsAffected}`);  // 1
    return;
  }
  catch (err) {
    throw err;
  }
}

const orderDetail = async (idOrder) => {
  try {
    
    const parameters = {
      pv_id_pedido: idOrder
    }
    const connection = await oracledb.getConnection(connAttrs);
    const sqlResult = await connection.execute("select * from pedido pe, maestro_clientes ma where pe.numero_identificacion=ma.numero_identificacion and pe.id_pedido="+idOrder, {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    });
    return sqlResult.rows.map(item => {
      return {
        idNumber: item.NUMERO_IDENTIFICACION,
        name: item.NOMBRE,
        surname: item.PRIMER_APELLIDO,
        secondSurname: item.SEGUNDO_APELLIDO,
        idOrder: item.ID_PEDIDO,
        description: item.DESCRIPCION
      }
    });
  }
  catch (err) {
    throw err;
  }
}

module.exports.getOrder = getOrder;
module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteOrder;
module.exports.orderDetail = orderDetail;