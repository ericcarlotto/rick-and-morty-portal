import 'package:flutter/material.dart';
import 'package:mobile/contract/episode.dart';
import 'package:mobile/theme/portal_colors.dart';
import 'package:mobile/theme/text_styles.dart';
import 'package:mobile/ui/page_window.dart';
import 'package:mobile/ui/scroll_tail.dart';
import 'package:mobile/ui/window_pace.dart';

class EpisodeListData {
  const EpisodeListData({required this.episodes, required this.resetKey, required this.onOpen});

  final List<EpisodeSummary> episodes;
  final String resetKey;
  final ValueChanged<EpisodeSummary> onOpen;
}

class EpisodeList extends StatefulWidget {
  const EpisodeList({required this.list, super.key});

  final EpisodeListData list;

  @override
  State<EpisodeList> createState() => _EpisodeListState();
}

class _EpisodeListState extends State<EpisodeList> {
  final pace = WindowPace();
  int shown = initialCount;

  @override
  void didUpdateWidget(EpisodeList oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.list.resetKey == widget.list.resetKey) return;
    pace.cancel();
    shown = initialCount;
  }

  @override
  void dispose() {
    pace.cancel();
    super.dispose();
  }

  void grow() {
    if (pace.loading || pageDone(shown, widget.list.episodes.length)) return;
    pace.request(PaceUpdate(setState: setState, apply: reveal));
  }

  void reveal() => shown = grownCount(shown, widget.list.episodes.length);

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: _episodeTiles(this));
  }
}

List<Widget> _episodeTiles(_EpisodeListState state) {
  final list = state.widget.list;
  return [
    for (final episode in takeCount(list.episodes, state.shown)) EpisodeTile(tile: tileFor(episode, list.onOpen)),
    ScrollTail(
      enabled: !pageDone(state.shown, list.episodes.length) && !state.pace.loading,
      busy: state.pace.loading,
      token: state.shown,
      onReach: state.grow,
    ),
  ];
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
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(episode.code, style: codeStyle().copyWith(fontSize: 13, color: PortalColors.indigo)),
          const SizedBox(height: 4),
          Text(episode.name, style: titleStyle().copyWith(fontSize: 22)),
        ],
      ),
    );
  }
}
