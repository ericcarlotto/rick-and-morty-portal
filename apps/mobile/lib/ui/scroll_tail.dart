import 'package:flutter/widgets.dart';
import 'package:mobile/ui/page_loading.dart';

class ScrollTail extends StatefulWidget {
  const ScrollTail({required this.enabled, required this.busy, required this.token, required this.onReach, super.key});

  final bool enabled;
  final bool busy;
  final int token;
  final VoidCallback onReach;

  @override
  State<ScrollTail> createState() => _ScrollTailState();
}

class _ScrollTailState extends State<ScrollTail> {
  ScrollPosition? position;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => attach());
  }

  @override
  void didUpdateWidget(ScrollTail oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!widget.enabled) {
      detach();
      return;
    }
    WidgetsBinding.instance.addPostFrameCallback((_) => attach());
  }

  @override
  void dispose() {
    detach();
    super.dispose();
  }

  void attach() {
    if (!mounted || !widget.enabled) return;
    final next = Scrollable.maybeOf(context)?.position;
    if (next == null) return;
    if (!identical(position, next)) watch(next);
    look();
  }

  void watch(ScrollPosition next) {
    detach();
    position = next;
    next.addListener(look);
  }

  void detach() {
    position?.removeListener(look);
    position = null;
  }

  void look() {
    if (!canGrow()) return;
    widget.onReach();
  }

  bool canGrow() {
    final current = position;
    if (blocked(current)) return false;
    return nearEnd(current!);
  }

  bool blocked(ScrollPosition? current) {
    if (!mounted || !widget.enabled) return true;
    return current == null || !current.hasContentDimensions;
  }

  bool nearEnd(ScrollPosition current) {
    return current.pixels >= current.maxScrollExtent - 48;
  }

  @override
  Widget build(BuildContext context) {
    if (!widget.enabled && !widget.busy) return const SizedBox.shrink();
    return const PageLoading();
  }
}
