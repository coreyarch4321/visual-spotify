import React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
class ArticlesList extends React.Component {
  @observable articles = [];

  async componentDidMount() {

  }

  @action
  setArticles = (articles) => {
    this.articles = articles
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default ArticlesList;
