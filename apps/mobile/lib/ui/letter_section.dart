import 'package:flutter/widgets.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/order/group_by_letter.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/character_card.dart';
import 'package:mobile/ui/chrome.dart';

class LetterSectionData {
  const LetterSectionData({required this.group, required this.binding});

  final LetterGroup group;
  final LetterBinding binding;
}

class LetterBinding {
  const LetterBinding({required this.sectionKey, required this.onOpen});

  final Key sectionKey;
  final ValueChanged<CastCharacter> onOpen;
}

class LetterSection extends StatelessWidget {
  const LetterSection({required this.section, super.key});

  final LetterSectionData section;

  @override
  Widget build(BuildContext context) {
    return Column(
      key: section.binding.sectionKey,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Heading(spec: HeadingSpec(text: section.group.letter, style: indexStyle())),
        for (final character in section.group.characters) cardFor(section.binding, character),
      ],
    );
  }
}

Widget cardFor(LetterBinding binding, CastCharacter character) {
  return CharacterCard(view: CharacterCardView(character: character, onOpen: () => binding.onOpen(character)));
}
