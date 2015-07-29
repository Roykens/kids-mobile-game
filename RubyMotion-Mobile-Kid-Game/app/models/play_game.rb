class PlayGame
  attr_accessor :number,:alphabets
  def initialize
    self.number = 0
  end

  def next_number
    self.number += 1
  end

  def prev_number
    self.number -= 1 if self.number > 0
  end

end