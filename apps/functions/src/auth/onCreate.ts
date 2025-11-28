
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  // For the MVP, we'll create a new hospital for each new user.
  // A more robust solution would involve an admin interface for managing hospitals and users.
  const hospitalRef = admin.firestore().collection("hospitals").doc();
  const hospitalId = hospitalRef.id;

  await hospitalRef.set({
    id: hospitalId,
    name: `Hospital of ${user.email}`,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await admin.auth().setCustomUserClaims(user.uid, { hospitalId });

  return null;
});
