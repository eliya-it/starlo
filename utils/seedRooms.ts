import { Room } from "../models/roomModule";

const seedRooms = async (
  numDocs: number = 1000000,
  batchSize: number = 1000
) => {
  const roomDocuments = [];

  // Generate a batch of documents
  for (let i = 0; i < numDocs; i++) {
    const room = {
      name: `Room ${i + 1}`, // Ensure uniqueness with the index or other unique value
      price: Math.floor(Math.random() * 500) + 50, // Random price between 50 and 500
      cover: `room${i + 1}_cover.jpg`,
      photos: [`room${i + 1}_1.jpg`, `room${i + 1}_2.jpg`],
      bedsCount: Math.floor(Math.random() * 3) + 1, // Random beds between 1 and 3
      extraBeds: Math.floor(Math.random() * 2), // Random extra beds between 0 and 1
      summary: `Summary of Room ${i + 1}`,
      meals: Math.floor(Math.random() * 5) + 1, // Random meals between 1 and 5
      status: "empty",
      ratingsAverage: Math.random() * (5 - 1) + 1, // Random rating between 1 and 5
      ratingsQuantity: Math.floor(Math.random() * 100), // Random ratings quantity
      createdAt: new Date(),
    };

    roomDocuments.push(room);

    // When the batch reaches the batch size, insert it and reset the array
    if (roomDocuments.length === batchSize) {
      await Room.insertMany(roomDocuments, { ordered: false }).catch(
        (error) => {
          if (error.code === 11000) {
            console.log("Duplicate key error:", error.message); // Log duplicate key errors
          } else {
            throw error; // Re-throw other types of errors
          }
        }
      );

      console.log(`Inserted ${i + 1} documents`);
      roomDocuments.length = 0; // Clear the batch array
    }
  }

  // Insert any remaining documents
  if (roomDocuments.length > 0) {
    await Room.insertMany(roomDocuments);
    console.log(`Inserted remaining ${roomDocuments.length} documents`);
  }

  console.log(`Successfully seeded ${numDocs} documents!`);
};

export default seedRooms;
