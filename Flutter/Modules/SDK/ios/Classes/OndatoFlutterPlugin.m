#import "OndatoFlutterPlugin.h"
#if __has_include(<ondatoSDK_flutter/ondatoSDK_flutter-Swift.h>)
#import <ondatoSDK_flutter/ondatoSDK_flutter-Swift.h>
#else
// Support project import fallback if the generated compatibility header
// is not copied when this plugin is created as a library.
// https://forums.swift.org/t/swift-static-libraries-dont-copy-generated-objective-c-header/19816
#import "ondatoSDK_flutter-Swift.h"
#endif

@implementation OndatoFlutterPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  [SwiftOndatoFlutterPlugin registerWithRegistrar:registrar];
}
@end
