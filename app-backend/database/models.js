/*
  This file contains all the (Sequelize) models
  Author @Okko

  http://docs.sequelizejs.com/manual/tutorial/models-definition.html

  # See Database Diagram in project folder

  Table names will be singular.
  Names will be written in snake_case.
*/

/*
  TODO:
    # Other models
    # Integrity constraints
    #
*/

const Sequelize = require('sequelize');
const config = require('./config.js');
/*
Create config.js (to same folder) with this content (use your own details!)
Make sure Postgres 11.x is running and database is actually created.
Do NOT push your config.js to git.

  exports.user = "postgres"
  exports.dbname = "xxx"
  exports.passwd = "xxx"
  exports.host = "localhost"
  exports.port = "5432"
*/

const sequelize = new Sequelize('postgres://'+config.user+':'+config.passwd+'@'+config.host+':'+config.port+'/'+config.dbname);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  }
);


const User = sequelize.define('user',
  {
    first_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: Sequelize.ENUM('basic', 'moderator', 'admin'),
      allowNull: false,
      defaultValue: 'basic',
    },
    status: {
      type: Sequelize.ENUM('foo', 'bar'),
      allowNull: false,
      defaultValue: 'foo',
    },
    is_finished_survey: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    token: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    // must be done like this if we want DEFAULT NOW()
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  },
  // options:
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    deleted_at: 'deleted_at',
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ],
  }
);

const Apikey;
const Comment;
const Thread;
const ForumCategory;
const BugFeedback;
const News;
const Service;

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#database-synchronization
// Sync all models that aren't already in the database
sequelize.sync({force:true}); // param: {force:true} to drop and re-create
