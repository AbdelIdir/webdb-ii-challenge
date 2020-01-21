const server = require("./server");

const PORT = process.env.PORT || 4600;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
