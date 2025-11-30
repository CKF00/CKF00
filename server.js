const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 模拟订单数据库
let orders = [];

/**
 * 创建订单
 */
app.post("/api/order/create", (req, res) => {
  const { productId, price } = req.body;

  const order = {
    orderId: "ORD" + Date.now(),
    productId,
    price,
    status: "pending", // pending | paid
    createTime: new Date()
  };

  orders.push(order);

  res.json({
    message: "订单创建成功",
    orderId: order.orderId,
    status: order.status
  });
});

/**
 * 模拟支付
 */
app.post("/api/order/pay", (req, res) => {
  const { orderId } = req.body;

  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: "订单不存在" });
  }

  order.status = "paid";

  res.json({
    message: "支付成功",
    orderId,
    status: "paid"
  });
});

/**
 * 查询订单状态
 */
app.get("/api/order/status", (req, res) => {
  const { orderId } = req.query;

  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ message: "订单不存在" });
  }

  res.json({
    orderId,
    status: order.status
  });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
