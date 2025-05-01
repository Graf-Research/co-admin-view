import express from 'express'
const app = express()
const port = 3008;

interface Province {
  id: number
  name: string
}

interface City {
  id: number
  id_province: number
  name: string
}

interface Product {
  id: number
  name: string
  description: string
  id_province: number
  id_city: number
  created_at: Date
}

interface DB {
  list_province: Province[]
  list_city: City[]
  list_product: Product[]
}

const db: DB = {
  list_province: [{
    id: 1,
    name: "DKI Jakarta"
  }, {
    id: 2,
    name: "Jawa Barat"
  }],
  list_city: [{
    id: 1,
    id_province: 1,
    name: "Jakarta Selatan"
  }, {
    id: 2,
    id_province: 1,
    name: "Jakarta Pusat"
  }, {
    id: 3,
    id_province: 2,
    name: "Bandung"
  }, {
    id: 4,
    id_province: 2,
    name: "Tasikmalaya"
  }],
  list_product: [{
    id: 1,
    name: "Buku Matematika",
    description: "Lorem ipsum",
    id_city: 1,
    id_province: 1,
    created_at: new Date()
  }, {
    id: 2,
    name: "Buku Sejarah",
    description: "Lorem ipsum",
    id_city: 2,
    id_province: 4,
    created_at: new Date()
  }],
};

app.use(require('cors')());
app.use(express.json({limit: '5mb'}));
app.set('trust proxy', true);

app.get('/province', (req, res) => {
  res.status(200).json(db.list_province);
});
app.get('/city', (req, res) => {
  const { id_province } = req.query;
  res.status(200).json(db.list_city.filter(c => c.id_province == id_province as any));
});
app.get('/product', (req, res) => {
  res.status(200).json({
    total: db.list_product.length,
    data: db.list_product
  });
});
app.get('/product-detail', (req, res) => {
  const { key } = req.query;
  const product = db.list_product.find(p => p.id == key as any);
  if (!product) {
    res.status(404).send('Data not found');
    return;
  }
  res.status(200).json(product);
});
app.post('/product', (req, res) => {
  const { name, description, id_province, id_city } = req.body;
  if (!name || !description || !id_province || !id_city) {
    res.status(400).send('Invalid input');
    return;
  }
  db.list_product.push({
    id: new Date().getTime(),
    name,
    description,
    id_city,
    id_province,
    created_at: new Date()
  })
  res.status(200).json(db.list_product.slice(-1)[0]);
});
app.put('/product', (req, res) => {
  const { key } = req.query;
  const { name, description, id_province, id_city } = req.body;
  if (!name || !description || !id_province || !id_city) {
    res.status(400).send('Invalid input');
    return;
  }
  const product_index = db.list_product.findIndex(p => p.id == key as any);
  if (product_index == -1) {
    res.status(404).send('Data not found');
    return;
  }
  db.list_product[product_index].name = name;
  db.list_product[product_index].description = description;
  db.list_product[product_index].id_city = id_city;
  db.list_product[product_index].id_province = id_province;

  res.status(200).json(db.list_product[product_index]);
});
app.delete('/product', (req, res) => {
  const { keys } = req.query;
  if (!keys) {
    res.json(true);
    return;
  }
  const list_product_id = (keys as string).split(/\,/g).map(Number);
  db.list_product = db.list_product.filter(p => !list_product_id.includes(p.id));
  res.status(200).json(true);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
