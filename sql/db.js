const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/users");
const { compare } = require('bcryptjs');

module.exports.insertNewUser = (gender, first, last, email, phone, dob, address, package, bio) => {
    return db.query(
        `INSERT INTO users (gender, first, last, email, phone, dob, address, package, bio)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id`,
        [gender, first, last, email, phone, dob, address, package, bio]
    );
};

module.exports.getCheckPassword = (pass, hash) => {
    return compare(pass, hash);
};

module.exports.getByEmailUser = (email) => {
    return db.query(
        `SELECT password, id FROM users WHERE email=$1`,
        [email]
    );
};

module.exports.getUserInfo = (id) => {
    return db.query(
        `SELECT * FROM users
        WHERE users.id = $1`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getPilatesUserInfo = (id) => {
    return db.query(
        `SELECT * FROM pilatesusers
        WHERE pilatesusers.id = $1`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getYogaUserInfo = (id) => {
    return db.query(
        `SELECT * FROM yinusers
        WHERE yinusers.id = $1`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.updateImgUrl = (imgUrl, id) => {
    return db.query(
        `UPDATE users SET imgUrl = $1
        WHERE users.id = $2`,
        [imgUrl, id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.updateUsersBio = (bio, id) => {
    return db.query(
        `UPDATE users SET bio = $1
        WHERE users.id = $2`,
        [bio, id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getRecentUsers = () => {
    return db.query(
        `SELECT first, last, id, imgurl FROM users 
        ORDER BY id DESC
        LIMIT 4;`
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getMoreUsers = (val) => {
    return db.query(
        `SELECT first, last, id, imgurl FROM users
        WHERE first ILIKE $1 
        ORDER BY id DESC`,
        [val + '%']
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getLastTenMessages = () => {
    return db.query(
        `SELECT *
        FROM chat
        JOIN users
        ON (sender_id = users.id)
        ORDER BY chat.id DESC
        LIMIT 10`
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.insertUsersMessages = (sender_id, message) => {
    return db.query(
        `INSERT INTO chat(sender_id, message) 
        VALUES ($1, $2)`,
        [sender_id, message]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getNewMsg = (userId) => {
    return db.query(
        `SELECT sender_id, first, last, imgurl, message
        FROM chat
        JOIN users
        ON (sender_id = users.id AND sender_id = $1)
        ORDER BY chat.id DESC
        LIMIT 1`,
        [userId]
    ).catch(error => {
        console.log(error.message);
    });
};


module.exports.getPilatesCustomers = () => {
    return db.query(
        `SELECT *
        FROM pilatesusers
        GROUP BY pilatesusers.id
        ORDER BY count(pilatesusers.id) ASC
        LIMIT 8`
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.deletePilatesCustomer = (id) => {
    return db.query(
        `DELETE FROM pilatesusers WHERE pilatesusers.id = $1
        RETURNING id`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getYinCustomers = () => {
    return db.query(
        `SELECT *
        FROM yinusers
        GROUP BY yinusers.id
        ORDER BY count(yinusers.id) ASC
        LIMIT 8`
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.deleteYinCustomer = (id) => {
    return db.query(
        `DELETE FROM yinusers WHERE yinusers.id = $1`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.totalUsers = () => {
    return db.query(
        `SELECT * FROM users`
    );
};

module.exports.deleteUser = (id) => {
    return db.query(
        `DELETE FROM users WHERE users.id = $1`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.getByEmailClient = (email) => {
    return db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    ).catch(error => {
        console.log(error.message);
    });;
};

module.exports.insertIntoPilates = (first, last, email, imgurl, selection) => {
    return db.query(
        `INSERT INTO pilatesusers (first, last, email, imgurl, selection)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, first, last, email`,
        [first, last, email, imgurl, selection]
    ).catch(error => {
        console.log(error.message);
    });
};

module.exports.insertYoga = (first, last, email, imgurl, selection) => {
    return db.query(
        `INSERT INTO yinusers (first, last, email, imgurl, selection)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
        [first, last, email, imgurl, selection]
    ).catch(error => {
        console.log(error.message);
    });;
};

module.exports.newClients = () => {
    return db.query(
        `SELECT *
        FROM users
        WHERE time_stamp > TIMESTAMP 'today' 
        ORDER BY time_stamp DESC;`
    ).catch(error => {
        console.log(error.message);
    });;
};

module.exports.lastMonth = () => {
    return db.query(
        `SELECT *
        FROM users
        WHERE extract(month FROM time_stamp) = 10;`
    ).catch(error => {
        console.log(error.message);
    });;
};

module.exports.addNotes = (note) => {
    return db.query(
        `INSERT INTO notes(note)
        VALUES($1)
        RETURNING *`,
        [note]
    ).catch(error => {
        console.log(error);
    });
};

module.exports.getNotes = () => {
    return db.query(
        `SELECT * FROM notes`,
        []
    ).catch(error => {
        console.log(error);
    });
};

module.exports.deleteNotes = (id) => {
    return db.query(
        `DELETE FROM notes WHERE notes.id = $1
        RETURNING id`,
        [id]
    ).catch(error => {
        console.log(error.message);
    });
};
