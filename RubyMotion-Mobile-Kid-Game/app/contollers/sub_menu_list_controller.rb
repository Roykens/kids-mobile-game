class SubMenuListController < UIViewController
  attr_accessor :parent_code
  def initWithSubMenuList(parent_code)
    init
    @parent_code = parent_code
    self.title = parent_code[:name]
    @menuModel = Menu.new
    @menuModel.getSubMenuList(@parent_code)
    self
  end

  def viewDidLoad
    super
    @table = UITableView.alloc.initWithFrame(self.view.bounds)
    @table.dataSource = self
    @table.delegate = self
    self.view.addSubview @table
  end

  def tableView(tableView, cellForRowAtIndexPath: indexPath)
    @reuseIdentifier ||= "CELL_IDENTIFIER"

    cell = tableView.dequeueReusableCellWithIdentifier(@reuseIdentifier) || begin
      UITableViewCell.alloc.initWithStyle(UITableViewCellStyleDefault, reuseIdentifier:@reuseIdentifier)
    end

    cell.textLabel.text = @menuModel.subMenuList[indexPath.row][:name]
    cell
  end

  def tableView(tableView, numberOfRowsInSection: section)
    @menuModel.subMenuList.count
  end

  def tableView(tableView, didSelectRowAtIndexPath:indexPath)
    playGameController = PlayGameController.alloc.initWithMenuCode(@parent_code,@menuModel.subMenuList[indexPath.row][:code])
    self.navigationController.pushViewController(playGameController, animated:false)
  end

end