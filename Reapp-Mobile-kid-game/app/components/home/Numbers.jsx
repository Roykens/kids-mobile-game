import { Reapp, React, BackButton, NestedViewList, List, View, Button } from 'reapp-kit';

class Numbers extends React.Component {
  render() {
    const backButton =
      <BackButton onTap={() => window.history.back()} />

    return (
      <NestedViewList {...this.props.viewListProps}>
        <View {...this.props} title="0 1 2 3 4 5 6 ..." titleLeft={backButton}>
          <List>
            <List.Item onTap={() => this.router().transitionTo('counting')} icon>Counting</List.Item>
            <List.Item onTap={() => this.router().transitionTo('counting')} icon>Reading</List.Item>
            <List.Item onTap={() => this.router().transitionTo('counting')} icon>Random</List.Item>
          </List>
        </View>
        {this.props.child()}
      </NestedViewList>
    );
  }
}

export default Reapp(Numbers);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/