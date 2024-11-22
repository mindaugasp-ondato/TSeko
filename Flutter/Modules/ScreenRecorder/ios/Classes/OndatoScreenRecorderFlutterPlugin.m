#import "OndatoScreenRecorderFlutterPlugin.h"
#if __has_include(<ondatoScreenRecorder_flutter/ondatoScreenRecorder_flutter-Swift.h>)
#import <ondatoScreenRecorder_flutter/ondatoScreenRecorder_flutter-Swift.h>
#else
// Support project import fallback if the generated compatibility header
// is not copied when this plugin is created as a library.
// https://forums.swift.org/t/swift-static-libraries-dont-copy-generated-objective-c-header/19816
#import "ondatoScreenRecorder_flutter-Swift.h"
#endif

@implementation OndatoScreenRecorderFlutterPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {}
@end
