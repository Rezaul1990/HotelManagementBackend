import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function bootstrap() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Hotel Management System API running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
