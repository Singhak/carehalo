import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onStaffCreate = functions.firestore
  .document('hospitals/{hospitalId}/staff/{staffId}')
  .onCreate(async (snap, context) => {
    const staff = snap.data();
    if (staff) {
      const userId = staff.userId;
      const role = staff.role;
      const tenantId = context.params.hospitalId;

      const customClaims = {
        role: role,
        tenantId: tenantId,
      };

      try {
        await admin.auth().setCustomUserClaims(userId, customClaims);
        console.log(`Custom claims set for user ${userId}:`, customClaims);
      } catch (error) {
        console.error('Error setting custom claims:', error);
      }
    }
  });
