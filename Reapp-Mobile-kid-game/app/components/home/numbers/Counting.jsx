

import { Reapp, React, BackButton, DottedViewList, NestedViewList, List, View, Button } from 'reapp-kit';

class Counting extends React.Component {
  render() {
    const backButton =
      <BackButton onTap={() => window.history.back()} />
    return (
      <View {...this.props} title="0 1 2 3 4 5 6 ..." titleLeft={backButton}>
        <DottedViewList>
          <View plan>
            <span style={{"fontSize": "200pt", "textAlign": "center"}}>
              0
            </span>
          </View>
          <View plan>
            <span style={{"fontSize": "200pt", "textAlign": "center"}}>
              1
            </span>
          </View>
          <View plan>
            <span style={{"fontSize": "200pt", "textAlign": "center"}}>
              2
            </span>
          </View>
          <View plan>
            <span style={{"fontSize": "200pt", "textAlign": "center"}}>
              3
            </span>
          </View>
          <View plan>
            <span style={{"fontSize": "200pt", "textAlign": "center"}}>
              4
            </span>
          </View>
          <View plan>
            <span style={{"fontSize": "200pt", "textAlign": "center"}}>
              5
            </span>
          </View>
          <View plan>
            <span style={{"fontSize": "200pt", "textAlign": "center"}}>
              6
            </span>
          </View>
        </DottedViewList>
      </View>
    );
  }
}

export default Reapp(Counting);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/