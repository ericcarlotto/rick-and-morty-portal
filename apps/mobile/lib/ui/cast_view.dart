import 'package:flutter/material.dart';
import 'package:mobile/cast/filter_by_name.dart';
import 'package:mobile/cast/page_for_letter.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/order/group_by_letter.dart';
import 'package:mobile/order/received_order.dart';
import 'package:mobile/theme/portal_colors.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/cast_name_filter.dart';
import 'package:mobile/ui/census_panel.dart';
import 'package:mobile/ui/chrome.dart';
import 'package:mobile/ui/letter_index.dart';
import 'package:mobile/ui/letter_section.dart';
import 'package:mobile/ui/neighbors_bar.dart';
import 'package:mobile/ui/page_window.dart';
import 'package:mobile/ui/scroll_tail.dart';
import 'package:mobile/ui/window_pace.dart';

class CastMoves {
  const CastMoves({required this.onEpisode});

  final ValueChanged<int> onEpisode;
}

class CastActions {
  const CastActions({required this.moves, required this.onCharacter});

  final CastMoves moves;
  final ValueChanged<CastCharacter> onCharacter;
}

class CastModel {
  const CastModel({required this.cast, required this.actions});

  final Cast cast;
  final CastActions actions;
}

class CastView extends StatefulWidget {
  const CastView({required this.model, super.key});

  final CastModel model;

  @override
  State<CastView> createState() => _CastViewState();
}

class _CastViewState extends State<CastView> {
  final keys = SectionKeys();
  final name = TextEditingController();
  final pace = WindowPace();
  int shown = initialCount;

  @override
  void initState() {
    super.initState();
    name.addListener(onName);
  }

  @override
  void dispose() {
    name.removeListener(onName);
    name.dispose();
    pace.cancel();
    super.dispose();
  }

  void onName() {
    pace.cancel();
    setState(() => shown = initialCount);
  }

  void grow(int total) {
    if (pace.loading || pageDone(shown, total)) return;
    pace.request(PaceUpdate(setState: setState, apply: () => shown = grownCount(shown, total)));
  }

  void choose(List<CastCharacter> matched, String letter) {
    final next = countForLetter(matched, letter);
    setState(() => shown = revealedCount(RevealInput(shown: shown, next: next, total: matched.length)));
    WidgetsBinding.instance.addPostFrameCallback((_) => keys.jump(letter));
  }

  @override
  Widget build(BuildContext context) {
    final matched = filterByName(widget.model.cast.characters, name.text);
    final index = indexAsReceived(widget.model.cast.index);
    return PageFrame(
      header: Padding(
        padding: const EdgeInsets.fromLTRB(12, 0, 12, 4),
        child: castIndex(CastIndexInput(matched: matched, index: index, keys: keys, onChoose: (letter) => choose(matched, letter))),
      ),
      children: castChildren(childrenInput(matched, index)),
    );
  }

  CastChildrenInput childrenInput(List<CastCharacter> matched, List<String> index) {
    return CastChildrenInput(
      model: widget.model,
      keys: keys,
      matched: matched,
      index: index,
      shown: shown,
      loading: pace.loading,
      name: name,
      onGrow: () => grow(matched.length),
    );
  }
}

class CastIndexInput {
  const CastIndexInput({required this.matched, required this.index, required this.keys, required this.onChoose});

  final List<CastCharacter> matched;
  final List<String> index;
  final SectionKeys keys;
  final ValueChanged<String> onChoose;
}

Widget castIndex(CastIndexInput input) {
  return LetterIndex(bar: LetterBar(letters: lettersKept(input.index, input.matched), keys: input.keys, onChoose: input.onChoose));
}

class CastChildrenInput {
  const CastChildrenInput({
    required this.model,
    required this.keys,
    required this.matched,
    required this.index,
    required this.shown,
    required this.loading,
    required this.name,
    required this.onGrow,
  });

  final CastModel model;
  final SectionKeys keys;
  final List<CastCharacter> matched;
  final List<String> index;
  final int shown;
  final bool loading;
  final TextEditingController name;
  final VoidCallback onGrow;
}

List<Widget> castChildren(CastChildrenInput input) {
  return [
    ...castHeader(input.model),
    const SizedBox(height: 24),
    CastNameFilter(controller: input.name),
    const SizedBox(height: 12),
    ...castMatches(input),
  ];
}

List<Widget> castMatches(CastChildrenInput input) {
  if (input.matched.isEmpty) return const [EmptyCast()];
  return [...castSections(input), ScrollTail(enabled: moreEnabled(input), busy: loadingOf(input), token: input.shown, onReach: input.onGrow)];
}

bool moreEnabled(CastChildrenInput input) {
  return !input.loading && !pageDone(input.shown, input.matched.length);
}

bool loadingOf(CastChildrenInput input) => input.loading;

List<Widget> castHeader(CastModel model) {
  final cast = model.cast;
  return [
    Text(cast.episode.code, style: codeStyle().copyWith(color: PortalColors.indigo)),
    const SizedBox(height: 8),
    Heading(spec: HeadingSpec(text: cast.episode.name, style: chosenStyle())),
    const SizedBox(height: 16),
    NeighborsBar(nav: neighborNav(model)),
    CensusPanel(census: cast.census),
  ];
}

List<Widget> castSections(CastChildrenInput input) {
  final visible = takeCount(input.matched, input.shown);
  final groups = groupByLetter(GroupInput(index: lettersKept(input.index, visible), characters: visible));
  return [for (final group in groups) sectionFor(group, input)];
}

Widget sectionFor(LetterGroup group, CastChildrenInput input) {
  return LetterSection(section: sectionData(group, input));
}

LetterSectionData sectionData(LetterGroup group, CastChildrenInput input) {
  return LetterSectionData(
    group: group,
    binding: LetterBinding(sectionKey: input.keys.keyFor(group.letter), onOpen: input.model.actions.onCharacter),
  );
}

NeighborNav neighborNav(CastModel model) {
  return NeighborNav(ends: neighborEnds(model.cast), onOpen: model.actions.moves.onEpisode);
}

EpisodeNeighbors neighborEnds(Cast cast) {
  return EpisodeNeighbors(previousEpisode: cast.previousEpisode, nextEpisode: cast.nextEpisode);
}
