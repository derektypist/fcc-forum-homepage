import React, {Component} from 'react';
let moment = require('moment');

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
          return <a key={key} href={profile + index.username} target="_blank"><img src={imgUrl + img_url} alt=""></img></a>
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

class App extends Component {

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

  render() {
    const {users, topics, isFetching} = this.state
    let userId = Object.values(users)
    return(
      <div className="App">
        <h1>FreeCodeCamp Forum Home Page</h1>
        <Header />
        {isFetching ? topics.map((index,key) => {
          let activity = ''
          const createdAt = moment(new Date(),'DD/MM/YYYY')
          const lastUpdated = moment(new Date(index.last_posted_at),'DD/MM/YYYY')
          const minutes = Math.floor(moment.duration(createdAt.diff(lastUpdated)).asMinutes())
          const hours = Math.floor(moment.duration(createdAt.diff(lastUpdated)).asHours())
          const posters = index.posters
          let images = []
          for (let i=0; i < posters.length; i++) {
            images.push(this.findUser(posters[i].user_id))
          }

          if (minutes > 59) {
            activity = hours + "h"
          } else {
            activity = minutes + "m"
          }

          return <Topic index = {key+1} topic={index.title} key={key} replies={index.posts_count} views={index.views} activity={activity} id={index.id} images={images} />

        }) : <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      </div>
    )
  }


}

export default App;
