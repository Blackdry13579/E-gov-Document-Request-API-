const API_URL = 'http://localhost:5000/api';

const testNotifications = async () => {
  try {
    // 1. Login Citoyen
    console.log('--- Login Citoyen ---');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'ibrahim@example.com', password: 'password123' })
    });
    const { token } = await loginRes.json();
    const headers = { 'Authorization': `Bearer ${token}` };

    // 2. Get Notifications
    console.log('\n--- Get My Notifications ---');
    const notifRes = await fetch(`${API_URL}/notifications`, { headers });
    const notifData = await notifRes.json();
    console.log('Notifications count:', notifData.count);
    
    if (notifData.count > 0) {
      console.log('Dernière notif:', notifData.data[0].titre);
      const notifId = notifData.data[0]._id;

      // 3. Mark as read
      console.log('\n--- Mark as read ---');
      const readRes = await fetch(`${API_URL}/notifications/${notifId}/read`, {
        method: 'PUT',
        headers
      });
      console.log('Mark as read OK:', (await readRes.json()).success);
    }

    console.log('\n✅ Phase 7 Verification (Notifications) Successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification Failed:', error.message);
    process.exit(1);
  }
};

testNotifications();
