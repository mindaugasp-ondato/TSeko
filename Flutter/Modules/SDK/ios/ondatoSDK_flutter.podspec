Pod::Spec.new do |s|
  s.name             = 'ondatoSDK_flutter'
  s.version          = '1.0.0'
  s.summary          = 'A new flutter plugin project.'
  s.description      = 'OndatoSDK lets you identify your customers'
  s.homepage         = 'http://example.com'
  s.license          = 'Apache-2.0'
  s.author           = { 'Your Company' => 'email@example.com' }
  s.source           = { :git => 'https://github.com/mindaugasp-ondato/TSeko.git', :tag => s.version }
  s.source_files = 'Classes/**/*'
  s.dependency 'Flutter'
  s.dependency 'Seko'
  
  s.platform = :ios, '13.0'
  
  # Flutter.framework does not contain a i386 slice.
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES', 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'i386' }
  s.swift_version = '5.0'
end
