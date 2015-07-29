class Menu
  attr_accessor :records, :newRecordCount, :subMenuList

  def initialize
    self.createDefaultRecords
    self.newRecordCount = 0
  end

  def getSubMenuList(parent_code)
    subMenuList = [{id: 0, name: "Counting", code: "counting", parent_code: "numbers"},
                   {id: 1, name: "Reading", code: "reading", parent_code: "numbers"},
                   {id: 2, name: "Random", code: "random", parent_code: "numbers"},
                   {id: 3, name: "Reading", code: "readding", parent_code: "alphabets"}]

    subMenu = subMenuList.map{ |menu| menu if menu[:parent_code] == parent_code[:code] }.compact
    self.subMenuList = subMenu
  end

  def addRecord(record)
    self.records << record
    self.newRecordCount += 1
  end

  def createDefaultRecords
    menuList = [{id: 0, name: "0 1 2 3 4 5 6 7 ...", code: "numbers"},
                {id: 1, name: "A B C D E F G H ...", code: "alphabets"}]
    self.records = menuList
  end
end