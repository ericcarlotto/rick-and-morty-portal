import 'package:flutter/material.dart';
import 'package:mobile/theme/text_styles.dart';

const seasons = ['1', '2', '3', '4', '5'];

class CatalogFields {
  const CatalogFields({required this.name, required this.code, required this.season, required this.onSeason});

  final TextEditingController name;
  final TextEditingController code;
  final String season;
  final ValueChanged<String?> onSeason;
}

class CatalogForm extends StatelessWidget {
  const CatalogForm({required this.fields, super.key});

  final CatalogFields fields;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        nameField(fields.name),
        const SizedBox(height: 20),
        codeField(fields.code),
        const SizedBox(height: 20),
        seasonField(SeasonFieldData(season: fields.season, onSeason: fields.onSeason)),
        const SizedBox(height: 28),
      ],
    );
  }
}

class SeasonFieldData {
  const SeasonFieldData({required this.season, required this.onSeason});

  final String season;
  final ValueChanged<String?> onSeason;
}

Widget seasonField(SeasonFieldData data) {
  return InputDecorator(
    decoration: fieldDecoration('Temporada'),
    child: DropdownButtonHideUnderline(
      child: DropdownButton<String>(
        key: const Key('filtro-temporada'),
        value: data.season,
        isExpanded: true,
        style: bodyStyle(),
        items: seasonItems(),
        onChanged: data.onSeason,
      ),
    ),
  );
}

List<DropdownMenuItem<String>> seasonItems() {
  return [const DropdownMenuItem(value: '', child: Text('Todas')), for (final value in seasons) seasonItem(value)];
}

DropdownMenuItem<String> seasonItem(String value) {
  return DropdownMenuItem(value: value, child: Text(value));
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
