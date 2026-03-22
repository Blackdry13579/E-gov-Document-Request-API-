import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../shared/domain/models/demande_model.dart';
import '../../../../core/constants/app_colors.dart';
import 'agent_validation_success_page.dart';
import 'agent_rejection_success_page.dart';

const _primaryBlue     = Color(0xFF1A237E);
const _warningOrange   = Color(0xFFF39C12);
const _backgroundLight = Color(0xFFF4F6F9);
const _textPrimary     = Color(0xFF1C1C1E);
const _textSecondary   = Color(0xFF8E8E93);
const _labelGray       = Color(0xFF9E9E9E);
const _iconBg          = Color(0xFFEEF2F5);
class AgentDetailDemandePage extends StatefulWidget {
  static const routeName = '/agent-detail-demande';

  final bool readOnly;
  final bool isAdmin;
  final DemandeModel? initialDemande;

  const AgentDetailDemandePage({
    super.key,
    this.readOnly = false,
    this.isAdmin = false,
    this.initialDemande,
  });

  @override
  State<AgentDetailDemandePage> createState() => _AgentDetailDemandePageState();
}

class _AgentDetailDemandePageState extends State<AgentDetailDemandePage> {
  bool _isValidating = false;

  Map<String, dynamic>? _getDemande(BuildContext context) {
    return ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
  }

  String _getCitoyenNom(Map<String, dynamic>? demande) {
    if (demande == null || demande['citoyenId'] == null) return 'Citoyen Inconnu';
    return '${demande['citoyenId']['prenom']} ${demande['citoyenId']['nom']}';
  }

  @override
  Widget build(BuildContext context) {
    final demandeMap = _getDemande(context) ?? {};
    final readOnly = demandeMap['readOnly'] ?? widget.readOnly;
    final isAdmin = demandeMap['isAdmin'] ?? widget.isAdmin;
    final citoyenNom = _getCitoyenNom(demandeMap);
    final typeDemande = demandeMap['documentTypeId']?['nom'] ?? "Demande de document";
    final reference = demandeMap['id'] ?? 'REF-UNKNOWN';

    return Scaffold(
      backgroundColor: _backgroundLight,

      // ── APPBAR ─────────────────────────────────────────────────────────────
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_rounded, color: isAdmin ? _primaryBlue : _textPrimary),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          isAdmin ? 'E-Gov Burkina' : 'Détails de la demande',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: isAdmin ? FontWeight.bold : FontWeight.w600,
            color: isAdmin ? _primaryBlue : _textPrimary,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.more_vert_rounded, color: _textPrimary),
            onPressed: () {},
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(color: const Color(0xFFEEEEEE), height: 1),
        ),
      ),

      // ── BOUTONS BAS ────────────────────────────────────────────────────────
      bottomNavigationBar: readOnly
          ? null
          : Container(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 28),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.08),
                    blurRadius: 12,
                    offset: const Offset(0, -2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  // VALIDER button
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _isValidating
                          ? null
                          : () => _showValidationDialog(context, citoyenNom),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF16a34a),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 0,
                        minimumSize: const Size(0, 52),
                      ),
                      child: _isValidating
                          ? const SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2,
                              ),
                            )
                          : Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(Icons.check_circle_rounded, size: 20),
                                const SizedBox(width: 8),
                                Text(
                                  'Valider',
                                  style: GoogleFonts.publicSans(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15,
                                  ),
                                ),
                              ],
                            ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  // REJETER button
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _isValidating
                          ? null
                          : () => _showRejectionBottomSheet(context),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFdc2626),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 0,
                        minimumSize: const Size(0, 52),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.cancel_rounded, size: 20),
                          const SizedBox(width: 8),
                          Text(
                            'Rejeter',
                            style: GoogleFonts.publicSans(
                              fontWeight: FontWeight.bold,
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
      
      // ── BODY ───────────────────────────────────────────────────────────────
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(bottom: 100),
        child: Column(
          children: [
            Container(
              color: Colors.white,
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 72,
                        height: 72,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: _iconBg,
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.asset(
                            'assets/images/building_bg.png',
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => const Icon(
                              Icons.description_outlined,
                              color: _primaryBlue,
                              size: 32,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              typeDemande,
                              style: GoogleFonts.inter(
                                fontSize: 18,
                                fontWeight: FontWeight.w700,
                                color: _primaryBlue,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Réf: $reference',
                              style: GoogleFonts.inter(
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                                color: _textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    decoration: BoxDecoration(
                      color: _warningOrange.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: _warningOrange,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          demandeMap['statut'] ?? 'En attente',
                          style: GoogleFonts.inter(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: _warningOrange,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 8),

            // B. SECTION "Informations Citoyen"
            _buildSectionHeader(Icons.person_outline_rounded, 'Informations Citoyen'),
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: const Color(0xFFF8F9FB),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFFE8ECF0)),
              ),
              child: Column(
                children: [
                  _buildInfoRow('Nom Complet', citoyenNom),
                  _buildDivider(),
                  _buildInfoRow('CNIB', 'B12345678'), // Placeholder
                  _buildDivider(),
                  _buildInfoRow('Téléphone', '+226 70 00 00 00'), // Placeholder
                  _buildDivider(),
                  _buildInfoRow('Email', 'j.ouedraogo@mail.bf'), // Placeholder
                ],
              ),
            ),

            const SizedBox(height: 20),

            // C. SECTION "Détails de la demande"
            _buildSectionHeader(Icons.description_outlined, 'Détails de la demande'),
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFFE8ECF0)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'PÈRE',
                              style: GoogleFonts.inter(
                                fontSize: 10,
                                fontWeight: FontWeight.w700,
                                color: _labelGray,
                                letterSpacing: 1.0,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Moussa Ouédraogo', // Placeholder
                              style: GoogleFonts.inter(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                color: _textPrimary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'MÈRE',
                              style: GoogleFonts.inter(
                                fontSize: 10,
                                fontWeight: FontWeight.w700,
                                color: _labelGray,
                                letterSpacing: 1.0,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'Aminata Traoré', // Placeholder
                              style: GoogleFonts.inter(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                color: _textPrimary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'LIEU DE NAISSANCE',
                    style: GoogleFonts.inter(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: _labelGray,
                      letterSpacing: 1.0,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Ouagadougou, Secteur 15', // Placeholder
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: _textPrimary,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'DATE DE NAISSANCE',
                    style: GoogleFonts.inter(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: _labelGray,
                      letterSpacing: 1.0,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '12 Mars 1992', // Placeholder
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: _textPrimary,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // D. SECTION "Pièces Justificatives"
            _buildSectionHeader(Icons.attach_file_rounded, 'Pièces Justificatives'),
            _buildFileCard(Icons.image_outlined, 'CNIB_recto.jpg', '1.2 MB'),
            _buildFileCard(Icons.image_outlined, 'CNIB_verso.jpg', '1.1 MB'),
            _buildFileCard(Icons.picture_as_pdf_rounded, 'Certificat_Residence.pdf', '2.4 MB'),

            const SizedBox(height: 20),

            // E. SECTION "Historique des actions"
            _buildSectionHeader(Icons.history_rounded, 'Historique des actions'),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  _buildTimelineItem(
                    isDone: true,
                    title: 'Demande soumise',
                    subtitle: "Aujourd'hui, 09:45 · Par le citoyen",
                  ),
                  _buildTimelineItem(
                    isDone: false,
                    title: 'En attente de traitement',
                    subtitle: 'Assigné automatiquement à la Mairie Centrale',
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  // ── HELPERS ────────────────────────────────────────────────────────────────

  Widget _buildSectionHeader(IconData icon, String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
      child: Row(
        children: [
          Icon(icon, color: _primaryBlue, size: 20),
          const SizedBox(width: 8),
          Text(
            title,
            style: GoogleFonts.inter(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: _textPrimary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: GoogleFonts.inter(fontSize: 13, color: _labelGray),
          ),
          Flexible(
            child: Text(
              value,
              textAlign: TextAlign.end,
              style: GoogleFonts.inter(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: _textPrimary,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDivider() {
    return const Divider(
      height: 1,
      color: Color(0xFFE8ECF0),
      indent: 16,
      endIndent: 16,
    );
  }

  Widget _buildFileCard(IconData icon, String name, String size) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 0, 16, 10),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFE8ECF0)),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: _iconBg,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: _primaryBlue, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: GoogleFonts.inter(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: _textPrimary,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 2),
                Text(
                  size,
                  style: GoogleFonts.inter(
                    fontSize: 11,
                    color: _textSecondary,
                  ),
                ),
              ],
            ),
          ),
          OutlinedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.visibility_outlined, size: 14),
            label: Text(
              'Voir',
              style: GoogleFonts.inter(
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
            style: OutlinedButton.styleFrom(
              foregroundColor: _primaryBlue,
              side: const BorderSide(color: Color(0xFFDDE2E8)),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineItem({
    bool isDone = false,
    String title = '',
    String subtitle = '',
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 12,
              height: 12,
              decoration: BoxDecoration(
                color: isDone ? _primaryBlue : const Color(0xFFCCCCCC),
                shape: BoxShape.circle,
              ),
            ),
            Container(
              width: 2,
              height: 40,
              color: isDone
                  ? _primaryBlue.withOpacity(0.2)
                  : const Color(0xFFEEEEEE),
            ),
          ],
        ),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: isDone ? _textPrimary : _textSecondary,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              subtitle,
              style: GoogleFonts.inter(
                fontSize: 12,
                color: isDone ? _textSecondary : const Color(0xFFBBBBBB),
              ),
            ),
          ],
        ),
      ],
    );
  }

  // ── DIALOGS & ACTIONS ──────────────────────────────────────────────────────

  void _showValidationDialog(BuildContext context, String citoyenNom) {
    showDialog(
      context: context,
      barrierDismissible: true,
      barrierColor: Colors.black.withOpacity(0.5),
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        backgroundColor: Colors.white,
        insetPadding: const EdgeInsets.symmetric(horizontal: 32, vertical: 24),
        child: Padding(
          padding: const EdgeInsets.all(28),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Icon
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: _primaryBlue.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.fact_check_rounded,
                  color: _primaryBlue,
                  size: 36,
                ),
              ),
              const SizedBox(height: 20),
              // Title
              Text(
                'Confirmer la validation ?',
                textAlign: TextAlign.center,
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF1e293b),
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 14),
              // Description
              RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF64748b),
                    fontSize: 14,
                    height: 1.6,
                  ),
                  children: [
                    const TextSpan(text: 'Cette action confirmera que tous les documents de '),
                    TextSpan(
                      text: citoyenNom,
                      style: GoogleFonts.publicSans(
                        color: const Color(0xFF1e293b),
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    const TextSpan(text: ' sont conformes aux exigences réglementaires.'),
                  ],
                ),
              ),
              const SizedBox(height: 28),
              // Button
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: () async {
                    Navigator.pop(context);
                    await _validerDemande();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF16a34a),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                    elevation: 0,
                  ),
                  child: Text(
                    'Confirmer',
                    style: GoogleFonts.publicSans(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Text(
                  'Annuler',
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF64748b),
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(height: 4),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _validerDemande() async {
    setState(() => _isValidating = true);
    try {
      await Future.delayed(const Duration(seconds: 1));
      if (!mounted) return;

      final demandeMap = _getDemande(context) ?? {};
      final model = DemandeModel.fromMap(demandeMap);

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => AgentValidationSuccessPage(
            demande: model,
          ),
        ),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Erreur lors de la validation',
            style: GoogleFonts.publicSans(color: Colors.white),
          ),
          backgroundColor: const Color(0xFFdc2626),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          margin: const EdgeInsets.all(16),
        ),
      );
    } finally {
      if (mounted) setState(() => _isValidating = false);
    }
  }

  void _showRejectionBottomSheet(BuildContext context) {
    final reasonController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withOpacity(0.5),
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => Container(
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(28),
              topRight: Radius.circular(28),
            ),
          ),
          // Adjusts for keyboard
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
          ),
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(24, 16, 24, 32),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // ── DRAG HANDLE ──
                  Center(
                    child: Container(
                      width: 40,
                      height: 4,
                      decoration: BoxDecoration(
                        color: const Color(0xFFe2e8f0),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),

                  // ── WARNING ICON ──
                  Container(
                    width: 72,
                    height: 72,
                    decoration: const BoxDecoration(
                      color: Color(0xFFfee2e2),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.error_rounded,
                      color: Color(0xFF991b1b),
                      size: 36,
                    ),
                  ),

                  const SizedBox(height: 20),

                  // ── TITLE ──
                  Text(
                    'Confirmation de rejet',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.publicSans(
                      color: const Color(0xFF1e293b),
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 10),

                  // ── SUBTITLE ──
                  Text(
                    'Veuillez spécifier le motif légal pour lequel cette demande ne peut être traitée.',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.publicSans(
                      color: const Color(0xFF64748b),
                      fontSize: 14,
                      height: 1.6,
                    ),
                  ),

                  const SizedBox(height: 28),

                  // ── FIELD LABEL ──
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'SAISIR LA RAISON DU REJET',
                      style: GoogleFonts.publicSans(
                        color: AppColors.primary,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                      ),
                    ),
                  ),

                  const SizedBox(height: 10),

                  // ── REASON TEXT FIELD ──
                  TextField(
                    controller: reasonController,
                    maxLines: 4,
                    style: GoogleFonts.publicSans(
                      color: const Color(0xFF1e293b),
                      fontSize: 14,
                    ),
                    decoration: InputDecoration(
                      hintText: 'Ex: Document d\'identité expiré ou illisible...',
                      hintStyle: GoogleFonts.publicSans(
                        color: const Color(0xFF94a3b8),
                        fontSize: 14,
                      ),
                      filled: true,
                      fillColor: const Color(0xFFf1f5f9),
                      contentPadding: const EdgeInsets.all(16),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(14),
                        borderSide: const BorderSide(
                          color: Color(0xFF991b1b),
                          width: 2,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // ── INFO BANNER ──
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: const Color(0xFFf0f4f8),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 28,
                          height: 28,
                          decoration: const BoxDecoration(
                            color: AppColors.primary,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.info_rounded,
                            color: Colors.white,
                            size: 16,
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            'Cette raison sera officiellement notifiée au citoyen via SMS et email. Assurez-vous de la clarté du message.',
                            style: GoogleFonts.publicSans(
                              color: const Color(0xFF64748b),
                              fontSize: 12,
                              height: 1.5,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),

                  // ── REJETER BUTTON ──
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton.icon(
                      onPressed: () async {
                        if (reasonController.text.trim().isEmpty) {
                          // Show error if reason is empty
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: const Text('Veuillez saisir le motif du rejet.'),
                              backgroundColor: const Color(0xFF991b1b),
                              behavior: SnackBarBehavior.floating,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                              margin: const EdgeInsets.all(16),
                            ),
                          );
                          return;
                        }
                        // Close bottom sheet
                        Navigator.pop(context);
                        // Execute rejection
                        await _rejeterDemande(reasonController.text.trim());
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF991b1b),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                        elevation: 0,
                      ),
                      icon: const Icon(
                        Icons.gavel_rounded,
                        size: 20,
                      ),
                      label: Text(
                        'Rejeter définitivement',
                        style: GoogleFonts.publicSans(
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),

                  // ── ANNULER ──
                  GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: Text(
                      'Annuler',
                      style: GoogleFonts.publicSans(
                        color: const Color(0xFF1e293b),
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _rejeterDemande(String reason) async {
    setState(() => _isValidating = true);
    try {
      await Future.delayed(const Duration(seconds: 1));
      if (!mounted) return;
      
      final demandeMap = _getDemande(context) ?? {};
      final model = DemandeModel.fromMap(demandeMap);

    // ✅ Navigate to rejection page
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (_) => AgentRejectionSuccessPage(
          demande: model,
          motifRejet: reason,
        ),
      ),
    );
    } finally {
      if (mounted) setState(() => _isValidating = false);
    }
  }
}
