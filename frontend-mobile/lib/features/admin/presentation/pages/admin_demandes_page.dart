import 'package:egov_mobile/features/shared/presentation/widgets/egov_main_app_bar.dart';
import 'package:egov_mobile/features/shared/presentation/widgets/admin_bottom_nav.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../agent/presentation/pages/detail_demande_page.dart';
import 'admin_users_page.dart';
import 'admin_documents_page.dart';
import 'admin_home_page.dart';

// ─── Couleurs globales ──────────────────────────────────────────────────────
const _kNavy       = Color(0xFF1a237e);
const _kBg         = Color(0xFFf0f4f8);
const _kDark       = Color(0xFF1e293b);
const _kGray       = Color(0xFF94a3b8);
const _kText       = Color(0xFF475569);
const _kBorderGray = Color(0xFFe2e8f0);

// badges
const _kPendingBg  = Color(0xFFfee2e2);
const _kPendingFg  = Color(0xFF991b1b);
const _kValidBg    = Color(0xFFdcfce7);
const _kValidFg    = Color(0xFF16a34a);

// ─── Modèle léger ──────────────────────────────────────────────────────────
class _Demande {
  final String type;
  final String citoyen;
  final String reference;
  final String service;
  final String date;
  final String statut; // 'EN ATTENTE' | 'VALIDÉE' | 'REJETÉE'

  const _Demande({
    required this.type,
    required this.citoyen,
    required this.reference,
    required this.service,
    required this.date,
    required this.statut,
  });
}

// ─── Données mock ───────────────────────────────────────────────────────────
const _allDemandes = [
  _Demande(
    type: 'Acte Naissance',
    citoyen: 'Jean-Baptiste OUÉDRAOGO',
    reference: 'CDB-2026-001234',
    service: 'Mairie',
    date: '12/10/2026',
    statut: 'EN ATTENTE',
  ),
  _Demande(
    type: 'Casier Judiciaire',
    citoyen: 'Fatou DIALLO',
    reference: 'CDB-2026-001235',
    service: 'Justice',
    date: '11/10/2026',
    statut: 'VALIDÉE',
  ),
  _Demande(
    type: 'CNIB Renouvellement',
    citoyen: 'Idrissa SAWADOGO',
    reference: 'CDB-2026-001236',
    service: 'Police',
    date: '10/10/2026',
    statut: 'EN ATTENTE',
  ),
  _Demande(
    type: 'Certificat de Nationalité',
    citoyen: 'Awa KOULIBALY',
    reference: 'CDB-2026-005678',
    service: 'Justice',
    date: '09/10/2026',
    statut: 'EN ATTENTE',
  ),
  _Demande(
    type: 'Légalisation de Signature',
    citoyen: 'Issouf SAWADOGO',
    reference: 'MAI-2026-0092-P',
    service: 'Mairie',
    date: '08/10/2026',
    statut: 'VALIDÉE',
  ),
  _Demande(
    type: 'Casier Judiciaire',
    citoyen: 'Ibrahim SANOU',
    reference: 'CDB-2026-009901',
    service: 'Justice',
    date: '07/10/2026',
    statut: 'REJETÉE',
  ),
  _Demande(
    type: 'Extrait de naissance',
    citoyen: 'Paul KABRÉ',
    reference: 'MAI-2026-1122-K',
    service: 'Mairie',
    date: '06/10/2026',
    statut: 'EN ATTENTE',
  ),
  _Demande(
    type: 'Certificat de Nationalité',
    citoyen: 'Sylvie VOKOUMA',
    reference: 'JUS-2026-3344-V',
    service: 'Justice',
    date: '05/10/2026',
    statut: 'EN ATTENTE',
  ),
];

// ───────────────────────────────────────────────────────────────────────────
class AdminDemandesPage extends StatefulWidget {
  const AdminDemandesPage({super.key});

  static const routeName = '/admin-demandes';

  @override
  State<AdminDemandesPage> createState() => _AdminDemandesPageState();
}

class _AdminDemandesPageState extends State<AdminDemandesPage> {
  String _selectedService = 'Tous';
  String _selectedStatut  = 'Tout';
  String _searchQuery     = '';

  final _searchCtrl = TextEditingController();

  final _services = const ['Tous', 'Mairie', 'Justice', 'Police', 'Santé'];
  final _statuts  = const ['Tout', 'En attente', 'Validée', 'Rejetée'];

  @override
  void initState() {
    super.initState();
    _searchCtrl.addListener(() => setState(() => _searchQuery = _searchCtrl.text));
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  // ── Filtrage ──────────────────────────────────────────────────────────────
  List<_Demande> get _filtered {
    var list = List<_Demande>.from(_allDemandes);

    if (_selectedService != 'Tous') {
      list = list.where((d) =>
          d.service.toLowerCase() == _selectedService.toLowerCase()).toList();
    }

    final statutMap = {
      'En attente': 'EN ATTENTE',
      'Validée':    'VALIDÉE',
      'Rejetée':    'REJETÉE',
    };
    if (_selectedStatut != 'Tout') {
      final target = statutMap[_selectedStatut];
      list = list.where((d) => d.statut == target).toList();
    }

    if (_searchQuery.isNotEmpty) {
      final q = _searchQuery.toLowerCase();
      list = list.where((d) =>
          d.type.toLowerCase().contains(q) ||
          d.citoyen.toLowerCase().contains(q) ||
          d.reference.toLowerCase().contains(q)).toList();
    }

    return list;
  }

  int get _enAttenteCount =>
      _allDemandes.where((d) => d.statut == 'EN ATTENTE').length;

  int _countByStatut(String key) {
    final statutMap = {
      'En attente': 'EN ATTENTE',
      'Validée':    'VALIDÉE',
      'Rejetée':    'REJETÉE',
    };
    return _allDemandes.where((d) => d.statut == statutMap[key]).length;
  }

  // ── BUILD ─────────────────────────────────────────────────────────────────
  @override
  Widget build(BuildContext context) {
    final filtered = _filtered;

    return Scaffold(
      backgroundColor: _kBg,
      appBar: _appBar(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _header(filtered.length),
            _searchBar(),
            _filterSection('SERVICES ADMINISTRATIFS', _services, _selectedService,
                (v) => setState(() => _selectedService = v)),
            _filterSection('FILTRER PAR STATUT', _statuts, _selectedStatut,
                (v) => setState(() => _selectedStatut = v),
                showCounts: true),
            const SizedBox(height: 8),
            if (filtered.isEmpty)
              SizedBox(height: 300, child: _emptyState())
            else
              ListView.separated(
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                itemCount: filtered.length,
                separatorBuilder: (_, __) => const SizedBox(height: 16),
                itemBuilder: (_, i) => _RequestCard(demande: filtered[i]),
              ),
          ],
        ),
      ),
      bottomNavigationBar: const AdminBottomNav(currentIndex: 1),
    );
  }

  // ── AppBar ────────────────────────────────────────────────────────────────
  PreferredSizeWidget _appBar() {
    return const EgovMainAppBar(title: 'GESTION DES DEMANDES');
  }

  // ── Header ────────────────────────────────────────────────────────────────
  Widget _header(int total) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Gestion des Demandes',
            style: GoogleFonts.publicSans(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: _kDark,
            ),
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              Text(
                '$total demandes',
                style: GoogleFonts.publicSans(fontSize: 14, color: _kGray),
              ),
              const SizedBox(width: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: _kPendingBg,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  '$_enAttenteCount en attente',
                  style: GoogleFonts.publicSans(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: _kPendingFg,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ── Search bar ────────────────────────────────────────────────────────────
  Widget _searchBar() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      child: Container(
        height: 52,
        decoration: BoxDecoration(
          color: _kBg,
          borderRadius: BorderRadius.circular(14),
        ),
        child: TextField(
          controller: _searchCtrl,
          style: GoogleFonts.publicSans(fontSize: 14, color: _kDark),
          decoration: InputDecoration(
            hintText: 'Rechercher...',
            hintStyle: GoogleFonts.publicSans(fontSize: 14, color: _kGray),
            prefixIcon: const Padding(
              padding: EdgeInsets.only(left: 16, right: 10),
              child: Icon(Icons.search_rounded, color: _kGray, size: 22),
            ),
            prefixIconConstraints: const BoxConstraints(minWidth: 0, minHeight: 0),
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(vertical: 16),
          ),
        ),
      ),
    );
  }

  // ── Filtre générique ──────────────────────────────────────────────────────
  Widget _filterSection(
    String label,
    List<String> options,
    String current,
    void Function(String) onSelect, {
    bool showCounts = false,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 20, 16, 10),
          child: Text(
            label,
            style: GoogleFonts.publicSans(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: _kGray,
              letterSpacing: 1.2,
            ),
          ),
        ),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.only(left: 16),
          child: Row(
            children: [
              for (final opt in options)
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: _Chip(
                    label: _chipLabel(opt, showCounts),
                    active: opt == current,
                    onTap: () => onSelect(opt),
                  ),
                ),
            ],
          ),
        ),
      ],
    );
  }

  String _chipLabel(String opt, bool showCounts) {
    if (!showCounts) return opt;
    if (opt == 'Tout') return 'Tout ${_allDemandes.length}';
    final count = _countByStatut(opt);
    return '$opt $count';
  }

  // ── Empty state ───────────────────────────────────────────────────────────
  Widget _emptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.inbox_rounded, size: 64, color: Colors.grey[300]),
          const SizedBox(height: 12),
          Text(
            'Aucune demande trouvée',
            style: GoogleFonts.publicSans(fontSize: 16, color: _kGray),
          ),
        ],
      ),
    );
  }
}

// ─── Chip réutilisable ────────────────────────────────────────────────────────
class _Chip extends StatelessWidget {
  final String label;
  final bool active;
  final VoidCallback onTap;

  const _Chip({
    required this.label,
    required this.active,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        decoration: BoxDecoration(
          color: active ? _kNavy : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: active
              ? null
              : Border.all(color: _kBorderGray, width: 1.5),
        ),
        child: Text(
          label,
          style: GoogleFonts.publicSans(
            fontSize: 14,
            fontWeight: active ? FontWeight.bold : FontWeight.w500,
            color: active ? Colors.white : _kText,
          ),
        ),
      ),
    );
  }
}

// ─── Card de demande ──────────────────────────────────────────────────────────
class _RequestCard extends StatelessWidget {
  final _Demande demande;
  const _RequestCard({required this.demande});

  @override
  Widget build(BuildContext context) {
    final isEnAttente = demande.statut == 'EN ATTENTE';
    final isValidee   = demande.statut == 'VALIDÉE';

    final Color badgeBg  = isValidee ? _kValidBg  : _kPendingBg;
    final Color badgeFg  = isValidee ? _kValidFg  : _kPendingFg;
    final Color btnBg    = isEnAttente ? _kNavy
                         : isValidee  ? const Color(0xFFe2e8f0)
                                      : _kPendingBg;
    final Color btnFg    = isEnAttente ? Colors.white
                         : isValidee  ? _kText
                                      : _kPendingFg;
    final String btnText = isEnAttente ? 'Traiter'
                         : isValidee  ? 'Détails'
                                      : 'Motif';

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: const [
          BoxShadow(
            color: Color(0x0F000000),
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ROW 1 — Type + badge statut
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      demande.type,
                      style: GoogleFonts.publicSans(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: _kDark,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      demande.citoyen,
                      style: GoogleFonts.publicSans(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: _kNavy,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                decoration: BoxDecoration(
                  color: badgeBg,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  demande.statut,
                  style: GoogleFonts.publicSans(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: badgeFg,
                    letterSpacing: 0.5,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 14),

          // ROW 2 — Référence + service sur fond gris
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            decoration: BoxDecoration(
              color: _kBg,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Expanded(
                  child: _InfoCell(
                    label: 'RÉFÉRENCE',
                    value: demande.reference,
                    mono: true,
                  ),
                ),
                Expanded(
                  child: _InfoCell(
                    label: 'SERVICE',
                    value: demande.service.toUpperCase(),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 12),

          // ROW 3 — Date + bouton action
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.calendar_today_rounded,
                      size: 14, color: _kGray),
                  const SizedBox(width: 4),
                  Text(
                    demande.date,
                    style: GoogleFonts.publicSans(
                        fontSize: 13, color: _kGray),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      settings: RouteSettings(
                        arguments: {
                          'readOnly': false,
                          'isAdmin': true,
                          'id': demande.reference,
                          'citoyenId': {
                            'nom': demande.citoyen.split(' ').last,
                            'prenom': demande.citoyen.split(' ').first,
                          },
                          'documentTypeId': {
                            'nom': demande.type,
                          },
                          'status': demande.statut,
                        },
                      ),
                      builder: (_) => const AgentDetailDemandePage(),
                    ),
                  );
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 24, vertical: 10),
                  decoration: BoxDecoration(
                    color: btnBg,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    btnText,
                    style: GoogleFonts.publicSans(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: btnFg,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ─── Cellule info (RÉFÉRENCE / SERVICE) ──────────────────────────────────────
class _InfoCell extends StatelessWidget {
  final String label;
  final String value;
  final bool mono;

  const _InfoCell({
    required this.label,
    required this.value,
    this.mono = false,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.publicSans(
            fontSize: 10,
            fontWeight: FontWeight.w700,
            color: _kGray,
            letterSpacing: 0.8,
          ),
        ),
        const SizedBox(height: 4),
        mono
            ? Text(
                value,
                style: GoogleFonts.jetBrainsMono(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: _kDark,
                ),
              )
            : Text(
                value,
                style: GoogleFonts.publicSans(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: _kDark,
                ),
              ),
      ],
    );
  }
}
