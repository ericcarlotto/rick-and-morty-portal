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
        Heading(spec: HeadingSpec(text: character.name, style: titleStyle())),
        Text('Espécie: ${character.species}', style: bodyStyle()),
        Text('Estado: ${character.status.label}', style: statusStyle(statusColor(character.status))),
        Text('Origem: ${character.origin}', style: bodyStyle()),
        TextButton(
          style: linkStyle(),
          onPressed: () => Navigator.of(context).pop(),
          child: Text('Voltar ao elenco', style: bodyStyle()),
        ),
      ],
    );
  }
}
