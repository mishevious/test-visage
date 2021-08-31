module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
      jobTitle: {
        type: Sequelize.STRING
      },
      pdf: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      bonusToken: {
        type: Sequelize.STRING
      }
    });
  
    return Profile;
  };