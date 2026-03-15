const API_URL = 'http://localhost:5000/api';

const testAuthFlow = async () => {
  try {
    console.log('--- Test Register ---');
    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: 'Traore',
        prenom: 'Ibrahim',
        email: 'ibrahim@example.com',
        telephone: '70123456',
        password: 'password123'
      })
    });
    
    const registerData = await registerResponse.json();
    if (!registerResponse.ok) throw new Error(JSON.stringify(registerData));
    
    console.log('Register OK:', registerData.success);
    const token = registerData.token;

    console.log('\n--- Test Get Me ---');
    const meResponse = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const meData = await meResponse.json();
    console.log('Get Me OK:', meData.data.email);

    console.log('\n--- Test Login ---');
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'ibrahim@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('Login OK:', loginData.success);

    console.log('\n✅ Phase 3 Verification Successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification Failed:', error.message);
    process.exit(1);
  }
};

testAuthFlow();
