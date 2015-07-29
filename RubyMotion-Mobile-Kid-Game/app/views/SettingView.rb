class SettingView < UIView

  def initWithFrame(frame)
    super

    self.backgroundColor = UIColor.whiteColor

    @age = UILabel.alloc.initWithFrame(CGRectMake(10, 80, 100, 50))
    @age.text = "Your Age"
    @age.font = UIFont.boldSystemFontOfSize(16)
    @age.textAlignment = UITextAlignmentLeft
    self.addSubview(@age)

    @ageField = UITextField.alloc.initWithFrame(CGRectMake(120, 80, 200, 50))
    @ageField.placeholder = "3"
    @ageField.returnKeyType = UIReturnKeyDone
    @ageField.delegate = self
    self.addSubview(@ageField)

    @saveButton = UIButton.alloc.initWithFrame(CGRectMake(35, 140, 300, 50))
    @saveButton.setTitle("Save", forState:UIControlStateNormal)
    @saveButton.backgroundColor = UIColor.colorWithRed(0.51, green:0.792, blue:0.612, alpha:1)
    self.addSubview(@saveButton)
    self
  end

  def textFieldShouldReturn(textField)
    textField.resignFirstResponder
    true
  end

  def textView(textView, shouldChangeTextInRange:range, replacementText:text)
    if text == "\n"
      textView.resignFirstResponder
      return false
    end
    true
  end

end
