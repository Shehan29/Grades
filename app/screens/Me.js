import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { me } from '../config/data';

class Me extends Component {
  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  render() {
    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: this.props.picture.large}}
          featured
          title={`${this.props.name.first.toUpperCase()} ${this.props.name.last.toUpperCase()}`}
          caption={this.props.mark}
        />

        <Button
          title="Settings"
          buttonStyle={{ marginTop: 20 }}
          onPress={this.handleSettingsPress}
        />

        <List>
          <ListItem
            title="Mark"
            rightTitle={this.props.mark}
            hideChevron
          />
          <ListItem
            title="Quiz"
            rightTitle={this.props.quiz}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Assignments"
            rightTitle={this.props.assignments}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Birthday"
            rightTitle={this.props.midterm}
            hideChevron
          />
          <ListItem
            title="City"
            rightTitle={this.props.midterm}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

Me.defaultProps = { ...me };

export default Me;
