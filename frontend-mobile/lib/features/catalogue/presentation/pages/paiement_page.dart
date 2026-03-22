import 'package:egov_mobile/features/shared/presentation/widgets/egov_sub_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../domain/models/document_model.dart';
import 'confirmation_page.dart';

class PaiementPage extends StatefulWidget {
  final DocumentModel document;
  final Map<String, dynamic> formData;

  const PaiementPage({
    super.key,
    required this.document,
    required this.formData,
  });

  @override
  State<PaiementPage> createState() => _PaiementPageState();
}

class _PaiementPageState extends State<PaiementPage> {
  String _selectedPayment = 'orange';
  final _phoneController = TextEditingController(text: '70 00 00 00');
  final _otpController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _phoneController.dispose();
    _otpController.dispose();
    super.dispose();
  }

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
          _buildProgressBar(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildRecapitulatif(),
                  const SizedBox(height: 16),
                  _buildModePaiement(),
                  const SizedBox(height: 16),
                  _buildPhoneField(),
                  const SizedBox(height: 16),
                  _buildOTPField(),
                  const SizedBox(height: 24),
                  _buildBottomButtons(),
                  const SizedBox(height: 16),
                  _buildSecurityNote(),
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
          _buildStep(number: '2', label: 'DOCUMENTS', isActive: false, isCompleted: true),
          _buildStepLine(isActive: true),
          _buildStep(number: '3', label: 'PAIEMENT', isActive: true, isCompleted: false),
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
  // PROGRESS BAR
  // ──────────────────────────────────────────────────────────────────
  Widget _buildProgressBar() {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.fromLTRB(24, 0, 24, 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'Étape 3: Paiement de la demande',
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF1e293b),
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Text(
                '100% complété',
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF64748b),
                  fontSize: 12,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: const LinearProgressIndicator(
              value: 1.0,
              backgroundColor: Color(0xFFe2e8f0),
              valueColor: AlwaysStoppedAnimation(AppColors.primary),
              minHeight: 6,
            ),
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // RÉCAPITULATIF
  // ──────────────────────────────────────────────────────────────────
  Widget _buildRecapitulatif() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFe2e8f0)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.receipt_outlined, color: AppColors.primary, size: 20),
              const SizedBox(width: 8),
              Text(
                'RÉCAPITULATIF',
                style: GoogleFonts.publicSans(
                  color: AppColors.primary,
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 0.8,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(color: Color(0xFFf0f4f8)),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Document',
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF94a3b8),
                  fontSize: 13,
                ),
              ),
              Flexible(
                child: Text(
                  widget.document.title,
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF1e293b),
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.right,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Référence',
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF94a3b8),
                  fontSize: 13,
                ),
              ),
              Flexible(
                child: const Text(
                  'CDB-2026-004521',
                  style: TextStyle(
                    color: Color(0xFF1e293b),
                    fontSize: 13,
                    fontFamily: 'monospace',
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(color: Color(0xFFf0f4f8)),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Total à payer',
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF1e293b),
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Flexible(
                child: Text(
                  widget.document.price,
                  style: GoogleFonts.publicSans(
                    color: AppColors.primary,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // MODE DE PAIEMENT
  // ──────────────────────────────────────────────────────────────────
  Widget _buildModePaiement() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Mode de paiement',
          style: GoogleFonts.publicSans(
            color: const Color(0xFF1e293b),
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            // Orange Money
            Expanded(
              child: GestureDetector(
                onTap: () => setState(() => _selectedPayment = 'orange'),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: _selectedPayment == 'orange'
                          ? const Color(0xFFFF6B00)
                          : const Color(0xFFe2e8f0),
                      width: _selectedPayment == 'orange' ? 2 : 1,
                    ),
                  ),
                  child: Column(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: const BoxDecoration(
                          color: Color(0xFFFF6B00),
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: Text(
                            'OM',
                            style: GoogleFonts.publicSans(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Orange Money',
                        style: GoogleFonts.publicSans(
                          color: const Color(0xFF1e293b),
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            // Moov Money
            Expanded(
              child: GestureDetector(
                onTap: () => setState(() => _selectedPayment = 'moov'),
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: _selectedPayment == 'moov'
                          ? const Color(0xFF0033A0)
                          : const Color(0xFFe2e8f0),
                      width: _selectedPayment == 'moov' ? 2 : 1,
                    ),
                  ),
                  child: Column(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: const BoxDecoration(
                          color: Color(0xFF0033A0),
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: Text(
                            'Moov',
                            style: GoogleFonts.publicSans(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Moov Money',
                        style: GoogleFonts.publicSans(
                          color: const Color(0xFF1e293b),
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // PHONE NUMBER
  // ──────────────────────────────────────────────────────────────────
  Widget _buildPhoneField() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFe2e8f0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Numéro de téléphone pour le débit',
            style: GoogleFonts.publicSans(
              color: const Color(0xFF1e293b),
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
                decoration: const BoxDecoration(
                  border: Border(right: BorderSide(color: Color(0xFFe2e8f0))),
                ),
                child: Text(
                  '+226',
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF94a3b8),
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              Expanded(
                child: TextField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF1e293b),
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                  ),
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              const Icon(Icons.check_circle_outline,
                  color: Color(0xFF94a3b8), size: 14),
              const SizedBox(width: 6),
              Text(
                _selectedPayment == 'orange'
                    ? 'Numéro Orange Money détecté'
                    : 'Numéro Moov Money détecté',
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF94a3b8),
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // OTP
  // ──────────────────────────────────────────────────────────────────
  Widget _buildOTPField() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFe2e8f0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'Code de confirmation (OTP)',
                  style: GoogleFonts.publicSans(
                    color: AppColors.primary,
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              TextButton(
                onPressed: () {},
                style: TextButton.styleFrom(
                  padding: EdgeInsets.zero,
                  minimumSize: Size.zero,
                ),
                child: Text(
                  'Renvoyer le code',
                  style: GoogleFonts.publicSans(
                    color: AppColors.primary,
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _otpController,
            keyboardType: TextInputType.number,
            maxLength: 6,
            obscureText: true,
            obscuringCharacter: '•',
            textAlign: TextAlign.center,
            style: GoogleFonts.publicSans(
              fontSize: 24,
              letterSpacing: 12,
              color: const Color(0xFF1e293b),
            ),
            decoration: InputDecoration(
              counterText: '',
              hintText: '• • • • • •',
              hintStyle: GoogleFonts.publicSans(
                color: const Color(0xFFcbd5e1),
                fontSize: 24,
                letterSpacing: 12,
              ),
              filled: true,
              fillColor: const Color(0xFFf8fafc),
              contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: Color(0xFFe2e8f0)),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: Color(0xFFe2e8f0)),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: AppColors.primary, width: 2),
              ),
            ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(Icons.info_outline_rounded,
                  color: Color(0xFF94a3b8), size: 14),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  'Saisissez le code à 6 chiffres reçu par SMS pour valider la transaction.',
                  style: GoogleFonts.publicSans(
                    color: const Color(0xFF94a3b8),
                    fontSize: 11,
                    height: 1.4,
                  ),
                ),
              ),
            ],
          ),
        ],
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
            height: 56,
            child: OutlinedButton(
              onPressed: () => Navigator.pop(context),
              style: OutlinedButton.styleFrom(
                backgroundColor: const Color(0xFFf1f5f9),
                foregroundColor: const Color(0xFF475569),
                side: const BorderSide(color: Color(0xFFcbd5e1)),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.arrow_back_rounded, size: 18),
                    const SizedBox(width: 6),
                    Text(
                      'Retour',
                      style: GoogleFonts.publicSans(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        // CONFIRMER
        Expanded(
          flex: 2,
          child: SizedBox(
            height: 56,
            child: ElevatedButton(
              onPressed: _isLoading
                  ? null
                  : () async {
                      setState(() => _isLoading = true);
                      await Future.delayed(const Duration(seconds: 2));
                      if (!mounted) return;
                      setState(() => _isLoading = false);
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (_) => ConfirmationPage(
                            document: widget.document,
                            reference: 'CDB-2026-004521',
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
              child: _isLoading
                  ? const SizedBox(
                      width: 22,
                      height: 22,
                      child: CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 2,
                      ),
                    )
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Expanded(
                          child: Text(
                            'Confirmer le\npaiement',
                            textAlign: TextAlign.center,
                            style: GoogleFonts.publicSans(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                              height: 1.2,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        const SizedBox(width: 8),
                        const Icon(Icons.verified_rounded, size: 18),
                      ],
                    ),
            ),
          ),
        ),
      ],
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // SECURITY NOTE
  // ──────────────────────────────────────────────────────────────────
  Widget _buildSecurityNote() {
    return Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.shield_outlined,
              color: Color(0xFF94a3b8), size: 14),
          const SizedBox(width: 6),
          Text(
            'TRANSACTION SÉCURISÉE PAR LE TRÉSOR PUBLIC',
            style: GoogleFonts.publicSans(
              color: const Color(0xFF94a3b8),
              fontSize: 10,
              letterSpacing: 0.5,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
