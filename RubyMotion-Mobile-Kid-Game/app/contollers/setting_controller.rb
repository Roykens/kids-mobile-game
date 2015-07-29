class SettingController < UIViewController
  def init
    super
    self.title = "Setting"
    self.tabBarItem = UITabBarItem.alloc.initWithTitle("Setting", image:UIImage.imageNamed('Setting'), tag:1)
    self
  end

  def viewDidLoad
    @settingView = SettingView.alloc.initWithFrame(self.view.frame)
    self.view.addSubview(@settingView)
  end
end
