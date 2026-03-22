import 'package:egov_mobile/features/shared/presentation/widgets/egov_sub_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../domain/models/document_model.dart';
import 'paiement_page.dart';

class FormulaireEtape2Page extends StatefulWidget {
  final DocumentModel document;
  final Map<String, String> etape1Data;

  const FormulaireEtape2Page({
    super.key,
    required this.document,
    required this.etape1Data,
  });

  @override
  State<FormulaireEtape2Page> createState() => _FormulaireEtape2PageState();
}

class _FormulaireEtape2PageState extends State<FormulaireEtape2Page> {
  String? _cniRectoFileName = 'cni_recto.jpg';
  bool _cniRectoUploaded = true;

  String? _cniVersoFileName;
  bool _cniVersoUploaded = false;

  String? _scanExtraitFileName;
  bool _scanExtraitUploaded = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFf0f4f8),
      appBar: const EgovSubAppBar(
        title: 'SERVICES PUBLICS',
        subtitle: 'BURKINA FASO',
      ),
      body: Column(
        children: [
          _buildStepIndicator(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHeader(),
                  const SizedBox(height: 24),
                  _buildCNISection(),
                  const SizedBox(height: 24),
                  _buildScanExtraitSection(),
                  const SizedBox(height: 32),
                  _buildBottomButtons(),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // STEP INDICATOR
  // ──────────────────────────────────────────────────────────────────
  Widget _buildStepIndicator() {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Row(
        children: [
          _buildStep(number: '1', label: 'INFOS', isActive: false, isCompleted: true),
          _buildStepLine(isActive: true),
          _buildStep(number: '2', label: 'DOCUMENTS', isActive: true, isCompleted: false),
          _buildStepLine(isActive: false),
          _buildStep(number: '3', label: 'PAIEMENT', isActive: false, isCompleted: false),
        ],
      ),
    );
  }

  Widget _buildStep({
    required String number,
    required String label,
    required bool isActive,
    required bool isCompleted,
  }) {
    return Column(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: isCompleted
                ? const Color(0xFF16a34a)
                : isActive
                    ? AppColors.primary
                    : const Color(0xFFe2e8f0),
            shape: BoxShape.circle,
          ),
          child: Center(
            child: isCompleted
                ? const Icon(Icons.check_rounded, color: Colors.white, size: 20)
                : Text(
                    number,
                    style: GoogleFonts.publicSans(
                      color: isActive ? Colors.white : const Color(0xFF94a3b8),
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          label,
          style: GoogleFonts.publicSans(
            color: isActive || isCompleted
                ? AppColors.primary
                : const Color(0xFF94a3b8),
            fontSize: 11,
            fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }

  Widget _buildStepLine({required bool isActive}) {
    return Expanded(
      child: Container(
        height: 2,
        margin: const EdgeInsets.only(bottom: 20),
        color: isActive ? AppColors.primary : const Color(0xFFe2e8f0),
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // HEADER
  // ──────────────────────────────────────────────────────────────────
  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Télécharger les documents',
          style: GoogleFonts.publicSans(
            color: const Color(0xFF1e293b),
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          'Veuillez fournir les scans originaux pour validation.',
          style: GoogleFonts.publicSans(
            color: const Color(0xFF64748b),
            fontSize: 13,
            height: 1.5,
          ),
        ),
      ],
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // CNI SECTION
  // ──────────────────────────────────────────────────────────────────
  Widget _buildCNISection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'CNI (Recto/Verso)',
          style: GoogleFonts.publicSans(
            color: const Color(0xFF1e293b),
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 12),

        // RECTO — already uploaded
        _buildUploadedFile(
          fileName: _cniRectoFileName ?? 'cni_recto.jpg',
          onDelete: () => setState(() {
            _cniRectoUploaded = false;
            _cniRectoFileName = null;
          }),
          isVisible: _cniRectoUploaded,
        ),

        if (!_cniRectoUploaded)
          _buildUploadZone(
            label: 'Ajouter le Recto de la CNI',
            hint: 'PNG, JPG ou PDF (Max. 5Mo)',
            icon: Icons.cloud_upload_rounded,
            onTap: () => setState(() {
              _cniRectoFileName = 'cni_recto.jpg';
              _cniRectoUploaded = true;
            }),
          ),

        const SizedBox(height: 10),

        // VERSO
        if (_cniVersoUploaded)
          _buildUploadedFile(
            fileName: _cniVersoFileName ?? 'cni_verso.jpg',
            onDelete: () => setState(() {
              _cniVersoUploaded = false;
              _cniVersoFileName = null;
            }),
          )
        else
          _buildUploadZone(
            label: 'Ajouter le Verso de la CNI',
            hint: 'PNG, JPG ou PDF (Max. 5Mo)',
            icon: Icons.cloud_upload_rounded,
            onTap: () => setState(() {
              _cniVersoFileName = 'cni_verso.jpg';
              _cniVersoUploaded = true;
            }),
          ),
      ],
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // SCAN EXTRAIT SECTION
  // ──────────────────────────────────────────────────────────────────
  Widget _buildScanExtraitSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Scan de l\'ancien extrait',
          style: GoogleFonts.publicSans(
            color: const Color(0xFF1e293b),
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 12),
        if (_scanExtraitUploaded)
          _buildUploadedFile(
            fileName: _scanExtraitFileName ?? 'scan_extrait.jpg',
            onDelete: () => setState(() {
              _scanExtraitUploaded = false;
              _scanExtraitFileName = null;
            }),
          )
        else
          _buildUploadZone(
            label: 'Prendre une photo ou parcourir',
            hint: '',
            icon: Icons.add_a_photo_outlined,
            onTap: () => setState(() {
              _scanExtraitFileName = 'scan_extrait.jpg';
              _scanExtraitUploaded = true;
            }),
          ),
      ],
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // UPLOADED FILE TILE
  // ──────────────────────────────────────────────────────────────────
  Widget _buildUploadedFile({
    required String fileName,
    required VoidCallback onDelete,
    bool isVisible = true,
  }) {
    if (!isVisible) return const SizedBox.shrink();

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: const Color(0xFF16a34a).withOpacity(0.3),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: const Color(0xFF16a34a).withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.image_rounded, color: Color(0xFF16a34a), size: 24),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  fileName,
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF1e293b),
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    const Icon(Icons.check_circle_rounded,
                        color: Color(0xFF16a34a), size: 14),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        'Chargé avec succès',
                        style: GoogleFonts.publicSans(
                          color: const Color(0xFF16a34a),
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.delete_outline_rounded,
                color: Color(0xFF94a3b8), size: 22),
            onPressed: onDelete,
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // UPLOAD ZONE (empty / dashed)
  // ──────────────────────────────────────────────────────────────────
  Widget _buildUploadZone({
    required String label,
    required String hint,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 20),
        decoration: BoxDecoration(
          color: const Color(0xFFf8fafc),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFFcbd5e1), width: 1.5),
        ),
        child: Column(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: const BoxDecoration(
                color: Color(0xFFe2e8f0),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: const Color(0xFF94a3b8), size: 26),
            ),
            const SizedBox(height: 12),
            Text(
              label,
              textAlign: TextAlign.center,
              style: GoogleFonts.publicSans(
                color: AppColors.primary,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
            if (hint.isNotEmpty) ...[
              const SizedBox(height: 4),
              Text(
                hint,
                textAlign: TextAlign.center,
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF94a3b8),
                  fontSize: 12,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // BOTTOM BUTTONS
  // ──────────────────────────────────────────────────────────────────
  Widget _buildBottomButtons() {
    return Row(
      children: [
        // RETOUR
        Expanded(
          flex: 1,
          child: SizedBox(
            height: 52,
            child: OutlinedButton(
              onPressed: () => Navigator.pop(context),
              style: OutlinedButton.styleFrom(
                foregroundColor: const Color(0xFF475569),
                side: const BorderSide(color: Color(0xFFcbd5e1), width: 1.5),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                backgroundColor: const Color(0xFFf1f5f9),
              ),
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.arrow_back_rounded,
                        size: 18, color: Color(0xFF475569)),
                    const SizedBox(width: 6),
                    Text(
                      'Retour',
                      style: GoogleFonts.publicSans(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                        color: const Color(0xFF475569),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        // SUIVANT
        Expanded(
          flex: 2,
          child: SizedBox(
            height: 52,
            child: ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => PaiementPage(
                      document: widget.document,
                      formData: {
                        ...widget.etape1Data,
                        'cniRecto': _cniRectoFileName,
                        'cniVerso': _cniVersoFileName,
                        'scanExtrait': _scanExtraitFileName,
                      },
                    ),
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                elevation: 0,
              ),
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Suivant',
                      style: GoogleFonts.publicSans(
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Icon(Icons.arrow_forward_rounded, size: 20),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
