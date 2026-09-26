import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/bff/bff_link.dart';
import 'package:mobile/bff/http_portal_api.dart';
import 'package:mobile/bff/origin.dart';
import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/portal_app.dart';

@visibleForTesting
ClientFactory newPortalClient = http.Client.new;

typedef ClientFactory = http.Client Function();

class LiveApiConfig {
  const LiveApiConfig({this.rawOrigin = '', this.client});

  final String rawOrigin;
  final http.Client? client;
}

void main() {
  const origin = String.fromEnvironment('BFF_ORIGIN');
  runApp(PortalApp(api: livePortalApi(LiveApiConfig(rawOrigin: origin))));
}

PortalApi livePortalApi(LiveApiConfig config) {
  return HttpPortalApi(link: BffLink(origin: resolveOrigin(config.rawOrigin), client: config.client ?? newPortalClient()));
}
