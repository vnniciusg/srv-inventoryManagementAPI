import { AppDataSource } from "../data-source";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database initialized successfully");
  } catch (err: any) {
    console.error("Error initializing database: ", err);
  }
};
