const API_URL = 'http://localhost:5000/api';

const verifyCorrections = async () => {
  try {
    // 1. Login Admin
    console.log('--- Login Admin ---');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@egov.bf', password: 'adminpassword123' })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    const { token } = loginData;
    const headers = { 'Authorization': `Bearer ${token}` };

    // 2. Test GET /api/admin/demandes
    console.log('\n--- Test Admin GetAllDemandes ---');
    const demRes = await fetch(`${API_URL}/admin/demandes`, { headers });
    const demData = await demRes.json();
    if (!demRes.ok) throw new Error(`GetAllDemandes failed: ${JSON.stringify(demData)}`);
    
    console.log('Success:', demData.success);
    console.log('Demandes count:', demData.count);
    if (demData.count > 0) {
      console.log('First Demande Ref:', demData.data[0].reference);
      console.log('Populated Citoyen:', demData.data[0].citoyenId.nom);
      console.log('Populated DocType:', demData.data[0].documentTypeId.nom);
    }

    // 3. Test Filters
    console.log('\n--- Test Admin Filters (service=mairie) ---');
    const filterRes = await fetch(`${API_URL}/admin/demandes?service=mairie`, { headers });
    const filterData = await filterRes.json();
    console.log('Mairie Demandes count:', filterData.count);

    console.log('\n✅ Corrections Verification Successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification Failed:', error.message);
    process.exit(1);
  }
};

verifyCorrections();
