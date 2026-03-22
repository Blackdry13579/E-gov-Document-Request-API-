import 'package:egov_mobile/features/shared/presentation/widgets/egov_main_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../citizen/presentation/pages/dossier_approuve_page.dart';
import '../../../citizen/presentation/pages/suivi_dossier_page.dart';
import '../../../citizen/presentation/pages/suivi_dossier_rejete_page.dart';
import '../../../citizen/presentation/pages/mes_demandes_page.dart';
import '../../../catalogue/presentation/pages/catalogue_page.dart';
import '../../../shared/presentation/widgets/citizen_bottom_nav.dart';
import '../../../notifications/presentation/pages/notifications_page.dart';
import '../../../../scaffolds/citizen_main_scaffold.dart';
class HomePageSimple extends StatefulWidget {
  const HomePageSimple({super.key});

  static const routeName = '/home-simple';

  @override
  State<HomePageSimple> createState() => _HomePageSimpleState();
}

class _HomePageSimpleState extends State<HomePageSimple> {
  @override
  Widget build(BuildContext context) {
    final authProvider = context.watch<AuthProvider>();
    final agent = authProvider.agent;
    final userName = agent?.nom ?? 'Citoyen';

    return Scaffold(
      backgroundColor: AppColors.background,

      appBar: EgovMainAppBar(
        title: 'PORTAIL CITOYEN',
        onProfileTap: () => CitizenMainScaffold.of(context)?.switchTab(3),
      ),

      // ============================================================
      // BODY
      // ============================================================
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --------------------------------------------------
            // HERO BANNER avec photo de bâtiment
            // --------------------------------------------------
            _buildHeroBanner(userName),
            const SizedBox(height: 16),

            // --------------------------------------------------
            // BOUTON NOUVELLE DEMANDE
            // --------------------------------------------------
            _buildNewRequestButton(),
            const SizedBox(height: 24),

            // --------------------------------------------------
            // SERVICES POPULAIRES
            // --------------------------------------------------
            _buildSectionHeader('Services Populaires'),
            const SizedBox(height: 16),
            _buildServicesGrid(),
            const SizedBox(height: 24),

            // --------------------------------------------------
            // DEMANDES RÉCENTES
            // --------------------------------------------------
            _buildSectionHeader('Demandes Récentes', showVoirTout: true),
            const SizedBox(height: 16),
            _buildRequestCard(
              title: 'Acte de Naissance',
              reference: 'CDB-2026-004521',
              date: 'Effectué le 12 Mai 2026',
              statusText: 'VALIDÉE',
              statusColor: AppColors.success,
              actionLabel: 'Détails',
              actionIcon: Icons.open_in_new_rounded,
            ),
            _buildRequestCard(
              title: 'Renouvellement CNI',
              reference: 'CDB-2026-008912',
              date: 'Effectué le 18 Mai 2026',
              statusText: 'EN ATTENTE',
              statusColor: AppColors.warning,
              actionLabel: 'Suivre',
              actionIcon: Icons.history_rounded,
            ),
            _buildRequestCard(
              title: 'Casier Judiciaire',
              reference: 'CDB-2026-003301',
              date: 'Effectué le 05 Mai 2026',
              statusText: 'REJETÉE',
              statusColor: AppColors.error,
              actionLabel: 'Motif',
              actionIcon: Icons.info_outline_rounded,
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  // ============================================================
  // HERO BANNER
  // Card arrondie avec photo de bâtiment + texte de bienvenue
  // ============================================================
  Widget _buildHeroBanner(String userName) {
    return Container(
      width: double.infinity,
      height: 180,
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: AppColors.primary, // fallback si image absente
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Photo de bâtiment
            Image.asset(
              'assets/images/building.png',
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [AppColors.primaryLight, AppColors.primary],
                  ),
                ),
              ),
            ),
            // Overlay dégradé sombre en bas pour lisibilité du texte
            Positioned.fill(
              child: DecoratedBox(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withOpacity(0.65),
                    ],
                    stops: const [0.3, 1.0],
                  ),
                ),
              ),
            ),
            // Texte de bienvenue en bas à gauche
            Positioned(
              bottom: 20,
              left: 20,
              right: 20,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Bienvenue sur votre portail',
                    style: GoogleFonts.inter(
                      fontSize: 13,
                      fontWeight: FontWeight.w400,
                      color: Colors.white.withOpacity(0.85),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Bonjour, $userName 👋',
                    style: GoogleFonts.outfit(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ============================================================
  // BOUTON NOUVELLE DEMANDE
  // Pleine largeur, bleu foncé, icône + flèche
  // ============================================================
  Widget _buildNewRequestButton() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      width: double.infinity,
      height: 56,
      child: ElevatedButton(
        onPressed: () {
          final scaffold = CitizenMainScaffold.of(context);
          if (scaffold != null) {
            scaffold.switchTab(1);
          } else {
            Navigator.of(context).pushNamed(CataloguePage.routeName);
          }
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          padding: EdgeInsets.zero,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.add_circle_outline, size: 20),
            const SizedBox(width: 10),
            Flexible(
              child: Text(
                'NOUVELLE DEMANDE',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.2,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            const SizedBox(width: 8),
            const Icon(Icons.arrow_forward_ios_rounded, size: 14),
          ],
        ),
      ),
    );
  }

  // ============================================================
  // EN-TÊTE DE SECTION (barre jaune + titre + "Voir tout" optionnel)
  // ============================================================
  Widget _buildSectionHeader(String title, {bool showVoirTout = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          // Barre jaune verticale
          Container(
            width: 4,
            height: 20,
            decoration: BoxDecoration(
              color: AppColors.accent,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              title,
              style: GoogleFonts.outfit(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: AppColors.textDark,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          if (showVoirTout) ...[
            GestureDetector(
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (_) => const MesDemandesPage(),
                ));
              },
              child: Text(
                'Voir tout',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppColors.primary,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  // ============================================================
  // GRILLE SERVICES POPULAIRES (2 colonnes)
  // ============================================================
  Widget _buildServicesGrid() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          Expanded(child: _buildServiceCard(Icons.account_tree_outlined, 'État Civil')),
          const SizedBox(width: 12),
          Expanded(child: _buildServiceCard(Icons.gavel_rounded, 'Justice')),
        ],
      ),
    );
  }

  Widget _buildServiceCard(IconData icon, String label) {
    return GestureDetector(
      onTap: () {
        final scaffold = CitizenMainScaffold.of(context);
        if (scaffold != null) {
          scaffold.switchTab(1);
        } else {
          Navigator.of(context).pushNamed(CataloguePage.routeName);
        }
      },
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              color: const Color(0xFFF0F2F5),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: AppColors.primary, size: 26),
          ),
          const SizedBox(height: 12),
          Text(
            label,
            style: GoogleFonts.inter(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: AppColors.textDark,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    ));
  }

  // ============================================================
  // CARTE DE DEMANDE
  // Bordure gauche colorée selon statut — structure correcte
  // ============================================================
  Widget _buildRequestCard({
    required String title,
    required String reference,
    required String date,
    required String statusText,
    required Color statusColor,
    required String actionLabel,
    required IconData actionIcon,
  }) {
    return GestureDetector(
      onTap: () {
        if (statusText == "VALIDÉE") {
          Navigator.of(context).push(MaterialPageRoute(
            builder: (_) => DossierApprouvePage(
              reference: reference,
              nomFichier: title,
              tailleFichier: "2.4 MB",
              delivrePar: "Mairie Centrale de Ouagadougou",
              validite: "Permanente",
            ),
          ));
        } else if (statusText == "REJETÉE") {
          Navigator.of(context).push(MaterialPageRoute(
            builder: (_) => SuiviDossierRejetePage(
              reference: reference,
              titreDemande: title,
              dateDepot: date,
              direction: "Mairie Centrale de Ouagadougou",
              motifRejet: "Document expiré ou illisible",
              noteInstructeur: "Veuillez fournir une copie numérisée en bonne qualité de la pièce demandée.",
            ),
          ));
        } else {
          Navigator.of(context).push(MaterialPageRoute(
            builder: (_) => SuiviDossierPage(
              reference: reference,
              statut: statusText,
            ),
          ));
        }
      },
      child: Container(
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          // ⚠️ Bordure gauche colorée directement sur le container extérieur
          border: Border(
            left: BorderSide(color: statusColor, width: 4),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Ligne 1 : Titre + Badge statut
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      title,
                      style: GoogleFonts.outfit(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textDark,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: statusColor.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      statusText,
                      style: GoogleFonts.outfit(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: statusColor,
                        letterSpacing: 0.4,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              // Référence
              Text(
                reference,
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  color: AppColors.textLight,
                ),
              ),
              const SizedBox(height: 10),
              // Ligne 2 : Date + Action
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Text(
                      date,
                      style: GoogleFonts.outfit(
                        fontSize: 12,
                        color: AppColors.textLight,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Row(
                    children: [
                      Text(
                        actionLabel,
                        style: GoogleFonts.outfit(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: AppColors.primary,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(actionIcon, size: 14, color: AppColors.primary),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
