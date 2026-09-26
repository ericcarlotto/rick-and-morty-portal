import 'package:flutter/material.dart';
import 'package:mobile/nav/portal_nav.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/chrome.dart';

class SectionKeys {
  final Map<String, GlobalKey<State<StatefulWidget>>> sections = {};

  GlobalKey<State<StatefulWidget>> keyFor(String letter) {
    return sections.putIfAbsent(letter, GlobalKey<State<StatefulWidget>>.new);
  }

  void jump(String letter) => revealLetter(keyFor(letter).currentContext);
}

class LetterBar {
  const LetterBar({required this.letters, required this.keys});

  final List<String> letters;
  final SectionKeys keys;
}

class LetterIndex extends StatelessWidget {
  const LetterIndex({required this.bar, super.key});

  final LetterBar bar;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Heading(spec: HeadingSpec(text: 'Índice', style: sectionHeading())),
        Wrap(spacing: 8, children: [for (final letter in bar.letters) indexButton(IndexButtonData(letter: letter, keys: bar.keys))]),
      ],
    );
  }
}

class IndexButtonData {
  const IndexButtonData({required this.letter, required this.keys});

  final String letter;
  final SectionKeys keys;
}

Widget indexButton(IndexButtonData data) {
  return TextButton(
    key: Key('indice-${data.letter}'),
    style: indexLinkStyle(),
    onPressed: () => data.keys.jump(data.letter),
    child: Text(data.letter, style: indexStyle()),
  );
}
