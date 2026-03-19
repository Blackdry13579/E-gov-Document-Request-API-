import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../../../core/providers/demande_provider.dart';
import '../../domain/models/agent_config.dart';
import 'detail_demande_page.dart';

class AgentHomePage extends StatefulWidget {
  final AgentRole role;
  const AgentHomePage({super.key, required this.role});

  @override
  State<AgentHomePage> createState() => _AgentHomePageState();
}

class _AgentHomePageState extends State<AgentHomePage> {
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
    const errorRed = Color(0xFFE74C3C);
    const textPrimary = Color(0xFF1C1C1E);
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
                      'BURKINA FASO',
                      style: GoogleFonts.inter(
                        fontSize: 8,
                        fontWeight: FontWeight.w700,
                        color: textSecondary,
                        letterSpacing: 0.5,
                      ),
                    ),
                    Text(
                      config.ministryName,
                      style: GoogleFonts.inter(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: config.primaryColor,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            width: 40,
            height: 40,
            decoration: const BoxDecoration(
              color: Color(0xFFEEF2F5),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.notifications_outlined, color: Color(0xFF1A3C6E), size: 22),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () => context.read<DemandeProvider>().fetchDemandes(),
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Section
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: config.primaryColor,
                  image: const DecorationImage(
                    image: AssetImage('assets/images/building.png'),
                    fit: BoxFit.cover,
                    opacity: 0.15,
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Bienvenue,',
                      style: GoogleFonts.inter(fontSize: 16, color: Colors.white.withValues(alpha: 0.8)),
                    ),
                    Text(
                      'Agent Administrateur',
                      style: GoogleFonts.inter(fontSize: 24, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    const SizedBox(height: 24),
                    Consumer<DemandeProvider>(
                      builder: (context, provider, child) {
                        final traitee = provider.demandes.where((d) => d['statut'] == 'TRAITEE').length;
                        final enAttente = provider.demandes.where((d) => d['statut'] != 'TRAITEE').length;
                        
                        return Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: Colors.white.withValues(alpha: 0.2)),
                          ),
                          child: Row(
                            children: [
                              _buildQuickStat(traitee.toString(), 'Traitées'),
                              _buildStatDivider(),
                              _buildQuickStat(enAttente.toString(), 'En attente'),
                              _buildStatDivider(),
                              _buildQuickStat('100%', 'Ratio'),
                            ],
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),

              // Recent Activity Section
              Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Activités récentes',
                          style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.w700, color: textPrimary),
                        ),
                        TextButton(
                          onPressed: () {},
                          child: Text('Voir tout', style: GoogleFonts.inter(color: config.primaryColor, fontWeight: FontWeight.w600)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Consumer<DemandeProvider>(
                      builder: (context, provider, child) {
                        if (provider.isLoading && provider.demandes.isEmpty) {
                          return const Center(
                            child: Padding(
                              padding: EdgeInsets.all(20),
                              child: CircularProgressIndicator(),
                            ),
                          );
                        }

                        if (provider.demandes.isEmpty) {
                          return Center(
                            child: Padding(
                              padding: const EdgeInsets.all(30),
                              child: Text(
                                'Aucune demande disponible',
                                style: GoogleFonts.inter(color: textSecondary),
                              ),
                            ),
                          );
                        }

                        return Column(
                          children: provider.demandes.take(5).map((demande) {
                            final title = demande['documentTypeId']?['nom'] ?? 'Demande';
                            final citoyen = demande['citoyenId'] != null 
                                ? '${demande['citoyenId']['prenom']} ${demande['citoyenId']['nom']}'
                                : 'Citoyen Inconnu';
                            final dateStr = demande['dateSoumission'] ?? '';
                            final displayDate = dateStr.isNotEmpty 
                                ? '$citoyen • ${dateStr.substring(0, 10)}'
                                : citoyen;

                            return Padding(
                              padding: const EdgeInsets.only(bottom: 12),
                              child: _buildActivityCard(
                                context,
                                demande: demande,
                                title: title,
                                date: displayDate,
                                icon: Icons.description_outlined,
                                iconColor: config.primaryColor,
                                avatarBg: const Color(0xFFE8F4F8),
                                badgeText: demande['statut'] ?? 'NOUVEAU',
                                badgeColor: (demande['statut'] == 'URGENT') ? errorRed : config.primaryColor,
                                badgeBg: (demande['statut'] == 'URGENT') 
                                    ? errorRed.withValues(alpha: 0.1) 
                                    : config.primaryColor.withValues(alpha: 0.1),
                              ),
                            );
                          }).toList(),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickStat(String value, String label) {
    return Expanded(
      child: Column(
        children: [
          Text(value, style: GoogleFonts.inter(fontSize: 20, fontWeight: FontWeight.w800, color: Colors.white)),
          Text(label, style: GoogleFonts.inter(fontSize: 11, color: Colors.white.withValues(alpha: 0.7))),
        ],
      ),
    );
  }

  Widget _buildStatDivider() {
    return Container(width: 1, height: 30, color: Colors.white.withValues(alpha: 0.2));
  }

  Widget _buildActivityCard(
    BuildContext context, {
    required Map<String, dynamic> demande,
    required String title,
    required String date,
    required IconData icon,
    required Color iconColor,
    required Color avatarBg,
    required String badgeText,
    required Color badgeColor,
    required Color badgeBg,
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
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(color: avatarBg, borderRadius: BorderRadius.circular(12)),
              child: Icon(icon, color: iconColor),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w700, color: const Color(0xFF1C1C1E))),
                  const SizedBox(height: 4),
                  Text(date, style: GoogleFonts.inter(fontSize: 12, color: const Color(0xFF8E8E93))),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(color: badgeBg, borderRadius: BorderRadius.circular(6)),
              child: Text(
                badgeText,
                style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w800, color: badgeColor),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
