import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../../../core/providers/demande_provider.dart';
import '../../domain/models/agent_config.dart';
import 'detail_demande_page.dart';

class AgentRequestsPage extends StatefulWidget {
  final AgentRole role;
  const AgentRequestsPage({super.key, required this.role});

  @override
  State<AgentRequestsPage> createState() => _AgentRequestsPageState();
}

class _AgentRequestsPageState extends State<AgentRequestsPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<DemandeProvider>().fetchDemandes();
    });
  }

  @override
  Widget build(BuildContext context) {
    final config = AgentConfig.getByRole(widget.role);
    const successGreen = Color(0xFF27AE60);
    const warningOrange = Color(0xFFF39C12);
    const errorRed = Color(0xFFE74C3C);
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
      body: Consumer<DemandeProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading && provider.demandes.isEmpty) {
            return const Center(child: CircularProgressIndicator());
          }

          if (provider.demandes.isEmpty) {
            return Center(
              child: Text(
                'Aucune demande à afficher',
                style: GoogleFonts.inter(color: textSecondary),
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => provider.fetchDemandes(),
            child: ListView.builder(
              padding: const EdgeInsets.all(20),
              itemCount: provider.demandes.length,
              itemBuilder: (context, index) {
                final demande = provider.demandes[index];
                final title = demande['documentTypeId']?['nom'] ?? 'Demande';
                final citoyen = demande['citoyenId'] != null 
                    ? '${demande['citoyenId']['prenom']} ${demande['citoyenId']['nom']}'
                    : 'Citoyen Inconnu';
                final dateStr = demande['dateSoumission'] ?? '';
                final displayDate = dateStr.isNotEmpty 
                    ? dateStr.substring(0, 10) 
                    : 'Date inconnue';
                
                final statut = demande['statut'] ?? 'INCONNU';
                Color statusColor = textSecondary;
                
                switch (statut) {
                  case 'VALIDEE':
                  case 'TERMINEE':
                    statusColor = successGreen;
                    break;
                  case 'EN_ATTENTE':
                  case 'NOUVEAU':
                    statusColor = warningOrange;
                    break;
                  case 'EN_COURS':
                  case 'URGENT':
                    statusColor = config.primaryColor;
                    break;
                  case 'REJETEE':
                  case 'DOCUMENTS_MANQUANTS':
                    statusColor = errorRed;
                    break;
                }

                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _buildRequestCard(
                    context,
                    demande: demande,
                    title: title,
                    name: citoyen,
                    date: displayDate,
                    status: statut,
                    statusColor: statusColor,
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildRequestCard(
    BuildContext context, {
    required Map<String, dynamic> demande,
    required String title,
    required String name,
    required String date,
    required String status,
    required Color statusColor,
  }) {
    return InkWell(
      onTap: () => Navigator.pushNamed(context, DetailDemandePage.routeName, arguments: demande),
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
                Expanded(
                  child: Text(
                    title, 
                    style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w700, color: const Color(0xFF1C1C1E)),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
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
