import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DemandesMairiePage extends StatelessWidget {
  const DemandesMairiePage({super.key});

  @override
  Widget build(BuildContext context) {
    const primaryBlue = Color(0xFF1A3C6E);
    const backgroundLight = Color(0xFFF4F6F9);

    return Scaffold(
      backgroundColor: backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Text("Mairie - Demandes", style: GoogleFonts.inter(color: primaryBlue, fontWeight: FontWeight.bold)),
      ),
      body: const Center(child: Text("Liste des demandes Mairie")),
    );
  }
}
