import 'package:flutter/material.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/theme/status_color.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/chrome.dart';

class DetailPage extends StatelessWidget {
  const DetailPage({required this.character, super.key});

  final CastCharacter character;

  @override
  Widget build(BuildContext context) {
    return PageFrame(children: [DetailBody(character: character)]);
  }
}

class DetailBody extends StatelessWidget {
  const DetailBody({required this.character, super.key});

  final CastCharacter character;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('PERSONAGEM', style: eyebrowStyle()),
        const SizedBox(height: 12),
        Heading(spec: HeadingSpec(text: character.name, style: titleStyle())),
        const SizedBox(height: 28),
        DetailRow(row: DetailRowData(label: 'Estado', value: character.status.label, color: statusColor(character.status))),
        DetailRow(row: DetailRowData(label: 'Espécie', value: character.species)),
        DetailRow(row: DetailRowData(label: 'Origem', value: character.origin)),
      ],
    );
  }
}

class DetailRowData {
  const DetailRowData({required this.label, required this.value, this.color});

  final String label;
  final String value;
  final Color? color;
}

class DetailRow extends StatelessWidget {
  const DetailRow({required this.row, super.key});

  final DetailRowData row;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 14),
      child: Row(
        children: [
          SizedBox(width: 120, child: Text(row.label, style: bodyStyle())),
          Text(row.value, style: statusStyle(row.color ?? bodyStyle().color!)),
        ],
      ),
    );
  }
}
