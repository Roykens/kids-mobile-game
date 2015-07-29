class AppDelegate
  def application(application, didFinishLaunchingWithOptions:launchOptions)
    @window = UIWindow.alloc.initWithFrame(UIScreen.mainScreen.bounds)
    @window.backgroundColor = UIColor.whiteColor
    homeController = HomeController.new
    homeNavigationController = UINavigationController.alloc.initWithRootViewController(homeController)

    settingController = SettingController.new
    settingNavigationController = UINavigationController.alloc.initWithRootViewController(settingController)

    tabController = UITabBarController.alloc.initWithNibName(nil, bundle: nil)
    tabController.viewControllers = [homeNavigationController, settingNavigationController]
    @window.rootViewController = tabController
    @window.makeKeyAndVisible

    true
  end
end