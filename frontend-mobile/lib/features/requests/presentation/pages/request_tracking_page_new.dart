import 'package:flutter/material.dart';

class RequestTrackingPageNew extends StatelessWidget {
  const RequestTrackingPageNew({super.key});

  static const routeName = '/request-tracking-new';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Suivi des Demandes")),
      body: const Center(child: Text("Suivi des demandes")),
    );
  }
}
