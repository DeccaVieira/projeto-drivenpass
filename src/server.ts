import server, { init } from "app"

init().then(() => {
  server.listen(4000, () => {
    /* eslint-disable-next-line no-console */
    console.log("Server running in port 4000...")
  });
});