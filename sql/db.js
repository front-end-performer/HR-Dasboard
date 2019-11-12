const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/users");
const { compare } = require('bcryptjs');

// module.exports.insertUsers = (first, last, email, password) => {
//     return db.query(
//         `INSERT INTO users (first, last, email, password)
//         VALUES ($1, $2, $3, $4)
//         RETURNING id`,
//         [first, last, email, password]
//     );
// };

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
        console.log("getUserInfo by id query ==>", error.message);
    });
};

module.exports.updateImgUrl = (imgUrl, id) => {
    return db.query(
        `UPDATE users SET imgUrl = $1
        WHERE users.id = $2`,
        [imgUrl, id]
    ).catch(error => {
        console.log("insertImgUrl by id query ==>", error.message);
    });
};

module.exports.updateUsersBio = (bio, id) => {
    return db.query(
        `UPDATE users SET bio = $1
        WHERE users.id = $2`,
        [bio, id]
    ).catch(error => {
        console.log("updateUsersBio by id query ==>", error.message);
    });
};

module.exports.getRecentUsers = () => {
    return db.query(
        `SELECT first, last, id, imgurl FROM users 
        ORDER BY id DESC
        LIMIT 4;`
    ).catch(error => {
        console.log("getRecentUsers by id query ==>", error.message);
    });
};

module.exports.getMoreUsers = (val) => {
    return db.query(
        `SELECT first, last, id, imgurl FROM users
        WHERE first ILIKE $1 
        ORDER BY id DESC`,
        [val + '%']
    ).catch(error => {
        console.log("getMoreUsers by id query ==>", error.message);
    });
};

module.exports.initFriendShipStatus = (sender_id, receiver_id) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    ).catch(error => {
        console.log("initFriendShipStatus by id query ==>", error.message);
    });
};

module.exports.insertFriendShipIds = (sender_id, receiver_id) => {
    return db.query(
        `INSERT INTO friendships(sender_id, receiver_id) 
        VALUES ($1, $2)
        RETURNING id`,
        [sender_id, receiver_id]
    ).catch(error => {
        console.log("insertFriendShipIds by id query ==>", error.message);
    });
};

module.exports.updateAcceptColumn = (sender_id, receiver_id) => {
    return db.query(
        `UPDATE friendships SET accepted = true 
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING id`,
        [sender_id, receiver_id]
    ).catch(error => {
        console.log("updateAcceptColumn by id query ==>", error.message);
    });
};

module.exports.deleteFriendShipRow = (sender_id, receiver_id) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)
        RETURNING id`,
        [sender_id, receiver_id]
    ).catch(error => {
        console.log("deleteFriendShipRow by id query ==>", error.message);
    });
};


module.exports.pendingUsers = (id) => {
    return db.query(
        `SELECT users.id, first, last, imgurl, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [id]
    ).catch(error => {
        console.log("penndingUsers by id query ==>", error.message);
    });
};

// CHAT

module.exports.getLastTenMessages = () => {
    return db.query(
        `SELECT *
        FROM chat
        JOIN users
        ON (sender_id = users.id)
        ORDER BY chat.id DESC
        LIMIT 10`
    ).catch(error => {
        console.log("getLastTenMessages by id query ==>", error.message);
    });
};

module.exports.insertUsersMessages = (sender_id, message) => {
    return db.query(
        `INSERT INTO chat(sender_id, message) 
        VALUES ($1, $2)`,
        [sender_id, message]
    ).catch(error => {
        console.log("insertUsersMessages by id query ==>", error.message);
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
        console.log("getNewMsg by id query ==>", error.message);
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
        console.log("getPilatesCustomers by id query ==>", error.message);
    });
};

module.exports.deletePilatesCustomer = (id) => {
    return db.query(
        `DELETE FROM pilatesusers WHERE pilatesusers.id = $1
        RETURNING id`,
        [id]
    ).catch(error => {
        console.log("deletePilatesCustomer by id query ==>", error.message);
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
        console.log("getYinCustomers by id query ==>", error.message);
    });
};

module.exports.deleteYinCustomer = (id) => {
    return db.query(
        `DELETE FROM yinusers WHERE yinusers.id = $1`,
        [id]
    ).catch(error => {
        console.log("deleteYinCustomer by id query ==>", error.message);
    });
};

module.exports.totalUsers = () => {
    return db.query(
        `SELECT * FROM users`        
    );
};

module.exports.deleteUser = (id) => {
    console.log("query", id);
    return db.query(
        `DELETE FROM users WHERE users.id = $1`,
        [id]
    ).catch(error => {
        console.log("deleteUser by id query ==>", error.message);
    });
};

module.exports.getByEmailClient = (email) => {
    return db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    ).catch(error => {
        console.log("getByEmailClient by id query ==>", error.message);
    });;
};

module.exports.insertIntoPilates = (first, last, email, imgurl, selection) => {
    return db.query(
        `INSERT INTO pilatesusers (first, last, email, imgurl, selection)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
        [first, last, email, imgurl, selection]
    ).catch(error => {
        console.log("insertIntoPilates by id query ==>", error.message);
    });
};

module.exports.insertYoga = (first, last, email, imgurl, selection) => {
    return db.query(
        `INSERT INTO yinusers (first, last, email, imgurl, selection)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
        [first, last, email, imgurl, selection]
    ).catch(error => {
        console.log("insertYoga by id query ==>", error.message);
    });;
};


