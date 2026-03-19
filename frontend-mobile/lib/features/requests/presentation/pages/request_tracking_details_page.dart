import 'package:flutter/material.dart';

class RequestTrackingDetailsPage extends StatelessWidget {
  const RequestTrackingDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Détails du Suivi")),
      body: const Center(child: Text("Détails du suivi de la demande")),
    );
  }
}
