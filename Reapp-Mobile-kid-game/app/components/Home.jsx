import { Reapp, React, NestedViewList, List, View, Button } from 'reapp-kit';

class Home extends React.Component {
  render() {

    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title="Kid-Education">
          <List>
            <List.Item onTap={() => this.router().transitionTo('numbers')} icon>0 1 2 3 4</List.Item>
            <List.Item onTap={() => this.router().transitionTo('sub')} icon>A B C D E</List.Item>
          </List>
        </View>
        {this.props.child()}
      </NestedViewList>
    );
  }
}

export default Reapp(Home);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/