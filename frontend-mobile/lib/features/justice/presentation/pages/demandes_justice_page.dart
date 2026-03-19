import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DemandesJusticePage extends StatelessWidget {
  const DemandesJusticePage({super.key});

  @override
  Widget build(BuildContext context) {
    const primaryBlue = Color(0xFF1A3C6E);
    const backgroundLight = Color(0xFFF4F6F9);

    return Scaffold(
      backgroundColor: backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text("Justice - Demandes", style: GoogleFonts.inter(color: primaryBlue, fontWeight: FontWeight.bold)),
      ),
      body: const Center(child: Text("Liste des demandes Justice")),
    );
  }
}
