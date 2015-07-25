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
    this.props.onCapture();
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
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
        <a className="icon icon-home pull-left"></a>
        <a className="icon icon-gear pull-right"></a>
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
        <Link to={'/'+ p.url +'/'+ p.data.code } className="navigate-right">
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
    }.bind(this))
    var items = sub_menu_list.map(function(item){
      return(
        <MenuItem key={item.id} data={item} url={"games/"+menu_parent_code}/>
      )
    })

    return(
      <div>
        <Header text={parent_menu[0].name} back={true}/>
        <div className="content clear">
          <ul className="table-view">
            {items}
          </ul>
        </div>
      </div>
    )
  }
})

var SubMenuDetail = React.createClass({
  getInitialState: function(){
    return{
      text: 0
    }
  },
  swipingRight: function(e){
    var s = this.state;
    this.setState({text: s.text + 1})
  },
  swipingLeft: function(e){
    var s = this.state;
    this.setState({text: s.text - 1})
  },
  render: function(){
    var s = this.state;
    var menu_parent_code = this.props.params.menuCode ;
    return(
      <div className="swipe-view">
        <Header text={menu_parent_code} back={true}/>
        <Swipeable
          onSwipingUp={this.swipingUp}
          onSwipingRight={this.swipingRight}
          onSwipingDown={this.swipingDown}
          onSwipingLeft={this.swipingLeft}
          onSwipedUp={this.swipedUp}
          onSwipedRight={this.swipedRight}
          onSwipedDown={this.swipedDown}
          onSwipedLeft={this.swipedLeft}
          onSwiped={this.handleSwipeAction}>
            {s.text}
        </Swipeable>
      </div>
    )
  }
})

var App = React.createClass({
  getInitialState: function(){
    return {
      is_capture: false
    }
  },
  onCaptureHandler: function(){
    var s = this.state;
    this.setState({ is_capture: !s.is_capture})
  },
  render:function(){
    var s = this.state;
    var capture_image = s.is_capture ? <img src="" id="myImage" alt="No Image"  width="320px" height="300px"/> : ""
    return(
      <div>
        <Header text="Mobile Kid Game" back={false} onCapture={this.onCaptureHandler}/>
        <div className="content clear">
          <MenuList menuList={menuList}/>
        </div>
        {capture_image}
        <Footer />
      </div>
    )
  }
})

var NotFound = React.createClass({
  render: function(){
    return(
      <div>
        <h1>404!</h1>
        Route not found
      </div>
    )
  }
})

var routes = (
    <Route>
      <Route path="/" handler={App} />
      <Route path="/games/:menuCode" handler={SubMenuList}/>
      <Route path="/games/:menuCode/:subMenuCode" handler={SubMenuDetail}/>
      <NotFoundRoute handler={ NotFound } />
    </Route>
  );

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById("app"))
})

