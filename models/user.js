module.exports = function(sequelize, sql){
    return sequelize.define('user', {
        user_id: {
            type: sql.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: sql.STRING(256),
            allowNull: false
        },
        password: {
            type: sql.STRING(256),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
};