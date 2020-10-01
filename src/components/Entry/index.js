import React from "react";
import { observer } from "mobx-react";
import HomeScreen from "../../screens/HomeScreen";

@observer
class Entry extends React.Component {
    render() {
        return <HomeScreen />;
    }
}

export default Entry;
