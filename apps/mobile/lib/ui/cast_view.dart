import 'package:flutter/material.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/order/group_by_letter.dart';
import 'package:mobile/order/received_order.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/census_panel.dart';
import 'package:mobile/ui/chrome.dart';
import 'package:mobile/ui/letter_index.dart';
import 'package:mobile/ui/letter_section.dart';
import 'package:mobile/ui/neighbors_bar.dart';

class CastMoves {
  const CastMoves({required this.onCatalog, required this.onEpisode});

  final VoidCallback onCatalog;
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

  @override
  Widget build(BuildContext context) {
    return PageFrame(children: castChildren(CastChildrenInput(model: widget.model, keys: keys)));
  }
}

class CastChildrenInput {
  const CastChildrenInput({required this.model, required this.keys});

  final CastModel model;
  final SectionKeys keys;
}

List<Widget> castChildren(CastChildrenInput input) {
  return [
    ...castHeader(input.model),
    LetterIndex(bar: LetterBar(letters: indexAsReceived(input.model.cast.index), keys: input.keys)),
    ...castSections(input),
    CensusPanel(census: input.model.cast.census),
  ];
}

List<Widget> castHeader(CastModel model) {
  final cast = model.cast;
  return [
    catalogButton(model.actions.moves.onCatalog),
    Heading(spec: HeadingSpec(text: cast.episode.name, style: chosenStyle())),
    Text(cast.episode.code, style: codeStyle()),
    NeighborsBar(nav: neighborNav(model)),
  ];
}

List<Widget> castSections(CastChildrenInput input) {
  return [for (final group in groupByLetter(groupsOf(input.model.cast))) sectionFor(group, input)];
}

GroupInput groupsOf(Cast cast) {
  return GroupInput(index: indexAsReceived(cast.index), characters: keepReceivedOrder(cast.characters));
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

Widget catalogButton(VoidCallback onCatalog) {
  return TextButton(
    style: linkStyle(),
    onPressed: onCatalog,
    child: Text('Catálogo', style: bodyStyle()),
  );
}
