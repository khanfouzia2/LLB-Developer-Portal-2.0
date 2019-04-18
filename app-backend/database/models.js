/*
  This file contains all the (Sequelize) models
  Author @Okko

  http://docs.sequelizejs.com/manual/tutorial/models-definition.html

  # See Database Diagram in project folder

  Table names will be singular.
  Names will be written in snake_case.
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
console.log(`Sequelize-object constructor ==> \n\tuser: ${config.user}\n\thost: ${config.host}\n\tport: ${config.port}\n\tdb: ${config.dbname} `);

// This part is NOT mandatory
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
    throw new ConnectionRefusedError();
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
      allowNull: true,
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
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

const Apikey = sequelize.define('api_key',
  {
    // id
    // user_id
    service_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    api_key: {
      type: Sequelize.STRING(255),
      allowNull: false,

    }
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    deleted_at: 'deleted_at',
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['api_key']
      }
    ]
  }
);

const Comment = sequelize.define('comment',
  {
    // id
    // thread_id
    // author_id
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    deleted_at: 'deleted_at',
    paranoid: true,
  }
);

const ForumCategory = sequelize.define('forum_category',
  {
    // id is automatic
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(200),
      allowNull: false
    }
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    deleted_at: 'deleted_at',
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  }
);

const Thread = sequelize.define('thread',
  {
    // thread id
    forum_category_id: {
      // References forum_category.id
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    author_id: {
      // References users.id
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        len: [5, Number.POSITIVE_INFINITY]
      }
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  },
  // options
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    deleted_at: 'deleted_at',
    paranoid: true,
  }
);

const BugFeedback = sequelize.define('bug_feedback',
  {
    // id
    // author id references user.id
    title: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM,
      values: ['ACTIVE', 'pending', 'deleted', 'something...'],
      defaultValue: 'ACTIVE',
      allowNull: false
    },
    is_approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    type: {
      type: Sequelize.ENUM,
      values: ['BUG', 'FEEDBACK'],
      defaultValue: 'BUG',
      allowNull: false
    },
    attachment_filename: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    expected_result: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    actual_result: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    deleted_at: 'deleted_at',
    paranoid: true,
  }
)

const News = sequelize.define('news',
  {
    // id
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    is_visible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    header_picture_filename: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  },
  {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    deleted_at: 'deleted_at',
    paranoid: true,
  }
);

// const Service = sequelize.define('service',
//   {
//     name: {
//       type: Sequelize.STRING(15),
//       primaryKey: true
//     },
//     created_at: {
//       type: Sequelize.DATE,
//       defaultValue: sequelize.literal('NOW()')
//     }
//   },
//   {
//     timestamps: false,
//     underscored: true,
//     freezeTableName: true,
//   }
// );

/* Associations

  Model-1.hasMany(Model-2, {foreignKey, sourceKey})
  will create column and/or create foreign key which name will be foreignKey. It IS NOT
  the name of the foreign key identifier used by DB-system.
  Source key is the 'mother tables' column where this fk-field will refer

  Setters and Getters are created automatically for target model



*/

User.hasMany(News, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});
News.belongsTo(User, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});


User.hasMany(BugFeedback, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});
BugFeedback.belongsTo(User, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});


Thread.hasMany(Comment, {
  foreignKey: 'thread_id',
  sourceKey: 'id'
});
Comment.belongsTo(Thread, {
  foreignKey: 'thread_id',
  sourceKey: 'id'
});


User.hasMany(Comment, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});
Comment.belongsTo(User, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});


User.hasMany(Thread, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});
Thread.belongsTo(User, {
  foreignKey: 'author_id',
  sourceKey: 'id'
});


ForumCategory.hasMany(Thread, {
  foreignKey: 'forum_category_id',
  sourceKey: 'id'
});
Thread.belongsTo(ForumCategory, {
  foreignKey: 'forum_category_id',
  sourceKey: 'id'
});


User.hasMany(Apikey, {
  foreignKey: 'user_id',
  sourceKey: 'id',
});
Apikey.belongsTo(User, {
  foreignKey: 'user_id',
  sourceKey: 'id'
});


/*
  Default 'exclude' fields. Sensitive information that usually should not be send to the front-end
  Example usage:

  const options = {
    attributes: {
      exclude: models.secluded.user
    }
  }

*/
const secluded = {
  user: ['token', 'password', 'updated_at', 'deleted_at', 'is_finished_survey']
}


//

// Service.hasMany(Apikey, {
//   foreignKey: 'service_name',
//   sourceKey: 'name'
// });
// Apikey.belongsTo(Service, {
//   foreignKey: 'service_name',
//   sourceKey: 'id'
// });

// Do not use this approach anymore. Run > node create_database.js instead!
//sequelize.sync({force:true}); // param: {force:true} to drop and re-create


module.exports = {
  sequelize,
  User,
  News,
  Apikey,
  //Service,
  ForumCategory,
  Thread,
  Comment,
  BugFeedback,
  secluded
}
