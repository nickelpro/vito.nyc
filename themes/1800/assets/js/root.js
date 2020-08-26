var tracks = new Vue({
    delimiters: ['${', '}'],
    el: '#recently-played',
    data: {
        tracks: null
    },
    mounted () {
        axios
            .get('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=nickelpro&api_key=108d487c83d46659d3aef9c79cf72fc3&format=json')
            .then(response => {
                this.tracks = []
                for(var i=0;(i<response.data.recenttracks.track.length && i<8);i++) {
                    var track = response.data.recenttracks.track[i]
                    if(typeof track.date != 'undefined') {
                        track.time = dateFns.distanceInWordsToNow(new Date(
                            track.date.uts*1000
                        ), {addSuffix: true})
                    } else {
                        track.time = 'now playing'
                    }
                    track.artist_url = track.url.substring(0, track.url.lastIndexOf('/')-2)
                    this.tracks[i] = track
                }
            })
    }
})

var code = new Vue({
    delimiters: ['${', '}'],
    el: '#recent-code',
    data: {
        repos: null
    },
    mounted () {
        axios
            .get('https://api.github.com/users/nickelpro/events/public')
            .then(response => {
                this.repos = []
                var names = []
                for(var i=0, j=0;(i<response.data.length && j<5);i++) {
                    var name = /[^/]*$/.exec(response.data[i].repo.name)[0]
                    if(!names.includes(name)) {
                        names.push(name)
                        axios.get(response.data[i].repo.url).then(response => {
                            if(response.data.language == null) {
                                response.data.language = 'Unknown'
                            }
                            this.repos.push(response.data)
                        })
                        j++;
                    }
                }
            })
    }
})
