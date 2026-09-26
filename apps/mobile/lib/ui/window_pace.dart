import 'dart:async';

const moreDelay = Duration(milliseconds: 350);

class PaceUpdate {
  const PaceUpdate({required this.setState, required this.apply});

  final void Function(void Function() fn) setState;
  final void Function() apply;
}

class WindowPace {
  Timer? timer;
  bool loading = false;

  void cancel() {
    timer?.cancel();
    timer = null;
    loading = false;
  }

  void request(PaceUpdate update) {
    if (loading) return;
    update.setState(() => loading = true);
    timer = Timer(moreDelay, () => finish(update));
  }

  void finish(PaceUpdate update) {
    update.setState(() {
      loading = false;
      timer = null;
      update.apply();
    });
  }
}
