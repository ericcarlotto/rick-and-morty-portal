import 'package:flutter/material.dart';
import 'package:mobile/theme/portal_colors.dart';
import 'package:mobile/theme/text_styles.dart';

class CatalogFields {
  const CatalogFields({required this.name, required this.code});

  final TextEditingController name;
  final TextEditingController code;
}

class CatalogFormView {
  const CatalogFormView({required this.fields, required this.onFilter});

  final CatalogFields fields;
  final VoidCallback onFilter;
}

class CatalogForm extends StatelessWidget {
  const CatalogForm({required this.view, super.key});

  final CatalogFormView view;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        nameField(view.fields.name),
        const SizedBox(height: 12),
        codeField(view.fields.code),
        const SizedBox(height: 12),
        FilledButton(
          key: const Key('filtrar'),
          style: filterStyle(),
          onPressed: view.onFilter,
          child: Text('Filtrar', style: bodyStyle().copyWith(color: PortalColors.papel)),
        ),
      ],
    );
  }
}

Widget nameField(TextEditingController controller) {
  return TextField(
    key: const Key('filtro-nome'),
    controller: controller,
    style: bodyStyle(),
    decoration: fieldDecoration('Nome'),
  );
}

Widget codeField(TextEditingController controller) {
  return TextField(
    key: const Key('filtro-codigo'),
    controller: controller,
    style: bodyStyle(),
    decoration: fieldDecoration('Código'),
  );
}
