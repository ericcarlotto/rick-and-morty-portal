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
  const LetterBar({required this.letters, required this.keys, required this.onChoose});

  final List<String> letters;
  final SectionKeys keys;
  final ValueChanged<String> onChoose;
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
        Wrap(spacing: 8, children: [for (final letter in bar.letters) indexButton(buttonFor(bar, letter))]),
      ],
    );
  }
}

class IndexButtonData {
  const IndexButtonData({required this.letter, required this.keys, required this.onChoose});

  final String letter;
  final SectionKeys keys;
  final ValueChanged<String> onChoose;
}

IndexButtonData buttonFor(LetterBar bar, String letter) {
  return IndexButtonData(letter: letter, keys: bar.keys, onChoose: bar.onChoose);
}

Widget indexButton(IndexButtonData data) {
  return TextButton(
    key: Key('indice-${data.letter}'),
    style: indexLinkStyle(),
    onPressed: () => pressIndex(data),
    child: Text(data.letter, style: indexStyle()),
  );
}

void pressIndex(IndexButtonData data) => data.onChoose(data.letter);
