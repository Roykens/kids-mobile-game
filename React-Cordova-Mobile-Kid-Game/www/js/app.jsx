var Router = ReactRouter;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Link = ReactRouter.Link;
var Header = React.createClass({
  onCameraHandler: function(e){
    if(navigator.camera != undefined){
      navigator.camera.getPicture(this.onSuccess, this.onFail, { quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 320,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        cameraDirection: 1
      });
    } else {
      alert("Download at play store");
    }
  },
  onSuccess: function(imageData){
    this.props.onCapture(true,imageData);
  },
  onFail: function(message){
    alert('Failed because: ' + message);
  },
  render: function(){
    var p = this.props;
    return(
      <header className="bar bar-nav">
        <a href="#" className={"icon icon-left-nav pull-left" + (p.back ? "":" hidden")}></a>
        <h1 className="title">{p.text}</h1>
        <button className={"btn pull-right" + (p.back ? " hidden" : "" )} onClick={this.onCameraHandler}>
          <i className="fa fa-camera-retro fa-lg"></i>
        </button>
      </header>
    )
  }
});

var Footer = React.createClass({
  render: function(){
    return(
      <div className="bar bar-standard bar-footer">
        <Link to="home" className="icon icon-home pull-left">
        </Link>
        <Link to="setting" className="icon icon-gear pull-right">
        </Link>
      </div>
    )
  }
})


var MenuList = React.createClass({
  render: function(){
    var p = this.props;
    var items = p.menuList.map(function(item){
      return(
        <MenuItem key={item.id} data={item} url="games"/>
      )
    })
    return(
      <ul className="table-view">
        {items}
      </ul>
    )
  }
})

var MenuItem = React.createClass({
  render: function(){
    var p = this.props;
    return(
      <li className="table-view-cell">
        <Link to={'/'+ p.url +'/'+ p.data.code } className="navigate-right" data-transition="fade">
          {p.data.name}
        </Link>
      </li>
    )
  }
})

var SubMenuList = React.createClass({
  render:function(){
    var s = this.state;
    var menu_parent_code = this.props.params.menuCode ;
    var sub_menu_list = [];
    var parent_menu = [];
    menuService.findByParentCode(menu_parent_code).done(function(item){
      sub_menu_list = item;
    }.bind(this));
    menuService.findParentData(menu_parent_code).done( function(item){
      parent_menu = item;
    }.bind(this));
    var items = sub_menu_list.map(function(item){
      return(
        <MenuItem key={item.id} data={item} url={"games/"+menu_parent_code}/>
      )
    });

    return(
      <div>
        <Header text={parent_menu[0].name} back={true}/>
        <div className="content clear">
          <ul className="table-view">
            {items}
          </ul>
        </div>
        <Footer />
      </div>
    )
  }
})

var SubMenuDetail = React.createClass({
  getInitialState: function(){
    return{
      text: 0,
      word: ""
    }
  },
  componentDidMount: function(){
    var menu_parent_code = this.props.params.menuCode ;
    var sub_menu_code = this.props.params.subMenuCode;
    var s = this.state;
    menu_parent_code == 'alphabets' && sub_menu_code == 'reading' ? this.setState({word: alphabet[s.text]}) : ""
  },
  handleLeftSwipe: function(e){
    var age = localStorage.getItem("age") != null ? parseInt(localStorage.getItem("age")) : 3;
    var min_number = 60;
    var numbers = age > 3 ? min_number * age : min_number ;
    var s = this.state;
    var menu_parent_code = this.props.params.menuCode ;
    var sub_menu_code = this.props.params.subMenuCode;
    this.setState({text: numbers == s.text ? numbers : s.text + 1})
    menu_parent_code == 'alphabets' && sub_menu_code == 'reading' ?  this.setState({word: alphabet[s.text >= 25 ? 25 : s.text + 1]}) : ""
  },
  handleRightSwipe: function(e){
    var s = this.state;
    var menu_parent_code = this.props.params.menuCode ;
    var sub_menu_code = this.props.params.subMenuCode;
    menu_parent_code == 'numbers' && sub_menu_code == 'counting' ? this.setState({text: s.text == 0 ? 0 : s.text - 1}) : ""
    menu_parent_code == 'alphabets' && sub_menu_code == 'reading' ?  this.setState({text: s.text == 0 ? 0 : (s.text >= 25 ? 24 : s.text -1 ),word: alphabet[s.text == 0 ? 0 : (s.text >= 25 ? 24 : s.text -1 )]}) : ""
  },
  render: function(){
    var s = this.state;
    var menu_parent_code = this.props.params.menuCode ;
    var sub_menu_code = this.props.params.subMenuCode;
    var parent_menu = [];
    menuService.findParentData(menu_parent_code).done( function(item){
      parent_menu = item;
    }.bind(this))
    return(
      <div>
        <Header text={parent_menu[0].name} back={true}/>
        <Swiper className="swipe-container" onSwipeLeft={this.handleLeftSwipe} onSwipeRight={this.handleRightSwipe}>
          <div className="swipe-view" style={{"fontSize": s.text > 99 ? "100pt" : "200pt"}}>
            { sub_menu_code == 'counting' ? s.text : (menu_parent_code == 'alphabets' && sub_menu_code == 'reading' ? s.word : '')}
          </div>
        </Swiper>
        <Footer />
      </div>
    )
  }
})

var App = React.createClass({
  getInitialState: function(){
    return {
      is_capture: false,
      imageData: ""
    }
  },
  onCaptureHandler: function(e,imageData){
    var s = this.state;
    this.setState({ is_capture: e, imageData: imageData})
  },
  render:function(){
    var s = this.state;
    var image = document.getElementById('myImage');
    if(s.is_capture) image.src = "data:image/jpeg;base64," + s.imageData;
    return(
      <div>
        <Header text="Mobile Kid Game" back={false} onCapture={this.onCaptureHandler}/>
        <div className="content clear">
          <MenuList menuList={menuList}/>
          <div className={"capture-image " + (s.is_capture ? "" : "hidden")}>
            <img src="" id="myImage" alt="No Image" width="310px" height="300px"/>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
})
var session_age = localStorage.getItem("age") != null ? parseInt(localStorage.getItem("age")) : 3 ;
var Setting = React.createClass({
  getInitialState: function(){
    return{ age: session_age}
  },
  onSaveSettingHandle: function(e){
    var age = this.refs.age.getDOMNode().value;
    this.setState({ age: age})
    localStorage.setItem('age',JSON.parse(age))
  },
  render: function(){
    var s = this.state;
    var age =  localStorage.getItem("age") != null ? parseInt(localStorage.getItem("age")) : s.age ;
    return(
      <div>
        <Header text="Setting" back={true} onCapture={this.onCaptureHandler}/>
        <div className="setting">
          <div className="input-row">
            <label>Your Age</label>
            <input type="text" placeholder="Your age" ref="age" id="age" defaultValue={age}/>
          </div>
          <button className="btn btn-positive btn-block" onClick={this.onSaveSettingHandle}>Save</button>
        </div>
        <Footer />
      </div>
    )
  }
})

var NotFound = React.createClass({
  render: function(){
    return(
      <div>
        <Header text="Mobile Kid Game" back={true} onCapture={this.onCaptureHandler}/>
        <div className="clear" style={{"marginTop": "150px","textAlign": "center","fontSize": "30pt"}}>
          <h1>404!</h1>
          Route not found
          </div>
        <Footer />
      </div>
    )
  }
})

var routes = (
    <Route>
      <Route path="/" handler={App} name="home"/>
      <Route path="/games/:menuCode" handler={SubMenuList}/>
      <Route path="/games/:menuCode/:subMenuCode" handler={SubMenuDetail}/>
      <Route path="/setting" handler={Setting} name="setting"/>
      <NotFoundRoute handler={ NotFound } />
    </Route>
  );

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById("app"))
})

