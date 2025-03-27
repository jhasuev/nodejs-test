const express = require("express");
const { Sequelize } = require("sequelize");
const User = require("../models/user");

const router = express.Router();

router.post("/update-balance", async (req, res) => {
  const { userId, amount } = req.body;

  // Проверка входных данных
  if (!userId || !amount) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const t = await User.sequelize.transaction(); // Инициализируем транзакцию

  try {
    // Поиск пользователя с блокировкой для предотвращения гонок
    const user = await User.findByPk(userId, { transaction: t, lock: t.LOCK.UPDATE });

    if (!user) {
      await t.rollback(); // Откатим транзакцию в случае ошибки
      return res.status(404).json({ error: "User not found" });
    }

    // Проверка на достаточность средств
    if (user.balance + amount < 0) {
      await t.rollback(); // Откатим транзакцию в случае ошибки
      return res.status(400).json({ error: "Insufficient funds" });
    }

    // Обновление баланса
    user.balance += amount;
    await user.save({ transaction: t });

    // Подтверждение транзакции
    await t.commit();

    // Возврат успешного ответа
    return res.json({ success: true, balance: user.balance });
  } catch (error) {
    // Откатим транзакцию в случае ошибки
    await t.rollback();

    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
