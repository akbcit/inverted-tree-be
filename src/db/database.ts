import { DataAPIClient } from "@datastax/astra-db-ts";
import logger from "../logger/logger";
import dotenv from "dotenv";

dotenv.config();

const ASTRA_TOKEN = process.env.ASTRA_TOKEN;
const ASTRA_ENDPOINT = process.env.ASTRA_ENDPOINT;
const KEY_SPACE = process.env.KEY_SPACE;

const needed_collections: string[] = ["subscriptions"]; // Required collections

// Validate keyspace format
const validateKeyspace = (keyspace: string | undefined): boolean => {
  if (!keyspace) {
    logger.error("Keyspace is undefined");
    return false;
  }

  const keyspaceRegex = /^[a-zA-Z0-9_]{1,48}$/;
  if (!keyspaceRegex.test(keyspace)) {
    logger.error(
      `Invalid keyspace format: "${keyspace}". Keyspace must be 1-48 alphanumeric characters or underscores`
    );
    return false;
  }
  return true;
};

// Validate environment variables
if (!ASTRA_TOKEN || !ASTRA_ENDPOINT || !KEY_SPACE) {
  logger.error("Missing required environment variables:", {
    hasToken: !!ASTRA_TOKEN,
    hasEndpoint: !!ASTRA_ENDPOINT,
    hasKeyspace: !!KEY_SPACE,
  });
  process.exit(1);
}

// Validate keyspace
if (!validateKeyspace(KEY_SPACE)) {
  process.exit(1);
}

// Initialize AstraDB Client
let client: DataAPIClient;
let db: any;

try {
  logger.info("Initializing AstraDB client...");
  client = new DataAPIClient(ASTRA_TOKEN);

  logger.info("Connecting to database...");
  db = client.db(ASTRA_ENDPOINT, {
    keyspace: KEY_SPACE,
  });

  logger.info("Database client initialized successfully");
} catch (error) {
  logger.error("Database initialization failed:", {
    error: error instanceof Error ? error.message : "Unknown error",
    stack: error instanceof Error ? error.stack : undefined,
  });
  process.exit(1);
}

// Function to check & create collections
const ensureCollectionsExist = async () => {
  try {
    const collections = await db.listCollections();
    const collectionNames = collections.map((c: any) => c.name);

    for (const collection of needed_collections) {
      if (!collectionNames.includes(collection)) {
        logger.info(`Collection "${collection}" does not exist. Creating...`);
        await db.createCollection(collection);
        logger.info(`Collection "${collection}" created successfully.`);
      } else {
        logger.info(`Collection "${collection}" already exists.`);
      }
    }
  } catch (error) {
    logger.error("Error checking/creating collections:", error);
    process.exit(1);
  }
};

// Test Database Connection & Initialize Collections
export const testDBConnection = async () => {
  try {
    await db.listCollections(); // Ensure the connection works
    logger.info("Connected to AstraDB:", {
      endpoint: ASTRA_ENDPOINT,
      keyspace: KEY_SPACE,
    });

    // Ensure collections exist only after the connection is established
    await ensureCollectionsExist();
  } catch (error) {
    logger.error("Database Connection Error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      keyspace: KEY_SPACE,
    });
    throw error;
  }
};

// Export initialized client and db
export { client, db };
