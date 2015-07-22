import { React, View, BackButton } from 'reapp-kit';

export default class extends React.Component {
  render() {
    const backButton =
      <BackButton onTap={() => window.history.back()} />

    return (
      <View {...this.props} title="0 1 2 3 4 5 6 ..." titleLeft={backButton}>
        <p>Well</p>
      </View>
    );
  }
}