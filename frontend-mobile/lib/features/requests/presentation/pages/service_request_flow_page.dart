import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../shared/presentation/widgets/egov_app_bar.dart';
import 'payment_confirmation_page.dart';

class ServiceRequestFlowPage extends StatefulWidget {
  const ServiceRequestFlowPage({super.key});

  static const routeName = '/service-request-flow';

  @override
  State<ServiceRequestFlowPage> createState() => _ServiceRequestFlowPageState();
}

class _ServiceRequestFlowPageState extends State<ServiceRequestFlowPage> {
  int _step = 0; // 0=Infos, 1=Documents, 2=Paiement (captures)
  int _paymentMethod = 0; // 0=OM, 1=Moov

  final _birthNameCtrl = TextEditingController();
  final _firstNamesCtrl = TextEditingController();
  final _birthDateCtrl = TextEditingController();
  final _birthPlaceCtrl = TextEditingController();
  final _fatherNameCtrl = TextEditingController();
  final _motherNameCtrl = TextEditingController();
  final _phoneCtrl = TextEditingController(text: '+226 70 00 00 00');
  final _otpCtrl = TextEditingController();

  @override
  void dispose() {
    _birthNameCtrl.dispose();
    _firstNamesCtrl.dispose();
    _birthDateCtrl.dispose();
    _birthPlaceCtrl.dispose();
    _fatherNameCtrl.dispose();
    _motherNameCtrl.dispose();
    _phoneCtrl.dispose();
    _otpCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    String? title;
    Widget? trailing;

    if (_step == 0) {
      title = 'Étape 1: Informations Personnelles';
      trailing = Text(
        '33% complété',
        style: GoogleFonts.outfit(
          fontSize: 10.5,
          fontWeight: FontWeight.w700,
          color: AppColors.textLight,
        ),
      );
    } else if (_step == 1) {
      title = 'Étape 2: Téléversement des documents';
      trailing = Text(
        '66% complété',
        style: GoogleFonts.outfit(
          fontSize: 10.5,
          fontWeight: FontWeight.w700,
          color: AppColors.textLight,
        ),
      );
    } else if (_step == 2) {
      title = 'Étape 3: Paiement de la demande';
      trailing = Text(
        '100% complété',
        style: GoogleFonts.outfit(
          fontSize: 10.5,
          fontWeight: FontWeight.w700,
          color: AppColors.textLight,
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: EgovAppBar(
        backgroundColor: AppColors.cardBg,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.primary, size: 18),
          onPressed: () => Navigator.of(context).maybePop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.more_vert_rounded, color: AppColors.textLight),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: Stack(
          children: [
            Column(
              children: [
                const SizedBox(height: 10),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: _StepHeader(
                    step: _step,
                    title: title,
                    trailing: trailing,
                  ),
                ),
                const SizedBox(height: 10),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 110),
                    child: _buildStepBody(),
                  ),
                ),
              ],
            ),
            Positioned(
              right: 16,
              bottom: 92,
              child: _HelpFab(onTap: () {}),
            ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 10, 16, 12),
          child: _buildBottomActions(),
        ),
      ),
    );
  }

  Widget _buildStepBody() {
    switch (_step) {
      case 0:
        return _InfosStep(
          birthNameCtrl: _birthNameCtrl,
          firstNamesCtrl: _firstNamesCtrl,
          birthDateCtrl: _birthDateCtrl,
          birthPlaceCtrl: _birthPlaceCtrl,
          fatherNameCtrl: _fatherNameCtrl,
          motherNameCtrl: _motherNameCtrl,
          onPickDate: () async {
            final now = DateTime.now();
            final initial = DateTime(now.year - 25, now.month, now.day);
            final picked = await showDatePicker(
              context: context,
              initialDate: initial,
              firstDate: DateTime(1900),
              lastDate: now,
            );
            if (picked != null) {
              setState(() {
                _birthDateCtrl.text =
                    '${picked.day.toString().padLeft(2, '0')}/${picked.month.toString().padLeft(2, '0')}/${picked.year}';
              });
            }
          },
        );
      case 1:
        return const _DocumentsStep();
      case 2:
      default:
        return _PaymentStep(
          paymentMethod: _paymentMethod,
          onPaymentMethodChanged: (v) => setState(() => _paymentMethod = v),
          phoneCtrl: _phoneCtrl,
          otpCtrl: _otpCtrl,
          onResendOtp: () {},
        );
    }
  }

  Widget _buildBottomActions() {
    if (_step == 2) {
      return Row(
        children: [
          Expanded(
            child: _SecondaryButton(
              label: 'Retour',
              icon: Icons.arrow_back_rounded,
              onPressed: () => setState(() => _step = 1),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: _PrimaryButton(
              label: 'Confirmer le\npaiement',
              icon: Icons.check_circle_outline_rounded,
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => const PaymentConfirmationPage(
                      reference: 'CDB-2026-482917',
                      date: '24 Mai 2024 - 14:32',
                      serviceType: 'Renouvellement de titre sécurisé',
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      );
    }

    return Row(
      children: [
        Expanded(
          child: _SecondaryButton(
            label: 'Retour',
            icon: Icons.arrow_back_rounded,
            onPressed: () {
              if (_step == 0) {
                Navigator.of(context).maybePop();
              } else {
                setState(() => _step = _step - 1);
              }
            },
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _PrimaryButton(
            label: 'Suivant',
            icon: Icons.arrow_forward_rounded,
            onPressed: () => setState(() => _step = (_step + 1).clamp(0, 2)),
          ),
        ),
      ],
    );
  }
}


class _StepHeader extends StatelessWidget {
  final int step;
  final String? title;
  final Widget? trailing;

  const _StepHeader({
    required this.step,
    required this.title,
    required this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _StepIndicator(step: step),
        if (title != null) ...[
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: Text(
                  title!,
                  style: GoogleFonts.outfit(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w900,
                    color: AppColors.textDark,
                  ),
                ),
              ),
              if (trailing != null) trailing!,
            ],
          ),
          const SizedBox(height: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: const LinearProgressIndicator(
              value: 1,
              minHeight: 5,
              backgroundColor: AppColors.divider,
              valueColor: AlwaysStoppedAnimation(AppColors.primary),
            ),
          ),
          const SizedBox(height: 18),
        ],
      ],
    );
  }
}

class _StepIndicator extends StatelessWidget {
  final int step;
  const _StepIndicator({required this.step});

  @override
  Widget build(BuildContext context) {
    Widget circle({
      required Widget child,
      required bool active,
      required bool done,
    }) {
      final bg = done || active ? AppColors.primary : AppColors.sectionBg;
      final fg = done || active ? AppColors.white : AppColors.textLight;
      return Container(
        width: 34,
        height: 34,
        decoration: BoxDecoration(
          color: bg,
          shape: BoxShape.circle,
          border: Border.all(
            color: done || active ? AppColors.primary : AppColors.divider,
            width: 1,
          ),
        ),
        alignment: Alignment.center,
        child: IconTheme(
          data: IconThemeData(color: fg, size: 18),
          child: child,
        ),
      );
    }

    Widget label(String s, bool active) {
      return Text(
        s,
        style: GoogleFonts.outfit(
          fontSize: 10,
          fontWeight: FontWeight.w900,
          letterSpacing: 0.7,
          color: active ? AppColors.primary : AppColors.textLight,
        ),
      );
    }

    return Column(
      children: [
        Row(
          children: [
            circle(
              child: step > 0 ? const Icon(Icons.check_rounded) : const Icon(Icons.info_outline_rounded),
              active: step == 0,
              done: step > 0,
            ),
            Expanded(
              child: Container(
                height: 2,
                margin: const EdgeInsets.symmetric(horizontal: 8),
                color: step > 0 ? AppColors.primary : AppColors.divider,
              ),
            ),
            circle(
              child: step > 1 ? const Icon(Icons.check_rounded) : const Icon(Icons.folder_outlined),
              active: step == 1,
              done: step > 1,
            ),
            Expanded(
              child: Container(
                height: 2,
                margin: const EdgeInsets.symmetric(horizontal: 8),
                color: step > 1 ? AppColors.primary : AppColors.divider,
              ),
            ),
            circle(
              child: const Icon(Icons.credit_card_rounded),
              active: step == 2,
              done: false,
            ),
          ],
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            label('INFOS', step == 0),
            label('DOCUMENTS', step == 1),
            label('PAIEMENT', step == 2),
          ],
        ),
      ],
    );
  }
}

class _DocumentsStep extends StatelessWidget {
  const _DocumentsStep();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Télécharger les documents',
          style: GoogleFonts.outfit(
            fontSize: 20,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Veuillez fournir les scans originaux pour validation.',
          style: GoogleFonts.outfit(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: AppColors.textLight,
          ),
        ),
        const SizedBox(height: 18),
        Text(
          'CNI (Recto/Verso)',
          style: GoogleFonts.outfit(
            fontSize: 12.5,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 10),
        const _UploadedFileTile(
          filename: 'cni_recto.jpg',
          statusText: 'Chargé avec succès',
        ),
        const SizedBox(height: 12),
        const _DashedUploadCard(
          icon: Icons.cloud_upload_outlined,
          title: 'Ajouter le Verso de la CNI',
          subtitle: 'PNG, JPG ou PDF (Max. 5Mo)',
        ),
        const SizedBox(height: 18),
        Text(
          "Scan de l'ancien extrait",
          style: GoogleFonts.outfit(
            fontSize: 12.5,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 10),
        const _DashedUploadCard(
          icon: Icons.add_a_photo_outlined,
          title: 'Prendre une photo ou parcourir',
          subtitle: '',
        ),
      ],
    );
  }
}

class _PaymentStep extends StatelessWidget {
  final int paymentMethod;
  final ValueChanged<int> onPaymentMethodChanged;
  final TextEditingController phoneCtrl;
  final TextEditingController otpCtrl;
  final VoidCallback onResendOtp;

  const _PaymentStep({
    required this.paymentMethod,
    required this.onPaymentMethodChanged,
    required this.phoneCtrl,
    required this.otpCtrl,
    required this.onResendOtp,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _RecapCard(),
        const SizedBox(height: 16),
        Text(
          'Mode de paiement',
          style: GoogleFonts.outfit(
            fontSize: 12.5,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              child: _PaymentMethodCard(
                selected: paymentMethod == 0,
                label: 'Orange Money',
                badge: 'OM',
                badgeColor: const Color(0xFFF97316),
                onTap: () => onPaymentMethodChanged(0),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _PaymentMethodCard(
                selected: paymentMethod == 1,
                label: 'Moov Money',
                badge: 'Moov',
                badgeColor: const Color(0xFF2563EB),
                onTap: () => onPaymentMethodChanged(1),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          'Numéro de téléphone pour le débit',
          style: GoogleFonts.outfit(
            fontSize: 12.5,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 10),
        _SimpleField(
          controller: phoneCtrl,
          prefixText: '',
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            const Icon(Icons.check_circle_rounded, size: 14, color: Color(0xFF22C55E)),
            const SizedBox(width: 6),
            Text(
              'Numéro Orange Money détecté',
              style: GoogleFonts.outfit(
                fontSize: 10.5,
                fontWeight: FontWeight.w700,
                color: AppColors.textLight,
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        Row(
          children: [
            Expanded(
              child: Text(
                'Code de confirmation (OTP)',
                style: GoogleFonts.outfit(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textDark,
                ),
              ),
            ),
            GestureDetector(
              onTap: onResendOtp,
              child: Text(
                'Renvoyer le code',
                style: GoogleFonts.outfit(
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  color: AppColors.primary,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
        _OtpField(controller: otpCtrl),
        const SizedBox(height: 10),
        Row(
          children: [
            const Icon(Icons.info_outline_rounded, size: 14, color: AppColors.textLight),
            const SizedBox(width: 6),
            Expanded(
              child: Text(
                'Saisissez le code à 6 chiffres reçu par SMS pour valider\nla transaction.',
                style: GoogleFonts.outfit(
                  fontSize: 10.5,
                  height: 1.35,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textLight,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Center(
          child: Text(
            'TRANSACTION SÉCURISÉE PAR LE TRÉSOR PUBLIC',
            style: GoogleFonts.outfit(
              fontSize: 9,
              fontWeight: FontWeight.w900,
              letterSpacing: 0.6,
              color: AppColors.divider.withValues(alpha: 0.9),
            ),
          ),
        ),
      ],
    );
  }
}

class _RecapCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(14, 14, 14, 14),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.divider),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.receipt_long_rounded, color: AppColors.primary, size: 18),
              const SizedBox(width: 8),
              Text(
                'RÉCAPITULATIF',
                style: GoogleFonts.outfit(
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.7,
                  color: AppColors.textDark,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const _RecapRow(label: 'Document', value: "Extrait d'Acte de Naissance"),
          const SizedBox(height: 8),
          const _RecapRow(label: 'Référence', value: 'CDB-2026-004521'),
          const SizedBox(height: 12),
          Divider(color: AppColors.divider.withValues(alpha: 0.9)),
          const SizedBox(height: 10),
          Row(
            children: [
              Text(
                'Total à payer',
                style: GoogleFonts.outfit(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textDark,
                ),
              ),
              const Spacer(),
              Text(
                '500 FCFA',
                style: GoogleFonts.outfit(
                  fontSize: 16,
                  fontWeight: FontWeight.w900,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _RecapRow extends StatelessWidget {
  final String label;
  final String value;
  const _RecapRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 78,
          child: Text(
            label,
            style: GoogleFonts.outfit(
              fontSize: 11.5,
              fontWeight: FontWeight.w700,
              color: AppColors.textLight,
            ),
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: GoogleFonts.outfit(
              fontSize: 11.5,
              fontWeight: FontWeight.w900,
              color: AppColors.textDark,
            ),
          ),
        ),
      ],
    );
  }
}

class _PaymentMethodCard extends StatelessWidget {
  final bool selected;
  final String label;
  final String badge;
  final Color badgeColor;
  final VoidCallback onTap;

  const _PaymentMethodCard({
    required this.selected,
    required this.label,
    required this.badge,
    required this.badgeColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 86,
        decoration: BoxDecoration(
          color: AppColors.cardBg,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: selected ? const Color(0xFFF97316) : AppColors.divider,
            width: selected ? 1.8 : 1,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 44,
              height: 28,
              decoration: BoxDecoration(
                color: badgeColor,
                borderRadius: BorderRadius.circular(999),
              ),
              alignment: Alignment.center,
              child: Text(
                badge,
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  fontWeight: FontWeight.w900,
                  color: AppColors.white,
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontSize: 11.5,
                fontWeight: FontWeight.w800,
                color: AppColors.textDark,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SimpleField extends StatelessWidget {
  final TextEditingController controller;
  final String prefixText;

  const _SimpleField({required this.controller, required this.prefixText});

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      style: GoogleFonts.outfit(
        fontSize: 18,
        fontWeight: FontWeight.w900,
        color: AppColors.textDark,
      ),
      decoration: InputDecoration(
        prefixText: prefixText,
        filled: true,
        fillColor: AppColors.cardBg,
        contentPadding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: AppColors.divider.withValues(alpha: 0.9)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: AppColors.primary, width: 1.4),
        ),
      ),
    );
  }
}

class _OtpField extends StatelessWidget {
  final TextEditingController controller;
  const _OtpField({required this.controller});

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      keyboardType: TextInputType.number,
      textAlign: TextAlign.center,
      style: GoogleFonts.outfit(
        fontSize: 18,
        fontWeight: FontWeight.w900,
        letterSpacing: 6,
        color: AppColors.textDark,
      ),
      decoration: InputDecoration(
        hintText: '······',
        hintStyle: GoogleFonts.outfit(
          fontSize: 18,
          fontWeight: FontWeight.w900,
          letterSpacing: 6,
          color: AppColors.textLight.withValues(alpha: 0.5),
        ),
        filled: true,
        fillColor: AppColors.cardBg,
        contentPadding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: AppColors.divider.withValues(alpha: 0.9)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: AppColors.primary, width: 1.4),
        ),
      ),
    );
  }
}

class _UploadedFileTile extends StatelessWidget {
  final String filename;
  final String statusText;

  const _UploadedFileTile({
    required this.filename,
    required this.statusText,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(12, 12, 8, 12),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.divider),
      ),
      child: Row(
        children: [
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: const Color(0xFFDCFCE7),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(
              Icons.image_outlined,
              color: Color(0xFF166534),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  filename,
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    fontWeight: FontWeight.w900,
                    color: AppColors.textDark,
                  ),
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    const Icon(Icons.check_circle_rounded,
                        size: 14, color: Color(0xFF22C55E)),
                    const SizedBox(width: 6),
                    Text(
                      statusText,
                      style: GoogleFonts.outfit(
                        fontSize: 10.5,
                        fontWeight: FontWeight.w800,
                        color: const Color(0xFF16A34A),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.delete_outline_rounded),
            color: AppColors.textLight,
          ),
        ],
      ),
    );
  }
}

class _DashedUploadCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _DashedUploadCard({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(14, 18, 14, 18),
      decoration: BoxDecoration(
        color: AppColors.sectionBg.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: AppColors.divider,
          width: 2,
          style: BorderStyle.solid,
        ),
      ),
      child: Column(
        children: [
          Container(
            width: 46,
            height: 46,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.divider),
            ),
            child: Icon(icon, color: AppColors.primary),
          ),
          const SizedBox(height: 12),
          Text(
            title,
            textAlign: TextAlign.center,
            style: GoogleFonts.outfit(
              fontSize: 12,
              fontWeight: FontWeight.w900,
              color: AppColors.primary,
            ),
          ),
          if (subtitle.isNotEmpty) ...[
            const SizedBox(height: 6),
            Text(
              subtitle,
              textAlign: TextAlign.center,
              style: GoogleFonts.outfit(
                fontSize: 10.5,
                fontWeight: FontWeight.w700,
                color: AppColors.textLight,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _HelpFab extends StatelessWidget {
  final VoidCallback onTap;
  const _HelpFab({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(999),
      child: Container(
        width: 52,
        height: 52,
        decoration: BoxDecoration(
          color: AppColors.primary,
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: AppColors.primary.withValues(alpha: 0.35),
              blurRadius: 16,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: const Icon(Icons.headset_mic_rounded, color: AppColors.white),
      ),
    );
  }
}

class _PrimaryButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  const _PrimaryButton({
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 56,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          elevation: 10,
          shadowColor: AppColors.primary.withValues(alpha: 0.35),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Flexible(
              child: Text(
                label,
                textAlign: TextAlign.center,
                style: GoogleFonts.outfit(
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.4,
                  fontSize: 12.5,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Icon(icon, size: 18),
          ],
        ),
      ),
    );
  }
}

class _SecondaryButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onPressed;

  const _SecondaryButton({
    required this.label,
    required this.icon,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 56,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.sectionBg,
          foregroundColor: AppColors.primary,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 18),
            const SizedBox(width: 10),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontWeight: FontWeight.w900,
                fontSize: 12.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _InfosStep extends StatelessWidget {
  final TextEditingController birthNameCtrl;
  final TextEditingController firstNamesCtrl;
  final TextEditingController birthDateCtrl;
  final TextEditingController birthPlaceCtrl;
  final TextEditingController fatherNameCtrl;
  final TextEditingController motherNameCtrl;
  final VoidCallback onPickDate;

  const _InfosStep({
    required this.birthNameCtrl,
    required this.firstNamesCtrl,
    required this.birthDateCtrl,
    required this.birthPlaceCtrl,
    required this.fatherNameCtrl,
    required this.motherNameCtrl,
    required this.onPickDate,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Étape 1: Informations Personnelles',
          style: GoogleFonts.outfit(
            fontSize: 20,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Renseignez les informations figurant sur votre acte de naissance.',
          style: GoogleFonts.outfit(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: AppColors.textLight,
          ),
        ),
        const SizedBox(height: 18),
        _LabeledTextField(
          label: 'Nom de naissance',
          hint: 'Entrez votre nom',
          controller: birthNameCtrl,
        ),
        const SizedBox(height: 14),
        _LabeledTextField(
          label: 'Prénom(s)',
          hint: 'Entrez vos prénoms',
          controller: firstNamesCtrl,
        ),
        const SizedBox(height: 14),
        _DateField(
          label: 'Date de naissance',
          hint: 'JJ/MM/AAAA',
          controller: birthDateCtrl,
          onTap: onPickDate,
        ),
        const SizedBox(height: 14),
        _LabeledTextField(
          label: 'Lieu de naissance',
          hint: 'Ville ou commune',
          controller: birthPlaceCtrl,
        ),
        const SizedBox(height: 14),
        _LabeledTextField(
          label: 'Nom du père',
          hint: 'Nom complet du père',
          controller: fatherNameCtrl,
        ),
        const SizedBox(height: 14),
        _LabeledTextField(
          label: 'Nom de la mère',
          hint: 'Nom complet de la mère',
          controller: motherNameCtrl,
        ),
      ],
    );
  }
}

class _LabeledTextField extends StatelessWidget {
  final String label;
  final String hint;
  final TextEditingController controller;

  const _LabeledTextField({
    required this.label,
    required this.hint,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.outfit(
            fontSize: 12.5,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          style: GoogleFonts.outfit(
            fontSize: 13.5,
            fontWeight: FontWeight.w700,
            color: AppColors.textDark,
          ),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: GoogleFonts.outfit(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppColors.textLight,
            ),
            filled: true,
            fillColor: AppColors.cardBg,
            contentPadding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(18),
              borderSide: BorderSide(color: AppColors.divider.withValues(alpha: 0.9)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(18),
              borderSide: const BorderSide(color: AppColors.primary, width: 1.4),
            ),
          ),
        ),
      ],
    );
  }
}

class _DateField extends StatelessWidget {
  final String label;
  final String hint;
  final TextEditingController controller;
  final VoidCallback onTap;

  const _DateField({
    required this.label,
    required this.hint,
    required this.controller,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.outfit(
            fontSize: 12.5,
            fontWeight: FontWeight.w900,
            color: AppColors.textDark,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          readOnly: true,
          style: GoogleFonts.outfit(
            fontSize: 13.5,
            fontWeight: FontWeight.w700,
            color: AppColors.textDark,
          ),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: GoogleFonts.outfit(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppColors.textLight,
            ),
            filled: true,
            fillColor: AppColors.cardBg,
            contentPadding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
            suffixIcon: IconButton(
              icon: const Icon(Icons.calendar_today_rounded, size: 18, color: AppColors.textLight),
              onPressed: onTap,
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(18),
              borderSide: BorderSide(color: AppColors.divider.withValues(alpha: 0.9)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(18),
              borderSide: const BorderSide(color: AppColors.primary, width: 1.4),
            ),
          ),
          onTap: onTap,
        ),
      ],
    );
  }
}

