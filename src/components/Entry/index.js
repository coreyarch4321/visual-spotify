import React from "react";
import { observer } from "mobx-react";
import TrackComparison from "../PopularityTracksGame/TrackComparison";

@observer
class Entry extends React.Component {
    render() {
        return <TrackComparison />;
    }
}

export default Entry;
