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
      style: linkStyle().copyWith(padding: const WidgetStatePropertyAll(EdgeInsets.symmetric(vertical: 12))),
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
        CharacterTitle(character: character),
        const SizedBox(height: 4),
        Text('${character.species} · ${character.origin}', style: bodyStyle()),
      ],
    );
  }
}

class CharacterTitle extends StatelessWidget {
  const CharacterTitle({required this.character, super.key});

  final CastCharacter character;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: Text(character.name, style: titleStyle().copyWith(fontSize: 20))),
        StatusMark(status: character.status),
      ],
    );
  }
}

class StatusMark extends StatelessWidget {
  const StatusMark({required this.status, super.key});

  final CharacterStatus status;

  @override
  Widget build(BuildContext context) {
    final color = statusColor(status);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(width: 8, height: 8, color: color),
        const SizedBox(width: 8),
        Text(status.label, style: statusStyle(color)),
      ],
    );
  }
}
