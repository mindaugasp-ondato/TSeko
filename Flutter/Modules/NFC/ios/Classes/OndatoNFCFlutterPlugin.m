#import "OndatoNFCFlutterPlugin.h"
#if __has_include(<ondatoNFC_flutter/ondatoNFC_flutter-Swift.h>)
#import <ondatoNFC_flutter/ondatoNFC_flutter-Swift.h>
#else
// Support project import fallback if the generated compatibility header
// is not copied when this plugin is created as a library.
// https://forums.swift.org/t/swift-static-libraries-dont-copy-generated-objective-c-header/19816
#import "ondatoNFC_flutter-Swift.h"
#endif

@implementation OndatoNFCFlutterPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
//  [SwiftOndatoNFCFlutterPlugin registerWithRegistrar:registrar];
}
@end
