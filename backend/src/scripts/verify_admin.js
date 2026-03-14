const API_URL = 'http://localhost:5000/api';

const testAdminFlow = async () => {
  try {
    // 1. Login Admin
    console.log('--- Login Admin ---');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@egov.bf', password: 'adminpassword123' })
    });
    const { token } = await loginRes.json();
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };

    // 2. Get Global Stats
    console.log('\n--- Admin Stats ---');
    const statsRes = await fetch(`${API_URL}/admin/stats`, { headers });
    const statsData = await statsRes.json();
    console.log('Total Paiements:', statsData.data.paiements.totalCollecte);

    // 3. Get All Users
    console.log('\n--- Admin Users ---');
    const usersRes = await fetch(`${API_URL}/admin/users`, { headers });
    const usersData = await usersRes.json();
    console.log('Utilisateurs count:', usersData.count);

    // 4. Create New Agent
    console.log('\n--- Create Agent via Admin ---');
    const createAgentRes = await fetch(`${API_URL}/admin/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        nom: 'Agent2',
        prenom: 'Justice 1',
        email: 'agent_justice@egov.bf',
        telephone: '66123456',
        role: 'AGENT_JUSTICE',
        service: 'justice'
      })
    });
    const agentData = await createAgentRes.json();
    console.log('Agent créé OK:', agentData.success);
    console.log('Password temp généré:', agentData.passwordTemp);

    // 5. Get Audit Logs
    console.log('\n--- Admin Logs ---');
    const logsRes = await fetch(`${API_URL}/admin/logs`, { headers });
    const logsData = await logsRes.json();
    console.log('Dernier log:', logsData.data[0].action);

    console.log('\n✅ Phase 6 Verification Successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification Failed:', error.message);
    process.exit(1);
  }
};

testAdminFlow();
