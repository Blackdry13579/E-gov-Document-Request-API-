import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../domain/models/agent_config.dart';
import 'detail_demande_page.dart';

class AgentRequestsPage extends StatelessWidget {
  final AgentRole role;
  const AgentRequestsPage({super.key, required this.role});

  @override
  Widget build(BuildContext context) {
    final config = AgentConfig.getByRole(role);
    const successGreen = Color(0xFF27AE60);
    const warningOrange = Color(0xFFF39C12);
    const textSecondary = Color(0xFF8E8E93);
    const backgroundLight = Color(0xFFF4F6F9);

    return Scaffold(
      backgroundColor: backgroundLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leadingWidth: 160,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: Image.asset(
                  config.flagAsset,
                  width: 32,
                  height: 24,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) =>
                      const Icon(Icons.flag_outlined, color: Colors.grey, size: 24),
                ),
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'LISTE DES',
                      style: GoogleFonts.inter(
                        fontSize: 8,
                        fontWeight: FontWeight.w700,
                        color: textSecondary,
                        letterSpacing: 0.5,
                      ),
                    ),
                    Text(
                      'Demandes',
                      style: GoogleFonts.inter(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        color: config.primaryColor,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          _buildRequestCard(
            context,
            title: "Extrait de Naissance",
            name: "Ibrahim Sanou",
            date: "15/03/2026",
            status: "EN ATTENTE",
            statusColor: warningOrange,
          ),
          const SizedBox(height: 12),
          _buildRequestCard(
            context,
            title: "Certificat de Nationalité",
            name: "Awa Koulibaly",
            date: "14/03/2026",
            status: "VALIDÉ",
            statusColor: successGreen,
          ),
        ],
      ),
    );
  }

  Widget _buildRequestCard(
    BuildContext context, {
    required String title,
    required String name,
    required String date,
    required String status,
    required Color statusColor,
  }) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, DetailDemandePage.routeName),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 10, offset: const Offset(0, 4)),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(title, style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w700, color: const Color(0xFF1C1C1E))),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: statusColor.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(6)),
                  child: Text(status, style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w800, color: statusColor)),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(name, style: GoogleFonts.inter(fontSize: 14, color: const Color(0xFF1C1C1E))),
            const SizedBox(height: 4),
            Text(date, style: GoogleFonts.inter(fontSize: 12, color: const Color(0xFF8E8E93))),
          ],
        ),
      ),
    );
  }
}
