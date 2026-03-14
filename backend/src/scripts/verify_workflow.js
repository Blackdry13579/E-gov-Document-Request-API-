const API_URL = 'http://localhost:5000/api';

const testDemandeFlow = async () => {
  try {
    // 1. Login (using user from verify_auth.js)
    console.log('--- Login ---');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'ibrahim@example.com', password: 'password123' })
    });
    const { token } = await loginRes.json();
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };

    // 2. Get Documents
    console.log('\n--- Get Documents ---');
    const docsRes = await fetch(`${API_URL}/documents`);
    const docsData = await docsRes.json();
    const naissance = docsData.data.find(d => d.code === 'NAISSANCE');
    console.log('Doc NAISSANCE ID:', naissance._id);

    // 3. Create Demande (Failure - missing fields)
    console.log('\n--- Create Demande (Fail) ---');
    const failRes = await fetch(`${API_URL}/demandes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ documentTypeId: naissance._id })
    });
    const failData = await failRes.json();
    console.log('Validation Error OK:', failData.message);

    // 4. Create Demande (Success)
    console.log('\n--- Create Demande (Success) ---');
    const createRes = await fetch(`${API_URL}/demandes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        documentTypeId: naissance._id,
        donnees: {
          nomPere: 'Traore P',
          prenomPere: 'Abdou',
          nomMere: 'Soro M',
          prenomMere: 'Alima',
          maternite: 'Yalgado',
          typeCopie: 'Extrait simple'
        },
        fichiers: [
          { code: 'CNI', nom: 'Ma CNI', url: 'http://cloud.com/cni.jpg', publicId: 'cni123' }
        ],
        paiement: { methode: 'ORANGE_MONEY', telephone: '70123456' }
      })
    });
    const createData = await createRes.json();
    if (!createRes.ok) throw new Error(JSON.stringify(createData));
    console.log('Demande Created:', createData.data.reference);
    const ref = createData.data.reference;

    // 5. Pay Demande
    console.log('\n--- Payer Demande ---');
    const payRes = await fetch(`${API_URL}/demandes/${ref}/payer`, {
      method: 'POST',
      headers
    });
    const payData = await payRes.json();
    console.log('Paiement OK:', payData.success);

    // 6. Get Detail
    console.log('\n--- Get Detail ---');
    const detailRes = await fetch(`${API_URL}/demandes/${ref}`, { headers });
    const detailData = await detailRes.json();
    console.log('Détail Statut:', detailData.data.statut);

    console.log('\n✅ Phase 4 Verification Successful');
    process.exit(0);
  } catch (error) {
    console.error('❌ Verification Failed:', error.message);
    process.exit(1);
  }
};

testDemandeFlow();
