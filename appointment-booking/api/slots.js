const admin = require("firebase-admin");
const express = require("express");
const app = express();

app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

app.get("/api/slots", async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Date is required" });

  const doc = await db.collection("slots").doc(date).get();
  if (!doc.exists) return res.json({ slots: [] });

  res.json({ slots: doc.data().slots });
});

app.post("/api/bookSlot", async (req, res) => {
  const { date, slot } = req.body;
  if (!date || !slot) return res.status(400).json({ error: "Date and slot are required" });

  const docRef = db.collection("slots").doc(date);
  const doc = await docRef.get();

  if (doc.exists) {
    const slots = doc.data().slots;
    const slotIndex = slots.findIndex((s) => s.time === slot.time);
    if (slotIndex === -1 || slots[slotIndex].booked) {
      return res.status(400).json({ error: "Slot already booked" });
    }

    slots[slotIndex].booked = true;
    await docRef.set({ slots });
  } else {
    return res.status(404).json({ error: "Slots not available" });
  }

  res.json({ message: "Slot booked successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
