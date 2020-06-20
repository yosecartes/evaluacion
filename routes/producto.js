var express = require('express');
var router = express.Router();
var productoDB = require('../db/producto');

router.post('/', function (req, res, next) {
  let data = req.body;
  const camposRequeridos = ['codigoProd', 'nombreProd', 'precioProd'];

  camposRequeridos.forEach(item => {
    if (!Object.keys(data).includes(item)) {
      return res.status(404).json('Todos los campos son obligatorios')
    }
  })

  try {
    productoDB.insertar(data)
    res.status(200).json('Datos insertados')
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
});

router.get('/', function (req, res, next) {
  let codigo = req.query.codigo;

  try {
    productoDB.get(codigo).then(result => {
      return res.status(200).json(result)
    })

  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
});

module.exports = router;
