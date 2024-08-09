import PouchDB from "pouchdb";

const SUBSTITUTES = "substitutes";
const OK = "ok";
const ERROR = "error";

// Initialize the database once and keep it open
const db = new PouchDB(SUBSTITUTES);

const tryOp = async (f) => {
    try {
        const result = await f();
        return { status: OK, data: result };
    } catch (e) {
        console.log(`Error: ${e}\n`);
        return { status: ERROR, error: e };
    }
};

const Database = async () => {
    const obj = {
        getSubstituteByIngredient: async (ingredient) => {
            const result = await tryOp(async () => {
                try {
                    console.log(`Looking up substitute for ingredient: ${ingredient}`);
                    const response = await db.get(ingredient);
                    console.log(`Found substitute: ${response.substitute}`);
                    return [response];
                } catch (e) {
                    console.log(`Ingredient not found: ${ingredient}`);
                    return [];
                }
            });
            return result;
        },

        addSubstitute: async (ingredient, substitute) => {
            const result = await tryOp(async () => {
                try {
                    // Check if the document already exists
                    const existingDoc = await db.get(ingredient);
                    // Update the existing document
                    existingDoc.substitute = substitute;
                    await db.put(existingDoc);
                    console.log(`Updated substitute: ${ingredient} -> ${substitute}`);
                } catch (err) {
                    if (err.status === 404) {
                        // Document doesn't exist, create a new one
                        const doc = { _id: ingredient, ingredient, substitute };
                        await db.put(doc);
                        console.log(`Added substitute: ${ingredient} -> ${substitute}`);
                    } else {
                        throw err; // Re-throw unexpected errors
                    }
                }
            });
            return result;
        },

        deleteSubstitute: async (ingredient) => {
            const result = await tryOp(async () => {
                const doc = await db.get(ingredient);
                await db.remove(doc);
                console.log(`Deleted substitute for ingredient: ${ingredient}`);
            });
            return result;
        }
    };

    return obj;
};

export default Database;
