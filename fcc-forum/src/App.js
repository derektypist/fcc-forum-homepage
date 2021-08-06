import React, {Component} from 'react';

// Function for Topic
function Topic(props) {
  let url=`https://www.freecodecamp.org/forum/t/${props.id}`;
  let imgUrl = "https://www.freecodecamp.org";
  let profile = "https://www.freecodecamp.org/forum/u/";
  return(
    <div className="topic">
      <div className="first">
        <div>
          <span>{props.index}</span>
          <span><a href={url} target="_blank">{props.topic}</a></span>
        </div>
        <span>{props.images.map((index,key) => {
          let img_url = index.avatar_template;
          img_url = img_url.replace('{size}','24');
          return <a key={key} href={profile + index.username} target="_blank"><img src={imgUrl + img_url}></img></a>
        })}</span>
      </div>
      <div className="second">
        <span>{props.replies-1}</span>
        <span>{props.views}</span>
        <span>{props.activity}</span>
      </div>
    </div>
  )
}

// Function for Header
function Header() {
  return(
    <div className="header">
      <div>
        <span>#</span>
        <span>Topic</span>
      </div>
      <div>
        <span>Replies</span>
        <span>Views</span>
        <span>Activity</span>
      </div>
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    users: [],
    topics: [],
    isFetching: false
  }

  findUser = (id) => {
    return this.state.users.find(user => {
      if (user.id===id) {
        return user.avatar_template
      }
    })
  }

  async componentDidMount() {
    const response = await fetch('https://forum-proxy.freecodecamp.rocks/latest')
    const data = await response.json()
    this.setState({
      topics: data.topic_list.topics,
      users: data.users,
      isFetching: true
    })
  }

  
}

export default App;
