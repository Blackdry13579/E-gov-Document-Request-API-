const API_URL = 'http://localhost:5000/api';

const testAgentFlow = async () => {
  try {
    // 1. Login Agent
    console.log('--- Login Agent ---');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'agent_mairie@egov.bf', password: 'agentpassword123' })
    });
    
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    
    const { token } = loginData;
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };

    // 2. Get Demandes for Service
    console.log('\n--- Get Demandes Agent ---');
    const demRes = await fetch(`${API_URL}/agent/demandes`, { headers });
    const demData = await demRes.json();
    
    if (!demRes.ok) {
      console.error('Demandes Error Body:', demData);
      throw new Error(`Get Demandes failed with status ${demRes.status}`);
    }

    console.log('Demandes count:', demData.count);
    
    if (!demData.data || !Array.isArray(demData.data)) {
      console.error('Unexpected Response data:', demData);
      throw new Error('Response data is not an array');
    }

    // On cherche une demande EN_COURS (depuis verify_workflow.js)
    const demande = demData.data.find(d => d.statut === 'EN_COURS' || d.statut === 'EN_ATTENTE');
    if (!demande) throw new Error('Aucune demande à traiter. Re-run verify_workflow.js?');
    console.log('Demande ID:', demande._id, 'Statut:', demande.statut);

    // 3. Prendre en charge (si EN_ATTENTE)
    if (demande.statut === 'EN_ATTENTE') {
      console.log('\n--- Prendre en charge ---');
      const takeRes = await fetch(`${API_URL}/agent/demandes/${demande._id}/prendre-en-charge`, {
        method: 'PUT',
        headers
      });
      const takeData = await takeRes.json();
      if (!takeRes.ok) throw new Error(`Takeover failed: ${JSON.stringify(takeData)}`);
      console.log('Prise en charge OK:', takeData.success);
    }

    // 4. Valider
    console.log('\n--- Valider Demande ---');
    const valRes = await fetch(`${API_URL}/agent/demandes/${demande._id}/valider`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ notes: 'Félicitations, votre extrait est prêt.' })
    });
    const valData = await valRes.json();
    if (!valRes.ok) throw new Error(`Validation failed: ${JSON.stringify(valData)}`);
    console.log('Validation OK:', valData.success);
    console.log('PDF URL:', valData.data.documentPDF.url);

    // 5. Check Stats
    console.log('\n--- Stats Agent ---');
    const statsRes = await fetch(`${API_URL}/agent/stats`, { headers });
    const statsData = await statsRes.json();
    console.log('Mes actions:', statsData.data.mesActionsTraitement);

    console.log('\n✅ Phase 5 Verification Successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification Failed:', error.message);
    process.exit(1);
  }
};

testAgentFlow();
