import 'package:flutter/material.dart';
import 'package:mobile/theme/text_styles.dart';

class CastNameFilter extends StatelessWidget {
  const CastNameFilter({required this.controller, super.key});

  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return TextField(
      key: const Key('filtro-elenco'),
      controller: controller,
      style: bodyStyle(),
      decoration: fieldDecoration('Nome'),
    );
  }
}
