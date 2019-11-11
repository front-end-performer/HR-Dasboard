const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const server = require('http').Server(app); // our app server passing
const io = require('socket.io')(server, { origins: 'localhost:8080' }); // myherokuapp.myherokuapp:* / add domain anme
const {
    insertUsers,
    getByEmailUser,
    getCheckPassword,
    getUserInfo,
    updateImgUrl,
    updateUsersBio,
    getRecentUsers,
    getMoreUsers,
    initFriendShipStatus,
    insertFriendShipIds,
    updateAcceptColumn,
    deleteFriendShipRow,
    pendingUsers,
    getLastTenMessages,
    insertUsersMessages,
    getNewMsg,
    getPilatesCustomers,
    deletePilatesCustomer,
    getYinCustomers,
    deleteYinCustomer,
    totalUsers,
    insertNewUser,
    deleteUser,
    getByEmailClient,
    insertIntoPilates,
    insertYoga
} = require('./sql/db');
const s3 = require('./s3');
const { s3Url } = require('./config');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const { hash } = require('./bcrypt');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());
app.use(express.static('./public'));
app.use(express.static('./sql'));
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: `my secrets`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(express.urlencoded({ // makes my body not undefined. any thing i reqeust its puts as an object
    extended: false
}));

app.use(function (req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8082/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// const { TRELLO_KEY, TRELLO_OAUTH_SECRET } = require('./trello');

app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.post('/register', (req, res) => {
    let { email, select } = req.body;
    console.log("req.body==>", email, select);

    if (select) {
        getByEmailClient(email).then(({ rows }) => {
            let [first, last, email, imgurl] = [rows[0].first, rows[0].last, rows[0].email, rows[0].imgurl];
            
            if (select === 'pilates') {
                insertIntoPilates(first, last, email, imgurl, select);
            } else if (select === 'yoga') { 
                insertYoga(first, last, email, imgurl, select);
            }
        }).catch(error => { 
            console.log(error);
            res.statusCode(500);
        })
    } else { 
        res.render('register', { error: true });
    }
    
});

// app.post('/register', (req, res) => {
//     let { first, last, email, password } = req.body;
//     console.log("req.body==>", first, last, email, password);

//     if (first != '' && last != '' && email != '' && password != '') {
//         hash(password).then(result => {
//             password = result;
//             insertUsers(first, last, email, password).then(result => {
//                 // console.log("insertUsersresult", result);
//                 let id = result.rows[0].id;
//                 req.session.userId = id;
//                 // console.log("id", id);
//                 // console.log("req.session.userId", req.session.userId);

//                 res.redirect('/');
//             }).catch(error => console.log("insertUser error", error));
//         }).catch(error => console.log("hash error:", error.message));
//     } else {
//         return res.render('register', { error: true });
//     }
// });

app.post('/register-newuser', (req, res) => {
    let { first, last, email, password } = req.body;
    console.log("req.body==>", first, last, email, password);

    if (first != '' && last != '' && email != '' && password != '') {
        hash(password).then(result => {
            password = result;
            insertNewUser(first, last, email, password).then(result => {
                // console.log("insertUsersresult", result);
                // let id = result.rows[0].id;
                // req.session.userId = id;
                // console.log("id", id);
                // console.log("req.session.userId", req.session.userId);
                totalUsers().then(({ rows }) => {
                    res.json(rows);
                })
                // res.redirect('/');
            }).catch(error => console.log("insertUser error", error));
        }).catch(error => console.log("hash error:", error.message));
    } else {
        return res.render('register-newuser', { error: true });
    }
});

// app.post('/pilates-class', (req, res) => {
//     let { email, select } = req.body;

//     //getting users hashed password by email from db
//     getByEmailClient(email).then(({ rows }) => {

//         console.log("getEmailByClient server==>", rows);
//         res.json(rows);
//         // comparing types password with hashed password
//         // getCheckPassword(password, hashPassword).then(isMatch => {
//         //     if (isMatch) {
//         //         req.session.userId = result.rows[0].id;
//         //         // console.log("req.session.userId)", req.session.userId);
//         //         res.redirect('/dashboard');
//         //     } else {
//         //         // console.log("isMatch", isMatch);
//         //         res.sendStatus(500);
//         //     }
//         // }).catch(error => {
//         //     console.log("getCheckedByPassword", error);
//         //     res.sendStatus(500);
//         // });
//     }).catch(error => {
//         console.log("getByEmailClient error", error.message);
//         res.sendStatus(500);
//     });
// });




app.post('/login', (req, res) => {
    let { email, password } = req.body;
    //getting users hashed password by email from db
    getByEmailUser(email).then(result => {
        let hashPassword = result.rows[0].password;
        // console.log("hasPassword", hashPassword);
        // comparing types password with hashed password
        getCheckPassword(password, hashPassword).then(isMatch => {
            if (isMatch) {
                req.session.userId = result.rows[0].id;
                // console.log("req.session.userId)", req.session.userId);
                res.redirect('/dashboard');
            } else {
                // console.log("isMatch", isMatch);
                res.sendStatus(500);
            }
        }).catch(error => {
            console.log("getByEmailUser", error);
            res.sendStatus(500);
        });
    }).catch(error => {
        console.log("getCheckPassword", error.message);
        res.sendStatus(500);
    });
});

app.get('/user', async (req, res) => {
    let { userId } = req.session;
    const { rows } = await getUserInfo(userId);
    res.json(rows[0]);
});

app.get('/api/user/:id', async (req, res) => {
    let { id } = req.params;
    let { userId } = req.session;
    if (userId != id) {
        const { rows } = await getUserInfo(id);
        res.json(rows[0]);
    } else {
        res.sendStatus(500);
    }
});

app.post('/upload', uploader.single('image'), s3.upload, (req, res) => {
    const { userId } = req.session;
    // before this i need to file in a bucket
    const url = `${s3Url}${req.file.filename}`;
    updateImgUrl(url, userId).then(() => {
        // console.log("updateImgUrl rows==>", rows);
        // send image info to clinet
        // let id = rows[0].id;
        res.json({
            url
        });
    }).catch(error => {
        console.log("updateImgUrl error==>", error);
        res.sendStatus(500);
    });
});

app.post('/bio', (req, res) => {
    let { textAreaValue } = req.body;
    let { userId } = req.session;
    console.log("userId bio++>", userId);
    console.log("userId bio++>", textAreaValue);
    updateUsersBio(textAreaValue, userId).then(({ rows }) => {
        console.log(rows);
        res.json(rows);
    });
});

app.get('/total-clients', async (req, res) => {
    const { rows } = await totalUsers();
    res.json(rows);
})

app.post('/delete-client/:id', async (req, res) => {
    let { id } = req.params;
    const { rows } = await deleteUser(id);
    res.json(rows);
})

app.get('/pilates-customers', async (req, res) => {
    const { rows } = await getPilatesCustomers();
    res.json(rows);
})

app.post('/pilates-customers/:id', async (req, res) => {
    let { id } = req.params;
    console.log("req.params", id);
    const { rows } = await deletePilatesCustomer(id);
    res.json(rows);
})

app.get('/yin-customers', async (req, res) => {
    const { rows } = await getYinCustomers();
    res.json(rows);
})

app.post('/yin-customers/:id', async (req, res) => {
    let { id } = req.params;
    const { rows } = await deleteYinCustomer(id);
    res.json(rows);
})

// Find people

app.get('/find_recent', (req, res) => {

    getRecentUsers().then(({ rows }) => {
        res.json(rows);
    }).catch(error => {
        console.log(error.message);
    });
});

app.get('/find', (req, res) => {
    let { val } = req.query;

    getMoreUsers(val).then(({ rows }) => {
        res.json(rows);
    }).catch(error => {
        console.log(error.message);
        res.sendStatus(500);
    });
});

// friendship button

app.get('/get-initial-status/:id', (req, res) => {
    let { userId } = req.session;
    let { id } = req.params;
    initFriendShipStatus(userId, id).then(({ rows }) => {
        res.json(rows);
    }).catch((error) => {
        console.log("initFriendShipStatus", error);
    });

});

app.post('/send-friend-request/:id', (req, res) => {
    let { userId } = req.session;
    let { id } = req.params;
    insertFriendShipIds(userId, id).then(({ rows }) => {
        res.json(rows);
    }).catch((error) => {
        console.log("initFriendShipStatus", error);
    });
});

// app.post('/friend-request', (req, res) => {
//     io.sockets.sockets[soketIdOfRecipient].emit('newFriendRequest');
// });

app.post('/accept-friend-request/:id', (req, res) => {
    let { userId } = req.session;
    let { id } = req.params;
    updateAcceptColumn(userId, id).then(({ rows }) => {
        res.json(rows);
    });
});

app.post('/end-friendship/:id', (req, res) => {
    let { userId } = req.session;
    let { id } = req.params;
    deleteFriendShipRow(userId, id).then(({ rows }) => {
        res.json(rows);
    });
});

// friends

app.get('/friends-wannabes', async (req, res) => {
    let { userId } = req.session;
    const { rows } = await pendingUsers(userId);
    res.json(rows);
});

//logout

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});


// DONT DELETE !!!!!!!!!!!!!!!!!!!!
app.get('*', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

const onlineUsers = {};

io.on('connection', socket => {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    onlineUsers[socket.id] = userId;

    const getUnique = (users) => Array.from(new Set(Object.values(users)));
    const uniqueUsers = getUnique(onlineUsers);

    console.log("uniquertwretwertwert==>>", uniqueUsers);
    io.sockets.emit('onlineUsers', uniqueUsers);

    /* we want to get 10 lats messages */
    getLastTenMessages().then(({ rows }) => {
        io.sockets.emit('chatMessages', rows.reverse());
    });

    socket.on('chatMessage', newMessage => {
        // do stuff in here
        // we want to find out info about user who sent message
        // we want to emit this message object
        // we watnt to store it in the db
        insertUsersMessages(userId, newMessage).then(() => {
            getNewMsg(userId).then(({ rows }) => {
                io.sockets.emit('chatMessage', rows);
            });
        });
    });

    socket.on('chatMessageNotitification', () => {
        getNewMsg(userId).then(({ rows }) => {
            io.sockets.emit('chatMessageNotitification', rows);
        });
    });

    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];

        // const getUnique = (users) => Array.from(new Set(Object.values(users)));
        // const uniqueUsers = getUnique(onlineUsers);
        io.sockets.emit('onlineUsers', onlineUsers);
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

});



// io.on('connection', (socket) => {
//     console.log(`socket with the id ${socket.id} is now connected`);

//     socket.emit('welcome', {
//         message: 'Welome. It is nice to see you'
//     });

//     const { userId } = socket.request.session;
//     onlineUsers[socket.id] = userId;

//     socket.on('myChat', (data) => {
//         console.log(data);
//         socket.emit('hello', {
//             data: 'looking good'
//         });

//         socket.broadcast.emit('somebodyNew'); // sends to everybody message except one who logedin currently
//     });
//     socket.on('disconnect', () => {
//         delete onlineUsers[userId.id];
//         console.log(`socket with the id ${socket.id} is now disconnected`);
//     });

// });

server.listen(8080, () => { // changing to server instead of app
    console.log("I'm listening.");
});
