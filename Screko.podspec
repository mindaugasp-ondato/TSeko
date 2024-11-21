Pod::Spec.new do |spec|
  spec.name         = "Screko"
  spec.version      = "1.0.0"
  spec.platform     = :ios
  spec.summary      = "iOS SDK"
  spec.ios.deployment_target = "13.0"
  spec.license = { :type => 'MIT', :text => <<-LICENSE
                            Copyright 2012
                           Permission is granted to...
                            LICENSE
                          }
  spec.homepage     = "https://github.com/mindaugasp-ondato/TSeko.git"
  spec.authors      = { "Ondato" => "mindaugas.puniskis@ondato.com" }
  spec.source       = { :git => "https://github.com/mindaugasp-ondato/TSeko.git", :tag => spec.version }
  spec.pod_target_xcconfig = { 'BUILD_LIBRARY_FOR_DISTRIBUTION' => 'YES' }
  spec.vendored_frameworks  = 'Binaries/OndatoScreenRecorder.xcframework'
end
