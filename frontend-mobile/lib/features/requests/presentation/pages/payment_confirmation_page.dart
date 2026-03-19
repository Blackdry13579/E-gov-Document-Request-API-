import 'package:flutter/material.dart';

class PaymentConfirmationPage extends StatelessWidget {
  final String reference;
  final String date;
  final String serviceType;

  const PaymentConfirmationPage({
    super.key,
    required this.reference,
    required this.date,
    required this.serviceType,
  });

  static const routeName = '/payment-confirmation';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Confirmation de Paiement")),
      body: Center(child: Text("Paiement pour $serviceType (Ref: $reference)")),
    );
  }
}
