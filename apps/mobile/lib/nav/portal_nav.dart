import 'dart:async';

import 'package:flutter/widgets.dart';

bool isFirstRoute(Route<dynamic> route) => route.isFirst;

void popToCatalog(BuildContext context) {
  Navigator.of(context).popUntil(isFirstRoute);
}

void revealLetter(BuildContext? context) {
  if (context == null) return;
  unawaited(Scrollable.ensureVisible(context, alignment: 0.1));
}
