const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const router = require('./routes');
const db = require('./config/db');
const koaStatic = require('koa-static');
const morgan = require('koa-morgan');
const fs = require('fs');
const passport = require('koa-passport');
const {
    createServer,
} = require('http');
const {
    Server,
} = require('socket.io');
const cors = require('@koa/cors');

db.connect();

app.use(passport.initialize());
app.use(passport.session());

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
    flags: 'a',
});
app.use(morgan('combined', {
    stream: accessLogStream,
}));
app.use(cors());
app.use(
    koaBody({
        urlencoded: true,
        json: true,
    })
);
app.use(koaStatic(__dirname + '/public'));

app.use(async function(ctx, next) {
    // Website you wish to allow to connect
    ctx.set('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    ctx.set(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request s you wish to allow
    ctx.set('Access-Control-Allow-s', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    ctx.set('Access-Control-Allow-Credentials', true);

    ctx.set(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers'
    );

    // Pass to next layer of middleware
    await next();
});

app.use(async(ctx, next) => {
    // ERROR HANLDER

    try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.body = 'NOT FOUND';
        }
    } catch (err) {
        console.error(err);
        console.log(err.message);
        ctx.status = err.status || 500;
        if (ctx.status === 200) {
            ctx.body = {
                status: false,
                message: err.message,
            };
        } else if (ctx.status === 404) {
            ctx.body = {
                status: false,
                message: 'URL NOT FOUND',
            };
        } else {
            ctx.body = err;
        }
    }
});

app.use(router);

const { verifyToken } = require('./config/jwt');

const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        allowedHeaders: ['Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers'],
        credentials: true,
    },
});

const registerCommentHandlers = require('./controllers/main/comment');

const onConnection = (socket) => {
    console.log(socket.id);
    registerCommentHandlers(io, socket);

    io.on('disconnection', () => {
        console.log('Disconnected');
    });
};

io.sockets.setMaxListeners(0);

io.use(async function(socket, next) {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        const accessToken = socket.handshake.auth.token;
        try {
            const decoded = await verifyToken(accessToken, 'access');
            socket.decoded = decoded;
            next();
        } catch (err) {
            return next(new Error('Authentication error'));
        }
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', onConnection);

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
