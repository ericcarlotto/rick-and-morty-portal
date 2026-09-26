import 'package:flutter/material.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/theme/status_color.dart';
import 'package:mobile/theme/text_styles.dart';

class CharacterCardView {
  const CharacterCardView({required this.character, required this.onOpen});

  final CastCharacter character;
  final VoidCallback onOpen;
}

class CharacterCard extends StatelessWidget {
  const CharacterCard({required this.view, super.key});

  final CharacterCardView view;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      style: linkStyle(),
      onPressed: view.onOpen,
      child: CharacterLines(character: view.character),
    );
  }
}

class CharacterLines extends StatelessWidget {
  const CharacterLines({required this.character, super.key});

  final CastCharacter character;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(character.name, style: bodyStyle()),
        Text('Espécie: ${character.species}', style: bodyStyle()),
        Text('Estado: ${character.status.label}', style: statusStyle(statusColor(character.status))),
        Text('Origem: ${character.origin}', style: bodyStyle()),
      ],
    );
  }
}
