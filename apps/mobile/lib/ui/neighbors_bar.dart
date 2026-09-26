import 'package:flutter/material.dart';
import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/theme/text_styles.dart';

class NeighborNav {
  const NeighborNav({required this.ends, required this.onOpen});

  final EpisodeNeighbors ends;
  final ValueChanged<int> onOpen;
}

class NeighborsBar extends StatelessWidget {
  const NeighborsBar({required this.nav, super.key});

  final NeighborNav nav;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        NeighborLink(link: previousLink(nav)),
        NeighborLink(link: nextLink(nav)),
      ],
    );
  }
}

NeighborLinkData previousLink(NeighborNav nav) {
  return NeighborLinkData(
    copy: const NeighborCopy(label: 'Anterior', empty: 'Sem episódio anterior'),
    action: NeighborAction(episode: nav.ends.previousEpisode, onOpen: nav.onOpen),
  );
}

NeighborLinkData nextLink(NeighborNav nav) {
  return NeighborLinkData(
    copy: const NeighborCopy(label: 'Seguinte', empty: 'Sem episódio seguinte'),
    action: NeighborAction(episode: nav.ends.nextEpisode, onOpen: nav.onOpen),
  );
}

class NeighborCopy {
  const NeighborCopy({required this.label, required this.empty});

  final String label;
  final String empty;
}

class NeighborAction {
  const NeighborAction({required this.episode, required this.onOpen});

  final EpisodeSummary? episode;
  final ValueChanged<int> onOpen;
}

class NeighborLinkData {
  const NeighborLinkData({required this.copy, required this.action});

  final NeighborCopy copy;
  final NeighborAction action;
}

class NeighborLink extends StatelessWidget {
  const NeighborLink({required this.link, super.key});

  final NeighborLinkData link;

  @override
  Widget build(BuildContext context) {
    final episode = link.action.episode;
    if (episode == null) return Text(link.copy.empty, style: bodyStyle());
    return TextButton(
      style: linkStyle(),
      onPressed: () => link.action.onOpen(episode.id),
      child: Text('${link.copy.label}: ${episode.name}', style: bodyStyle()),
    );
  }
}
