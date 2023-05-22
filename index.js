require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const Startup = require("./middleware/startup");
const WebSocket = require("./middleware/web-socket");
const error = require("./middleware/error");
const io = require("socket.io")(http, {
	cors: { origin: "*" },
});

Startup(app, io);
WebSocket(io);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));

app.use(error);
const PORT = process.env.PORT;
http.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
