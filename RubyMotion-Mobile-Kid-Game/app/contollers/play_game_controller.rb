class PlayGameController < UIViewController
  def initWithMenuCode(parent_code,child_code)
    @parent_code = parent_code
    @child_code = child_code
    self.title = @parent_code[:name]
    self
  end

  def viewDidLoad
    recognizer = UISwipeGestureRecognizer.alloc.initWithTarget(self, action:'handle_swipe:')
    recognizer.delegate = self
    self.view.addGestureRecognizer(recognizer)
    recognizer = UISwipeGestureRecognizer.alloc.initWithTarget(self, action:'handle_swipe:')
    recognizer.delegate = self
    recognizer.direction = UISwipeGestureRecognizerDirectionLeft
    self.view.addGestureRecognizer(recognizer)
    @playGame = PlayGame.new
    @label = UILabel.alloc.initWithFrame(self.view.bounds)
    @label.text = @playGame.number.nil? ? "0" : @playGame.number.to_s
    @label.font = UIFont.boldSystemFontOfSize(150)
    @label.textAlignment = UITextAlignmentCenter
    self.view.addSubview @label
  end

  def handle_swipe(sender)
    if(sender.direction == UISwipeGestureRecognizerDirectionLeft)
      @label.text = @playGame.next_number.to_s
      self
    else

      @label.text = @playGame.prev_number.to_s if @playGame.number > 0
      self
    end
  end

end