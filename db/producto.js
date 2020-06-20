var Sequelize = require('sequelize');

var conn = new Sequelize('evalaucion', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var TblProducto = conn.define('tblProducto', {
    codigoProd: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombreProd: {
        type: Sequelize.STRING
    },
    precioProd: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true 
});

//Crear
exports.insertar = async function (data) {
    try {
        return TblProducto.create(data)
    } catch (error) {
        return "Error al insertar"
    }
}

//GET
exports.get = async function (codigo) {
   
    let resultado = await conn.query(
        `SELECT codigoProd, nombreProd, precioProd from tblproducto where codigoProd =${codigo}`
        ,{
            type: conn.QueryTypes.SELECT
        })
    
    return resultado;    
}
