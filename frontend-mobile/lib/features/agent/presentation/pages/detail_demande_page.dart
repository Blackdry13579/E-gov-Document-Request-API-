import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'validation_succes_page.dart';

class DetailDemandePage extends StatelessWidget {
  const DetailDemandePage({super.key});

  static const routeName = '/detail-demande';

  // Colors
  static const Color primaryBlue = Color(0xFF1A3C6E);
  static const Color successGreen = Color(0xFF27AE60);
  static const Color errorRed = Color(0xFFE74C3C);
  static const Color warningOrange = Color(0xFFF39C12);
  static const Color backgroundLight = Color(0xFFF4F6F9);
  static const Color textPrimary = Color(0xFF1C1C1E);
  static const Color textSecondary = Color(0xFF8E8E93);
  static const Color labelGray = Color(0xFF9E9E9E);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, color: textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          'Détails de la demande',
          style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600, color: textPrimary),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(color: const Color(0xFFEEEEEE), height: 1),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(bottom: 100),
        child: Column(
          children: [
            Container(
              color: Colors.white,
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Container(
                    width: 72, height: 72,
                    decoration: BoxDecoration(color: const Color(0xFFEEF2F5), borderRadius: BorderRadius.circular(10)),
                    child: const Icon(Icons.description_outlined, color: primaryBlue, size: 32),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Extrait d'acte de naissance", style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700, color: primaryBlue)),
                        Text("Réf: CDB-2026-001234", style: GoogleFonts.inter(fontSize: 13, color: textSecondary)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _buildInfoRecap(context),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 28),
        color: Colors.white,
        child: Row(
          children: [
            Expanded(
              child: ElevatedButton(
                onPressed: () => _showValidationDialog(context),
                style: ElevatedButton.styleFrom(backgroundColor: successGreen, foregroundColor: Colors.white),
                child: const Text("Valider"),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRecap(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
      child: Column(
        children: [
          _buildRow("Citoyen", "Jean-Baptiste Ouédraogo"),
          _buildRow("CNIB", "B12345678"),
          _buildRow("Lieu", "Ouagadougou"),
        ],
      ),
    );
  }

  Widget _buildRow(String label, String value) {
    return Padding(padding: const EdgeInsets.symmetric(vertical: 8), child: Row(children: [Text(label), const Spacer(), Text(value, style: const TextStyle(fontWeight: FontWeight.bold))]));
  }

  void _showValidationDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Confirmer la validation ?"),
        content: const Text("Voulez-vous valider la demande de Moussa Traoré ?"),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Annuler")),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, ValidationSuccesPage.routeName, arguments: {
                'reference': 'BF-2024-8892-X',
                'citoyen': 'Moussa Traoré',
                'typeDemande': "Extrait d'acte de naissance",
              });
            },
            child: const Text("Confirmer"),
          ),
        ],
      ),
    );
  }
}
