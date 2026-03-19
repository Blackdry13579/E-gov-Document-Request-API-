import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../shared/presentation/widgets/egov_app_bar.dart';
import '../../../shared/presentation/widgets/citizen_bottom_nav.dart';
import '../../domain/models/document_model.dart';
import 'detail_document_page.dart';

class CataloguePage extends StatefulWidget {
  const CataloguePage({super.key});

  static const routeName = '/catalogue';

  @override
  State<CataloguePage> createState() => _CataloguePageState();
}

class _CataloguePageState extends State<CataloguePage> {
  String _selectedFilter = 'Tout';
  final TextEditingController _searchController = TextEditingController();

  final List<String> _filters = [
    'Tout',
    'Identité',
    'État Civil',
    'Justice',
    'Transport',
    'Santé',
  ];

  final List<DocumentModel> _documents = const [
    DocumentModel(
      id: '1',
      title: 'CNIB (Renouvellement)',
      description: 'Carte Nationale d\'Identité Burkinabè',
      price: '2 500 FCFA',
      delivery: 'En ligne',
      deliveryIcon: Icons.devices_outlined,
      status: 'DISPONIBLE',
      icon: Icons.badge_outlined,
      category: 'Identité',
    ),
    DocumentModel(
      id: '2',
      title: 'Extrait d\'Acte de Naissance',
      description: 'Copie intégrale ou extrait simple',
      price: '500 FCFA',
      delivery: 'Mobile',
      deliveryIcon: Icons.smartphone_outlined,
      status: 'INSTANTANÉ',
      icon: Icons.history_edu_outlined,
      category: 'État Civil',
    ),
    DocumentModel(
      id: '3',
      title: 'Casier Judiciaire',
      description: 'Bulletin N°3 pour usage administratif',
      price: '1 000 FCFA',
      delivery: 'Email / Retrait',
      deliveryIcon: Icons.mail_outlined,
      status: '48H DÉLAI',
      icon: Icons.gavel_outlined,
      category: 'Justice',
    ),
    DocumentModel(
      id: '4',
      title: 'Permis de Conduire',
      description: 'Duplicata ou renouvellement biométrique',
      price: '15 000 FCFA',
      delivery: 'Retrait Guichet',
      deliveryIcon: Icons.location_on_outlined,
      status: 'NOUVEAU',
      icon: Icons.directions_car_outlined,
      category: 'Transport',
    ),
  ];

  List<DocumentModel> get _filteredDocuments {
    final query = _searchController.text.toLowerCase();
    return _documents.where((doc) {
      final matchesFilter =
          _selectedFilter == 'Tout' || doc.category == _selectedFilter;
      final matchesSearch = query.isEmpty ||
          doc.title.toLowerCase().contains(query) ||
          doc.description.toLowerCase().contains(query);
      return matchesFilter && matchesSearch;
    }).toList();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const EgovAppBar(
        title: 'PORTAIL OFFICIEL',
        automaticallyImplyLeading: false,
      ),
      body: Column(
        children: [
          _buildSearchBar(),
          _buildFilterChips(),
          _buildSectionTitle(),
          Expanded(child: _buildDocumentList()),
        ],
      ),
      bottomNavigationBar: const CitizenBottomNav(currentIndex: 1),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // SEARCH BAR
  // ──────────────────────────────────────────────────────────────────
  Widget _buildSearchBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Container(
        height: 48,
        decoration: BoxDecoration(
          color: const Color(0xFFf1f5f9),
          borderRadius: BorderRadius.circular(12),
        ),
        child: TextField(
          controller: _searchController,
          onChanged: (value) => setState(() {}),
          decoration: InputDecoration(
            hintText: 'Rechercher un document ou service...',
            hintStyle: GoogleFonts.publicSans(
              color: const Color(0xFF94a3b8),
              fontSize: 14,
            ),
            prefixIcon: const Icon(
              Icons.search_rounded,
              color: Color(0xFF94a3b8),
              size: 22,
            ),
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(vertical: 14),
          ),
        ),
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // FILTER CHIPS
  // ──────────────────────────────────────────────────────────────────
  Widget _buildFilterChips() {
    return SizedBox(
      height: 44,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        children: _filters.map((filter) {
          final isSelected = _selectedFilter == filter;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: GestureDetector(
              onTap: () => setState(() => _selectedFilter = filter),
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 10,
                ),
                decoration: BoxDecoration(
                  color: isSelected ? AppColors.primary : Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isSelected
                        ? AppColors.primary
                        : const Color(0xFFe2e8f0),
                    width: 1.5,
                  ),
                ),
                child: Text(
                  filter,
                  style: GoogleFonts.publicSans(
                    color: isSelected
                        ? Colors.white
                        : const Color(0xFF64748b),
                    fontSize: 13,
                    fontWeight:
                        isSelected ? FontWeight.bold : FontWeight.w500,
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // SECTION TITLE
  // ──────────────────────────────────────────────────────────────────
  Widget _buildSectionTitle() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 12),
      child: Row(
        children: [
          const Icon(
            Icons.description_outlined,
            color: AppColors.primary,
            size: 22,
          ),
          const SizedBox(width: 8),
          Text(
            'Documents Populaires',
            style: GoogleFonts.publicSans(
              color: const Color(0xFF1e293b),
              fontSize: 17,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // DOCUMENT LIST
  // ──────────────────────────────────────────────────────────────────
  Widget _buildDocumentList() {
    final docs = _filteredDocuments;

    if (docs.isEmpty) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.search_off_rounded,
                size: 48, color: AppColors.primary.withValues(alpha: 0.3)),
            const SizedBox(height: 12),
            Text(
              'Aucun document trouvé',
              style: GoogleFonts.publicSans(
                color: const Color(0xFF94a3b8),
                fontSize: 14,
              ),
            ),
          ],
        ),
      );
    }

    return ListView.separated(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      itemCount: docs.length,
      separatorBuilder: (_, __) => const SizedBox(height: 16),
      itemBuilder: (context, index) => _buildDocumentCard(docs[index]),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // DOCUMENT CARD
  // ──────────────────────────────────────────────────────────────────
  Widget _buildDocumentCard(DocumentModel doc) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: const Color(0xFFe2e8f0),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --- Top row: icon + badge ---
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withValues(alpha: 0.08),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    doc.icon,
                    color: AppColors.primary,
                    size: 28,
                  ),
                ),
                _buildStatusBadge(doc.status),
              ],
            ),
            const SizedBox(height: 14),

            // --- Title ---
            Text(
              doc.title,
              style: GoogleFonts.publicSans(
                color: const Color(0xFF1e293b),
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),

            // --- Description ---
            Text(
              doc.description,
              style: GoogleFonts.publicSans(
                color: const Color(0xFF64748b),
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 12),

            // --- Price + delivery ---
            Row(
              children: [
                const Icon(Icons.payments_outlined,
                    color: AppColors.primary, size: 16),
                const SizedBox(width: 4),
                Text(
                  doc.price,
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF1e293b),
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(width: 16),
                Icon(doc.deliveryIcon,
                    color: AppColors.primary, size: 16),
                const SizedBox(width: 4),
                Text(
                  doc.delivery,
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF1e293b),
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // --- Demander button ---
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => DetailDocumentPage(document: doc),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  elevation: 0,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Demander',
                      style: GoogleFonts.publicSans(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Icon(Icons.arrow_forward_rounded, size: 18),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // STATUS BADGE
  // ──────────────────────────────────────────────────────────────────
  Widget _buildStatusBadge(String status) {
    Color textColor;
    Color bgColor;

    switch (status) {
      case 'DISPONIBLE':
        textColor = const Color(0xFF16a34a);
        bgColor = const Color(0xFFdcfce7);
        break;
      case 'INSTANTANÉ':
        textColor = const Color(0xFF16a34a);
        bgColor = const Color(0xFFdcfce7);
        break;
      case '48H DÉLAI':
        textColor = const Color(0xFFd97706);
        bgColor = const Color(0xFFfef3c7);
        break;
      case 'NOUVEAU':
        textColor = const Color(0xFF16a34a);
        bgColor = const Color(0xFFdcfce7);
        break;
      default:
        textColor = const Color(0xFF64748b);
        bgColor = const Color(0xFFf1f5f9);
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        status,
        style: GoogleFonts.publicSans(
          color: textColor,
          fontSize: 10,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}
