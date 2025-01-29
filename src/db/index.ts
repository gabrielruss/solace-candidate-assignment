import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let db: ReturnType<typeof drizzle> | null = null;

const setup = () => {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set");
      throw new Error(
        "Oopsy doopsy you forgot to add your .env variable for DATABASE_URL"
      );
    }

    const queryClient = postgres(process.env.DATABASE_URL);

    db = drizzle(queryClient);
  }

  return db;
};

export default setup();
