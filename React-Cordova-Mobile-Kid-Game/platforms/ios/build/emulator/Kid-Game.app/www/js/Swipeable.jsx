var Swipeable = React.createClass({
  propTypes: {
    onSwiped: React.PropTypes.func,
    onSwipingUp: React.PropTypes.func,
    onSwipingRight: React.PropTypes.func,
    onSwipingDown: React.PropTypes.func,
    onSwipingLeft: React.PropTypes.func,
    onSwipedUp: React.PropTypes.func,
    onSwipedRight: React.PropTypes.func,
    onSwipedDown: React.PropTypes.func,
    onSwipedLeft: React.PropTypes.func,
    flickThreshold: React.PropTypes.number,
    delta: React.PropTypes.number
  },

  getInitialState: function () {
    return {
      x: null,
      y: null,
      swiping: false,
      start: 0
    }
  },

  getDefaultProps: function () {
    return {
      flickThreshold: 0.6,
      delta: 10
    }
  },

  calculatePos: function (e) {
    var x = e.changedTouches[0].clientX
    var y = e.changedTouches[0].clientY

    var xd = this.state.x - x
    var yd = this.state.y - y

    var axd = Math.abs(xd)
    var ayd = Math.abs(yd)

    return {
      deltaX: xd,
      deltaY: yd,
      absX: axd,
      absY: ayd
    }
  },

  touchStart: function (e) {
    if (e.touches.length > 1) {
      return
    }
    var touchobj = e.changedTouches[0]
    swipeType = 'none'
    dist = 0
    // startX = touchobj.pageX
    // startY = touchobj.pageY
    // startTime = new Date().getTime() // record time when finger first makes contact with surface
    // handletouch(e, 'none', 'start', swipeType, 0) // fire callback function with params dir="none", phase="start", swipetype="none" etc
    // e.preventDefault()


    this.setState({
      start: Date.now(),
      x: touchobj.pageX,
      y: touchobj.pageY,
      swiping: false
    })
  },

  touchMove: function (e) {
    if (!this.state.x || !this.state.y || e.touches.length > 1) {
      return
    }

    var touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
    if (Math.abs(distX) > Math.abs(distY)){ // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
        dir = (distX < 0)? 'left' : 'right'
    }

  },

  touchEnd: function (ev) {
    // if (this.state.swiping) {
    //    var touchobj = e.changedTouches[0]
    //     elapsedTime = new Date().getTime() - startTime // get time elapsed
    //     if (elapsedTime <= allowedTime){ // first condition for awipe met
    //         if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
    //             swipeType = dir // set swipeType to either "left" or "right"
    //         }
    //         else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
    //             swipeType = dir // set swipeType to either "top" or "down"
    //         }
    //     }
    // }
    console.log("End");
    this.setState(this.getInitialState())
  },

  render: function () {
    return (
      <div {...this.props}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd} >
          {this.props.children}
      </div>
    )
  }
})