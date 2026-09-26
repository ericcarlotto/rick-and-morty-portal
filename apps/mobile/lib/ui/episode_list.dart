import 'package:flutter/material.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/theme/text_styles.dart';

class EpisodeListData {
  const EpisodeListData({required this.episodes, required this.onOpen});

  final List<EpisodeSummary> episodes;
  final ValueChanged<EpisodeSummary> onOpen;
}

class EpisodeList extends StatelessWidget {
  const EpisodeList({required this.list, super.key});

  final EpisodeListData list;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [for (final episode in list.episodes) EpisodeTile(tile: tileFor(episode, list.onOpen))],
    );
  }
}

EpisodeTileData tileFor(EpisodeSummary episode, ValueChanged<EpisodeSummary> onOpen) {
  return EpisodeTileData(episode: episode, onOpen: onOpen);
}

class EpisodeTileData {
  const EpisodeTileData({required this.episode, required this.onOpen});

  final EpisodeSummary episode;
  final ValueChanged<EpisodeSummary> onOpen;
}

class EpisodeTile extends StatelessWidget {
  const EpisodeTile({required this.tile, super.key});

  final EpisodeTileData tile;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      style: linkStyle(),
      onPressed: () => tile.onOpen(tile.episode),
      child: EpisodeLabel(episode: tile.episode),
    );
  }
}

class EpisodeLabel extends StatelessWidget {
  const EpisodeLabel({required this.episode, super.key});

  final EpisodeSummary episode;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(episode.name, style: bodyStyle()),
        Text(episode.code, style: codeStyle()),
      ],
    );
  }
}
