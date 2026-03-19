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
    final demande = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>? ?? {};
    
    final title = demande['documentTypeId']?['nom'] ?? 'Détails de la demande';
    final reference = demande['reference'] ?? 'Réf inconnue';
    final citoyenNom = demande['citoyenId'] != null 
        ? '${demande['citoyenId']['prenom']} ${demande['citoyenId']['nom']}'
        : 'Citoyen Inconnu';
    final lieu = demande['donnees']?['lieuNaissance'] ?? 'Non précisé';
    final cnib = demande['donnees']?['numeroCnib'] ?? 'Non précisé';

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
                        Text(title, style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700, color: primaryBlue)),
                        Text("Réf: $reference", style: GoogleFonts.inter(fontSize: 13, color: textSecondary)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _buildInfoRecap(context, citoyenNom, cnib, lieu),
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
                onPressed: () => _showValidationDialog(context, citoyenNom, title, reference),
                style: ElevatedButton.styleFrom(backgroundColor: successGreen, foregroundColor: Colors.white),
                child: const Text("Valider"),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRecap(BuildContext context, String citoyen, String cnib, String lieu) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
      child: Column(
        children: [
          _buildRow("Citoyen", citoyen),
          _buildRow("CNIB", cnib),
          _buildRow("Lieu", lieu),
        ],
      ),
    );
  }

  Widget _buildRow(String label, String value) {
    return Padding(padding: const EdgeInsets.symmetric(vertical: 8), child: Row(children: [Text(label), const Spacer(), Text(value, style: const TextStyle(fontWeight: FontWeight.bold))]));
  }

  void _showValidationDialog(BuildContext context, String citoyen, String type, String ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Confirmer la validation ?"),
        content: Text("Voulez-vous valider la demande de $citoyen ?"),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Annuler")),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, ValidationSuccesPage.routeName, arguments: {
                'reference': ref,
                'citoyen': citoyen,
                'typeDemande': type,
              });
            },
            child: const Text("Confirmer"),
          ),
        ],
      ),
    );
  }
}
