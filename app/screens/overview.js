import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class Overview extends Component {
  render() {
    // const { name, mark, quiz, assignments, midterm, final } = this.props.navigation.state.params;

    return (
      <ScrollView>

        <List>
          <ListItem
            title="Mark"
            rightTitle={'a'}
            hideChevron
          />
          <ListItem
            title="Quiz"
            rightTitle={'a'}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Assignments"
            rightTitle={'a'}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Midterm"
            rightTitle={'a'}
            hideChevron
          />
          <ListItem
            title="Final Exam"
            rightTitle={'a'}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

export default Overview;
