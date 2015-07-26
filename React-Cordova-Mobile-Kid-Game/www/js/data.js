var menuList = [{
  id: 0,
  name: "0 1 2 3 4 5 6 ...",
  code: "numbers"
},{
  id: 1,
  name: "A B C D E F G ...",
  code: "alphabets"
}];

var alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

menuService = (function () {
  var findByParentId= function(){

  },
  findParentData = function(code){
    var deferred = $.Deferred();
    var results = menuList.filter(function (element){
      var parent_data = element.code;
      return parent_data.toLowerCase().indexOf(code.toLowerCase()) > -1;
    })
    deferred.resolve(results);
    return deferred.promise();
  },
  findByParentCode= function(parent_code){
    var deferred = $.Deferred();
    var results = subMenuList.filter(function (element) {
        var sub_menu = element.parent_code;
        return sub_menu.toLowerCase().indexOf(parent_code.toLowerCase()) > -1;
    });
    deferred.resolve(results);
    return deferred.promise();
  },
  subMenuList = [{id: 0, name: "Counting",code: "counting",parent_code: "numbers"},
                 {id: 1, name: "Reading", code: "reading", parent_code: "numbers"},
                 {id: 2, name: "Reading", code: "reading", parent_code: "alphabets"}];
  return{
    findByParentId: findByParentId,
    findByParentCode: findByParentCode,
    findParentData: findParentData
  }
}());