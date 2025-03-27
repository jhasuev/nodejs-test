"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      balance: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 10000 
      },
      createdAt: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.fn("NOW") 
      },
      updatedAt: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.fn("NOW") 
      },
    });

    // Добавляем пользователя с балансом 10000
    await queryInterface.bulkInsert("Users", [{ balance: 10000, createdAt: new Date(), updatedAt: new Date() }]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Users");
  },
};
