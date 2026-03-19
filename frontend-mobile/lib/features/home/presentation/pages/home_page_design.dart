import 'package:flutter/material.dart';

class HomePageSimple extends StatelessWidget {
  const HomePageSimple({super.key});

  static const routeName = '/home-design';

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text("Home Page Design")),
    );
  }
}
