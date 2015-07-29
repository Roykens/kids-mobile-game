class HomeController < UIViewController
  def init
    super
    self.title = "Mobile Kid Game"
    self.tabBarItem = UITabBarItem.alloc.initWithTitle("Home", image:UIImage.imageNamed('Home'), tag:1)
    self
  end

  def viewDidLoad
    super
    @table = UITableView.alloc.initWithFrame(self.view.bounds)
    @table.dataSource = self
    @table.delegate = self
    self.view.addSubview @table
    @menuModel = Menu.new
    right_button = UIBarButtonItem.alloc.initWithTitle("Camera", style: UIBarButtonItemStyleBordered, target:self, action:'camera')
    self.navigationItem.rightBarButtonItem = right_button
  end

  def camera
    camera_controller = CameraController.alloc.init
    self.navigationController.pushViewController(camera_controller, animated:true)
  end

  def tableView(tableView, cellForRowAtIndexPath: indexPath)
    @reuseIdentifier ||= "CELL_IDENTIFIER"

    cell = tableView.dequeueReusableCellWithIdentifier(@reuseIdentifier) || begin
      UITableViewCell.alloc.initWithStyle(UITableViewCellStyleDefault, reuseIdentifier:@reuseIdentifier)
    end
    cell.textLabel.text = @menuModel.records[indexPath.row][:name]
    cell
  end

  def tableView(tableView, numberOfRowsInSection: section)
    @menuModel.records.count
  end

  def tableView(tableView, didSelectRowAtIndexPath:indexPath)
    subMenuListController = SubMenuListController.alloc.initWithSubMenuList(@menuModel.records[indexPath.row])
    self.navigationController.pushViewController(subMenuListController, animated:true)
  end

end