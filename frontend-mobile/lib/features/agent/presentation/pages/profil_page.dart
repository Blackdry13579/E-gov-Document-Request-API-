import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfilPage extends StatelessWidget {
  const ProfilPage({super.key});

  @override
  Widget build(BuildContext context) {
    const primaryBlue = Color(0xFF1A3C6E);
    const accentBlue = Color(0xFF1565C0);
    const errorRed = Color(0xFFE74C3C);
    const backgroundLight = Color(0xFFF4F6F9);
    const textPrimary = Color(0xFF1C1C1E);
    const textSecondary = Color(0xFF8E8E93);
    const iconBg = Color(0xFFEEF2F5);

    return Scaffold(
      backgroundColor: backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        title: Text("E-Administration", style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w700, color: primaryBlue)),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              color: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 32),
              child: Column(
                children: [
                  CircleAvatar(radius: 50, backgroundColor: Colors.grey[300], child: const Icon(Icons.person, size: 50, color: Colors.white)),
                  const SizedBox(height: 16),
                  Text("Agent Administrateur", style: GoogleFonts.inter(fontSize: 22, fontWeight: FontWeight.w800, color: textPrimary)),
                  Text("Mairie de Ouagadougou", style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w600, color: accentBlue)),
                ],
              ),
            ),
            const SizedBox(height: 12),
            _buildSettingsItem(Icons.badge_outlined, "Identifiant Agent", "MAI-OUAGA-2024-089", primaryBlue, textPrimary, textSecondary, iconBg),
            _buildSettingsItem(Icons.shield_outlined, "Signature Numérique", "Certifiée et valide", primaryBlue, textPrimary, textSecondary, iconBg),
            const SizedBox(height: 32),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.logout_rounded, color: errorRed),
                  label: const Text("Déconnexion", style: TextStyle(color: errorRed)),
                  style: OutlinedButton.styleFrom(side: const BorderSide(color: errorRed)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingsItem(IconData icon, String title, String subtitle, Color primaryBlue, Color textPrimary, Color textSecondary, Color iconBg) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
      child: Row(
        children: [
          Container(width: 44, height: 44, decoration: BoxDecoration(color: iconBg, shape: BoxShape.circle), child: Icon(icon, color: primaryBlue)),
          const SizedBox(width: 12),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, style: const TextStyle(fontWeight: FontWeight.bold)), Text(subtitle, style: TextStyle(color: textSecondary, fontSize: 12))]),
          const Spacer(),
          const Icon(Icons.chevron_right),
        ],
      ),
    );
  }
}
