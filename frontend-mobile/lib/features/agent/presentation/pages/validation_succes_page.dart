import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ValidationSuccesPage extends StatelessWidget {
  final String reference;
  final String citoyen;
  final String typeDemande;

  const ValidationSuccesPage({
    super.key,
    required this.reference,
    required this.citoyen,
    required this.typeDemande,
  });

  static const routeName = '/validation-succes';

  @override
  Widget build(BuildContext context) {
    const primaryBlue = Color(0xFF1A3C6E);
    const accentBlue = Color(0xFF1565C0);
    const successGreen = Color(0xFF27AE60);
    const backgroundLight = Color(0xFFF4F6F9);
    const textPrimary = Color(0xFF1C1C1E);
    const textSecondary = Color(0xFF8E8E93);
    const iconBg = Color(0xFFEEF2F5);

    return Scaffold(
      backgroundColor: backgroundLight,
      appBar: AppBar(
        backgroundColor: backgroundLight,
        elevation: 0,
        automaticallyImplyLeading: false,
        title: Text("Portail Agent", style: GoogleFonts.inter(fontWeight: FontWeight.bold, color: primaryBlue)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const CircleAvatar(radius: 45, backgroundColor: successGreen, child: Icon(Icons.check, color: Colors.white, size: 45)),
            const SizedBox(height: 24),
            Text("Demande Validée avec Succès", textAlign: TextAlign.center, style: GoogleFonts.inter(fontSize: 24, fontWeight: FontWeight.w800, color: primaryBlue)),
            const SizedBox(height: 32),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18)),
              child: Column(
                children: [
                  _buildRecapRow(Icons.fingerprint, "Référence", reference, accentBlue, primaryBlue, textSecondary, iconBg),
                  _buildRecapRow(Icons.person, "Citoyen", citoyen, textPrimary, primaryBlue, textSecondary, iconBg),
                  _buildRecapRow(Icons.description, "Type", typeDemande, textPrimary, primaryBlue, textSecondary, iconBg),
                ],
              ),
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () => Navigator.popUntil(context, (route) => route.isFirst),
                style: ElevatedButton.styleFrom(backgroundColor: successGreen, foregroundColor: Colors.white),
                child: const Text("Retour à la liste"),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecapRow(IconData icon, String label, String value, Color vColor, Color pBlue, Color tSec, Color iBg) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(children: [
        Container(width: 40, height: 40, decoration: BoxDecoration(color: iBg, borderRadius: BorderRadius.circular(10)), child: Icon(icon, color: pBlue)),
        const SizedBox(width: 12),
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(label, style: TextStyle(color: tSec, fontSize: 12)), Text(value, style: TextStyle(color: vColor, fontWeight: FontWeight.bold))]),
      ]),
    );
  }
}
